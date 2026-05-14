<template>
    <div
        class="sm:h-50 xl:h-66 mt-8 bg-thgray-100 w-full flex flex-col sm:flex-row items-center gap-8 xl:gap-14.5 sm:pr-8 xl:pr-14.5 pb-8">
        <div class="w-full h-76 sm:size-50 xl:size-66 shrink-0">
            <nuxt-img class="size-full object-cover" src="/images/preson.png" alt="test" />
        </div>
        <div class="grow flex flex-col items-start px-10 sm:px-0">
            <div class="flex items-center gap-5 xl:gap-10">
                <button class="size-12.5 xl:size-20">
                    <svg class="size-12.5 xl:size-20" xmlns="http://www.w3.org/2000/svg" width="82" height="82"
                        viewBox="0 0 82 82">
                        <g id="Group_142403" data-name="Group 142403" transform="translate(0 -0.443)">
                            <circle id="Ellipse_3" data-name="Ellipse 3" cx="41" cy="41" r="41"
                                transform="translate(0 0.443)" fill="#f2f2f2" />
                            <path id="Polygon_4" data-name="Polygon 4"
                                d="M9.011,2.847a2,2,0,0,1,3.427,0l7.187,11.941a2,2,0,0,1-1.714,3.031H3.538a2,2,0,0,1-1.714-3.031Z"
                                transform="translate(52.699 30.434) rotate(90)" fill="#551515" />
                        </g>
                    </svg>
                </button>
                <div>
                    <h3 class="text-xl xl:text-2xl font-medium font-kamand">Peter Azarbad</h3>
                    <p class="xl:text-xl font-light">International Managment Of JR Brand</p>
                </div>
            </div>
            <div class="flex w-full">
                <nuxt-img class="w-full h-auto max-h-15 mt-8 hidden sm:block" src="/images/line2.png" alt="line" />
                <nuxt-img class="w-full h-auto max-h-15 object-contain mt-8 sm:hidden" src="/images/line.png"
                    alt="line" />
            </div>
        </div>
    </div>
</template>