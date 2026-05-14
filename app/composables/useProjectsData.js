export const useProjectsData = () => {
    const projectData = ref({
        title: 'Amiran Cafe Restaurant #Reels',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque In egestas. ',
        videoUrl: '/images/video_test.mp4',
        thumbnailUrl: '/images/video.png',
        projectInfo: {
            customer: 'Eurasia language institute',
            instagram: 'eurasiainstitu',
            instagramUrl: '#',
            website: 'www.eurasiainstitu.com',
            websiteUrl: '#',
            duration: 'Start in 2024 & 5 Days'
        }
    })

    const slides = [
        { id: 1, url: '/images/1.png', alt: 'test alt' },
        { id: 2, url: '/images/2.png', alt: 'test alt' },
        { id: 3, url: '/images/3.png', alt: 'test alt' },
        { id: 4, url: '/images/4.png', alt: 'test alt' },
        { id: 5, url: '/images/5.png', alt: 'test alt' },
        { id: 6, url: '/images/1.png', alt: 'test alt' },
        { id: 7, url: '/images/2.png', alt: 'test alt' },
        { id: 8, url: '/images/3.png', alt: 'test alt' }
    ]

    const slideWithPreviewData = [
        { id: 0, video_url: '/images/video_test.mp4', thumbnail_url: '/images/video.png', thumbnail_alt: 'test alt', type: 'video' },
        { id: 1, url: '/images/1.png', alt: 'test alt', type: 'image' },
        { id: 2, url: '/images/2.png', alt: 'test alt', type: 'image' },
        { id: 3, url: '/images/3.png', alt: 'test alt', type: 'image' },
        { id: 4, url: '/images/4.png', alt: 'test alt', type: 'image' },
        { id: 5, url: '/images/5.png', alt: 'test alt', type: 'image' },
        { id: 6, url: '/images/1.png', alt: 'test alt', type: 'image' },
        { id: 7, url: '/images/2.png', alt: 'test alt', type: 'image' },
        { id: 8, url: '/images/3.png', alt: 'test alt', type: 'image' }
    ]

    const reelsData = [
        { id: 0, video_url: '/images/video_test.mp4', thumbnail_url: '/images/reels-1.png', thumbnail_alt: 'test alt', type: 'video' },
        { id: 1, video_url: '/images/video_test.mp4', thumbnail_url: '/images/reels-2.png', thumbnail_alt: 'test alt', type: 'video' },
        { id: 2, video_url: '/images/video_test.mp4', thumbnail_url: '/images/reels-3.png', thumbnail_alt: 'test alt', type: 'video' }
    ]

    return {
        projectData,
        slides,
        slideWithPreviewData,
        reelsData
    }
}