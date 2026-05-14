// composables/useWpApi.ts
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Post } from '~/types/post'
import { useSettingStore } from '~/stores/useSettingStore'

type UseFetchLike<T> = { data: Ref<T | null>, error: Ref<any | null> }

export default function useWpApi() {
    const config = useRuntimeConfig()
    const USE_CACHE = String(config.public.wpApiCache) === 'false'
    const WP_URL = config.public.wpUri.replace(/\/$/, '')
    const setting = useSettingStore()
    const makeCacheKey = (endpoint: string) => `${WP_URL}::${endpoint}`
    const isServer = process.server
    const isClient = process.client
    const skipCache = process.dev || !USE_CACHE

    if (isServer && USE_CACHE) {
        if (!(globalThis as any).__wpApiCache) {
            (globalThis as any).__wpApiCache = new Map<string, { value: any, expiry: number }>()
        }
    }

    const get = async <T = any>(endpoint: string, opts: { ttl?: number } = {}): Promise<UseFetchLike<T>> => {
        const ttl = typeof opts.ttl === 'number' ? opts.ttl : 60 * 60
        const key = makeCacheKey(endpoint)

        if (isServer) {
            const cache = (globalThis as any).__wpApiCache as Map<string, { value: any, expiry: number }>
            if (!skipCache) {
                const entry = cache.get(key)
                if (entry && Date.now() < entry.expiry) {
                    return { data: ref(entry.value), error: ref(null) } as UseFetchLike<T>
                }
            }
            try {
                const res = await $fetch<T>(`${WP_URL}/wp-json/wp/v2/${endpoint}`, { retry: 0 })
                if (!skipCache) {
                    cache.set(key, { value: res, expiry: Date.now() + ttl * 1000 })
                }
                return { data: ref(res), error: ref(null) } as UseFetchLike<T>
            } catch (err) {
                return { data: ref(null), error: ref(err) } as UseFetchLike<T>
            }
        }

        if (isClient) {
            if (!skipCache) {
                try {
                    const raw = sessionStorage.getItem(key)
                    if (raw) {
                        const parsed = JSON.parse(raw)
                        if (parsed.expiry && Date.now() < parsed.expiry) {
                            return { data: ref(parsed.value), error: ref(null) } as UseFetchLike<T>
                        }
                    }
                } catch (e) { }
            }

            try {
                const { data, error } = await useFetch<T>(`${WP_URL}/wp-json/wp/v2/${endpoint}`, { retry: 0 })
                if (!skipCache && !error.value && data.value !== undefined) {
                    try {
                        sessionStorage.setItem(key, JSON.stringify({
                            value: data.value,
                            expiry: Date.now() + ttl * 1000
                        }))
                    } catch (e) { }
                }
                return { data, error } as UseFetchLike<T>
            } catch (err) {
                try {
                    const res = await $fetch<T>(`${WP_URL}/wp-json/wp/v2/${endpoint}`, { retry: 0, timeout: 8000 })
                    if (!skipCache) {
                        try {
                            sessionStorage.setItem(key, JSON.stringify({ value: res, expiry: Date.now() + ttl * 1000 }))
                        } catch (e) { }
                    }
                    return { data: ref(res), error: ref(null) } as UseFetchLike<T>
                } catch (e) {
                    return { data: ref(null), error: ref(e) } as UseFetchLike<T>
                }
            }
        }

        try {
            const res = await $fetch<T>(`${WP_URL}/wp-json/wp/v2/${endpoint}`, { retry: 0 })
            return { data: ref(res), error: ref(null) } as UseFetchLike<T>
        } catch (err) {
            return { data: ref(null), error: ref(err) } as UseFetchLike<T>
        }
    }

    const post = <T = any>(endpoint: string, body: any) =>
        useFetch<T>(`${WP_URL}/wp-json/wp/v2/${endpoint}`, {
            method: 'POST',
            body,
            headers: {
                Authorization: `Bearer ${setting.token}`
            }
        })

    const getRaw = (endpoint: string) => $fetch.raw(`${WP_URL}/wp-json/wp/v2/${endpoint}`)

    const getCategoriesByIds = async (ids: number[] | string[] | string) => {
        if (!ids || (Array.isArray(ids) && ids.length === 0)) return []
        const idStr = Array.isArray(ids) ? ids.join(',') : String(ids)
        const { data, error } = await get<any>(`categories?include=${idStr}&_fields=id,name,slug`, { ttl: 60 * 60 })
        if (error?.value) return []
        return data.value ?? []
    }

    const expandCategoriesInPosts = async (posts: any[]) => {
        if (!posts || !posts.length) return posts
        posts.forEach((p) => {
            try {
                if (p._embedded && p._embedded['wp:term']) {
                    const flat = p._embedded['wp:term'].flat?.() ?? [].concat(...p._embedded['wp:term'])
                    const cats = (flat || []).filter((t: any) => t && t.taxonomy === 'category')
                    p._categories = cats.map((t: any) => ({ id: t.id, name: t.name, slug: t.slug }))
                } else {
                    p._categories = null
                }
            } catch (e) {
                p._categories = null
            }
        })

        const needFetch = posts.filter((p) => p._categories === null && Array.isArray(p.categories) && p.categories.length)
        if (needFetch.length) {
            const ids = Array.from(new Set(needFetch.flatMap((p) => p.categories)))
            if (ids.length) {
                const cats = await getCategoriesByIds(ids)
                const map = new Map((cats || []).map((c: any) => [c.id, c]))
                needFetch.forEach((p) => {
                    p._categories = (p.categories || []).map((id: number) => {
                        const c = map.get(Number(id))
                        return c ? { id: c.id, name: c.name, slug: c.slug } : null
                    }).filter(Boolean)
                })
            } else {
                needFetch.forEach(p => p._categories = [])
            }
        }

        posts.forEach((p) => {
            if (!Array.isArray(p._categories)) p._categories = []
        })

        return posts
    }

    const getPosts = async (
        cpt: string = 'posts',
        page: number = 1,
        perPage: number = 20,
        fields: string = "author,id,excerpt,title,link,slug,date,_embedded,featured_media,featured_media_src_url,yoast_head_json,categories",
        taxonomy?: string,
        taxonomy_ids?: string | number,
        exclude?: string,
        include?: string,
        orderby?: string,
        order?: string
    ) => {
        let query = `${cpt}?page=${page}&per_page=${perPage}&_embed=1&acf_format=standard`
        if (fields) query += `&_fields=${fields}`
        if (taxonomy) query += `&${taxonomy}=${taxonomy_ids}`
        if (exclude) query += `&exclude=${exclude}`
        if (include) query += `&include=${include}`
        if (orderby) query += `&orderby=${orderby}&order=${order}`

        const { data, error } = await get<Post[]>(query, { ttl: 60 * 5 })

        if (!error?.value && Array.isArray(data.value)) {
            await expandCategoriesInPosts(data.value as any[])
        }

        return { data, error }
    }

    const getTotalPage = async (
        cpt: string = 'posts',
        page: number = 1,
        perPage: number = 20,
        fields: string = "author,id,excerpt,title,link,slug,date,_embedded,featured_media,featured_media_src_url,yoast_head_json,categories",
        taxonomy?: string,
        taxonomy_ids?: string | number,
        exclude?: string,
        include?: string,
        orderby?: string,
        order?: string
    ) => {
        let query = `${cpt}?page=${page}&per_page=${perPage}&_embed=1&acf_format=standard`
        if (fields) query += `&_fields=${fields}`
        if (taxonomy) query += `&${taxonomy}=${taxonomy_ids}`
        if (exclude) query += `&exclude=${exclude}`
        if (include) query += `&include=${include}`
        if (orderby) query += `&orderby=${orderby}&order=${order}`
        const res = await getRaw(query)
        const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1')
        return totalPages
    }

    const getPostBySlug = async (slug: string) => {
        const { data, error } = await get<Post[]>(`posts?slug=${slug}&_embed=1&acf_format=standard`, { ttl: 60 * 60 })
        if (error.value || !Array.isArray(data.value) || data.value.length === 0) return null
        const post = data.value[0]
        await expandCategoriesInPosts([post])
        return post
    }

    const getCPTBySlug = async (cpt: string = 'posts', slug: string) => {
        const { data, error } = await get<Post[]>(`${cpt}?slug=${slug}&_embed=1&acf_format=standard`, { ttl: 60 * 60 })
        if (error.value || !Array.isArray(data.value) || data.value.length === 0) return null
        const item = data.value[0]
        await expandCategoriesInPosts([item])
        return item
    }

    const getRelated = async (
        cpt: string,
        taxonomy: string,
        termIds: number[],
        excludeId: number,
        perPage: number = 2,
    ) => {
        if (!termIds?.length) return []
        const terms = termIds.join(",")
        const url = `${cpt}?${taxonomy}=${terms}&per_page=${perPage}&exclude=${excludeId}&_embed=1&acf_format=standard`
        const { data, error } = await get<Post[]>(url, { ttl: 60 * 15 })
        if (error.value) return []
        await expandCategoriesInPosts(data.value || [])
        return data.value || []
    }

    const getCategories = async (fields: string = 'id,name,slug,count') => get<any>(`categories?_fields=${fields}`, { ttl: 60 * 60 })
    const getCategory = async (slug: string) => get<any>(`categories?slug=${slug}`, { ttl: 60 * 60 })

    const getTaxonomies = async (
        taxonomy: string,
        fields: string = 'id,name,slug,parent',
        perPage: number = 100,
        page: number = 1
    ) => {
        let query = `${taxonomy}?page=${page}&per_page=${perPage}&_embed=1&acf_format=standard`
        if (fields) query += `&_fields=${fields}`
        return get<any>(query, { ttl: 60 * 60 })
    }

    const buildTaxonomyTree = (terms) => {
        const tree = []
        const map = {}
        terms.forEach(term => {
            map[term.id] = {
                ...term,
                children: [],
            }
        })
        Object.values(map).forEach(node => {
            if (node.parent !== 0 && map[node.parent]) {
                map[node.parent].children.push(node)
            } else {
                tree.push(node)
            }
        })
        return tree
    }

    const getTaxonomy = async (
        taxonomy: string,
        identifier: { slug?: string; id?: number },
        fields: string = 'id,name,slug'
    ) => {
        let url = ''
        if (identifier.id !== undefined) url = `${taxonomy}/${identifier.id}?_fields=${fields}`
        else if (identifier.slug) url = `${taxonomy}?slug=${identifier.slug}&_fields=${fields}`
        else throw new Error('Provide id or slug')
        const { data, error } = await get<any>(url, { ttl: 60 * 60 })
        if (error.value) return null
        return Array.isArray(data.value) ? data.value[0] : data.value
    }

    const getFrontPage = async () => {
        let pageId: number | null = setting.setting?.page_on_front ?? null
        if (!pageId) {
            const settingsRes = await get<any>('settings', { ttl: 60 * 60 })
            if (!settingsRes.error?.value && settingsRes.data?.value) {
                pageId = settingsRes.data.value?.page_on_front ?? null
            }
        }
        if (!pageId) {
            return { data: ref(null), error: ref(new Error('no_front_page_id')) } as UseFetchLike<Post[]>
        }
        return get<Post[]>(`pages/${pageId}?_embed=1&_fields=title,link,slug,date,_embedded,acf,yoast_head_json&acf_format=standard`, { ttl: 60 * 60 })
    }

    const extractFeaturedImage = (post: any, size: string = 'full', acf: boolean = false) => {
        if (acf) {
            const media = post
            if (media) {
                return {
                    alt: media.alt || '',
                    url: media.sizes?.[size] || media.url || '',
                    width: media.sizes?.[size + '-width'] || null,
                    height: media.sizes?.[size + '-height'] || null,
                    type: media.mime_type || '',
                }
            } else {
                return null
            }
        } else {
            const media = post?._embedded?.['wp:featuredmedia']?.[0]
            if (!media) return null
            return {
                alt: media.alt_text || '',
                url: media.media_details?.sizes?.[size]?.source_url || media.source_url || '',
                width: media.media_details?.sizes?.[size]?.width || null,
                height: media.media_details?.sizes?.[size]?.height || null,
                type: media.mime_type || '',
            }
        }
    }

    const addComment = async (comment: { post: number; content: string; author_name: string; author_email: string }) =>
        post<any>('comments', comment)
    const getComments = async (postId: number) => get<any[]>(`comments?post=${postId}&_embed=1`)

    const getWidgets = async (sidebar: string) => get<any>(`widgets?sidebar=${sidebar}&_fields=rendered`)

    const clearClientCacheKeys = (prefix: string) => {
        try {
            const keys = Object.keys(sessionStorage).filter(k => typeof k === 'string' && k.startsWith(prefix))
            keys.forEach(k => sessionStorage.removeItem(k))
        } catch (e) { }
    }

    const clearServerCache = () => {
        try {
            const cache = (globalThis as any).__wpApiCache as Map<string, { value: any, expiry: number }>
            cache?.clear()
        } catch (e) { }
    }

    const uploadFile = async (file: File) => {
        const fd = new FormData()
        fd.append("file", file, file.name)
        const res = await $fetch<any>(`${WP_URL}/wp-json/wp/v2/media`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${setting.token}`,
                Accept: "application/json",
            },
            body: fd,
        })
        if (isClient && USE_CACHE) {
            clearClientCacheKeys(WP_URL + '::')
        }
        if (isServer && USE_CACHE) {
            clearServerCache()
        }
        return res
    }

    const createCPT = async (
        cpt: string,
        payload: any
    ) => {
        const res = await $fetch<any>(`${WP_URL}/wp-json/wp/v2/${cpt}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${setting.token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: payload,
        })
        if (isClient && USE_CACHE) {
            clearClientCacheKeys(WP_URL + '::')
        }
        if (isServer && USE_CACHE) {
            clearServerCache()
        }
        return res
    }

    return {
        get,
        post,
        getRaw,
        getPosts,
        getTotalPage,
        getPostBySlug,
        getCPTBySlug,
        getRelated,
        getCategories,
        getCategory,
        getCategoriesByIds,
        expandCategoriesInPosts,
        getTaxonomies,
        buildTaxonomyTree,
        getTaxonomy,
        getFrontPage,
        extractFeaturedImage,
        getComments,
        addComment,
        getWidgets,
        uploadFile,
        createCPT,
    }
}