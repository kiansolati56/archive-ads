<script setup>
const links = [
    { title: 'Home', slug: '/' },
    { title: 'Projects', slug: '/projects' },
    { title: 'Our Services', slug: '/our-services' },
    { title: 'About us', slug: '/about-us' },
    { title: 'Blogs', slug: '/blogs' },
    { title: 'Contact us', slug: '/contact-us' },
    { title: 'Products', slug: '/products' },
    { title: 'Store', slug: '/stroe' }
]

const social_media = [
    {
        icon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43">
  <g id="Group_142461" data-name="Group 142461" transform="translate(21481 13743)">
    <rect id="Rectangle_3282" data-name="Rectangle 3282" width="43" height="43" transform="translate(-21481 -13743)" fill="#fff"/>
    <circle id="Ellipse_148" data-name="Ellipse 148" cx="17" cy="17" r="17" transform="translate(-21477 -13739)" fill="#551515"/>
    <g id="phone-call_1_" data-name="phone-call(1)" transform="translate(-21481 -13743)">
      <g id="Group_9774" data-name="Group 9774">
        <path id="Path_29633" data-name="Path 29633" d="M36.7,6.295A21.5,21.5,0,1,0,43,21.5,21.5,21.5,0,0,0,36.7,6.295ZM32.561,29.949l0,0v-.007l-1.089,1.082a5.733,5.733,0,0,1-5.411,1.548,19.05,19.05,0,0,1-5.533-2.48,25.563,25.563,0,0,1-4.364-3.519A25.759,25.759,0,0,1,12.9,22.62a20.064,20.064,0,0,1-2.451-4.959,5.733,5.733,0,0,1,1.433-5.855l1.276-1.276a.91.91,0,0,1,1.287,0l0,0,4.028,4.028a.91.91,0,0,1,0,1.287l0,0L16.11,18.213a1.928,1.928,0,0,0-.2,2.508,27.659,27.659,0,0,0,2.831,3.3,27.489,27.489,0,0,0,3.727,3.132,1.942,1.942,0,0,0,2.48-.215l2.286-2.322a.91.91,0,0,1,1.287,0l0,0,4.035,4.042A.91.91,0,0,1,32.561,29.949Z" transform="translate(0 0)" fill="#fff"/>
      </g>
    </g>
  </g>
</svg>
    `, link: '#'
    },
    {
        icon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43.001" viewBox="0 0 43 43.001">
  <path id="Exclusion_5" data-name="Exclusion 5" d="M43,43H0V0H43V43ZM15.566,8A7.486,7.486,0,0,0,8,15.386V27.9a7.486,7.486,0,0,0,7.566,7.385H28.385A7.485,7.485,0,0,0,35.951,27.9V15.386A7.485,7.485,0,0,0,28.385,8Zm6.409,21.1a7.463,7.463,0,1,1,7.643-7.461A7.562,7.562,0,0,1,21.975,29.1Zm0-13.322a5.863,5.863,0,1,0,6,5.861A5.94,5.94,0,0,0,21.975,15.782Zm7.825.16a2.205,2.205,0,1,1,2.258-2.2A2.235,2.235,0,0,1,29.8,15.942Z" fill="#fff"/>
</svg>
    `, link: '#'
    },
    {
        icon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43.001" viewBox="0 0 43 43.001">
  <path id="Exclusion_6" data-name="Exclusion 6" d="M43,43H0V0H43V43ZM21.295,12.364c-.021,0-2.1,0-4.422.071-1.35.041-2.52.1-3.479.17a15.216,15.216,0,0,0-2.5.33,3.31,3.31,0,0,0-1.475.908A3.55,3.55,0,0,0,8.547,15.4a14.521,14.521,0,0,0-.316,1.958c-.069.645-.123,1.383-.163,2.191C8,20.935,8,22.063,8,22.074s0,1.144.068,2.53c.04.812.094,1.549.163,2.192a14.223,14.223,0,0,0,.316,1.949,3.409,3.409,0,0,0,2.344,2.445,14.8,14.8,0,0,0,2.512.343c.952.074,2.122.133,3.478.176,2.313.074,4.393.075,4.414.075s2.1,0,4.422-.072c1.365-.042,2.536-.1,3.479-.169a15.186,15.186,0,0,0,2.5-.33,3.406,3.406,0,0,0,2.344-2.444,14.655,14.655,0,0,0,.317-1.958c.067-.635.122-1.372.162-2.191.069-1.383.069-2.511.069-2.522,0-.12,0-1.206-.06-2.533-.039-.822-.094-1.563-.162-2.2a13.913,13.913,0,0,0-.326-1.962A3.408,3.408,0,0,0,31.7,12.958a14.636,14.636,0,0,0-2.5-.344c-.957-.074-2.128-.133-3.479-.175C23.4,12.365,21.316,12.364,21.295,12.364Zm-2.65,13.868V17.916l6.921,4.158-6.92,4.157Z" fill="#fff"/>
</svg>
    `, link: '#'
    },
    {
        icon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="43.213" height="43.212" viewBox="0 0 43.213 43.212">
  <g id="Group_142458" data-name="Group 142458" transform="translate(21283 13744)">
    <rect id="Rectangle_3287" data-name="Rectangle 3287" width="43" height="43" transform="translate(-21283 -13744)" fill="#fff"/>
    <rect id="Rectangle_3288" data-name="Rectangle 3288" width="37" height="37" rx="18.5" transform="translate(-21280 -13741)" fill="#551515"/>
    <path id="telegram_2_" data-name="telegram(2)" d="M21.606,43.212A21.606,21.606,0,1,0,0,21.606,21.6,21.6,0,0,0,21.606,43.212ZM9.887,21.138l20.832-8.032c.967-.349,1.811.236,1.5,1.7l0,0L28.671,31.513c-.263,1.185-.967,1.473-1.952.915l-5.4-3.981-2.605,2.51a1.362,1.362,0,0,1-1.089.531l.384-5.5,10.011-9.044c.436-.384-.1-.6-.672-.218L14.975,24.518,9.642,22.854c-1.158-.367-1.183-1.158.245-1.716Z" transform="translate(-21283 -13744)" fill="#fbfbfb"/>
  </g>
</svg>
    `, link: '#'
    },
    {
        icon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43.001" viewBox="0 0 43 43.001">
  <path id="Exclusion_7" data-name="Exclusion 7" d="M43,43H0V0H43V43ZM14.816,32.143h0a13.06,13.06,0,0,0,7.108,2.084A12.783,12.783,0,0,0,34.843,21.614,12.783,12.783,0,0,0,21.924,9h-.006A12.783,12.783,0,0,0,9,21.614a12.278,12.278,0,0,0,2.46,7.393L9.85,33.692l4.966-1.55Zm11.35-3.467h0a11.207,11.207,0,0,1-3.784-1.033,15.232,15.232,0,0,1-6.352-5.433c-.04-.057-.067-.095-.082-.113l-.02-.027a6.9,6.9,0,0,1-1.514-3.777A3.994,3.994,0,0,1,15.7,15.256l.034-.034a1.9,1.9,0,0,1,1.321-.453c.143,0,.275.007.392.012l.041,0c.391.016.575.047.821.623.092.217.224.529.366.864.343.813.732,1.733.8,1.864a.74.74,0,0,1,.055.683,2.016,2.016,0,0,1-.377.532l-.041.046c-.079.089-.158.17-.234.249-.107.111-.217.225-.328.359l-.009.01a.579.579,0,0,0-.144.775,11.115,11.115,0,0,0,2.1,2.543A9.539,9.539,0,0,0,23.4,25.111l.117.047a1,1,0,0,0,.371.073.738.738,0,0,0,.54-.214,12.114,12.114,0,0,0,.854-1.093l.155-.213a.726.726,0,0,1,.6-.338.949.949,0,0,1,.328.065c.381.129,2.553,1.183,2.575,1.193.079.039.152.073.219.1.259.122.43.2.5.325a3.079,3.079,0,0,1-.221,1.75,3.643,3.643,0,0,1-2.535,1.779A3.443,3.443,0,0,1,26.166,28.675Z" fill="#fff"/>
</svg>
    `, link: '#'
    },
    {
        icon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43">
  <g id="Group_142462" data-name="Group 142462" transform="translate(21146 13743)">
    <rect id="Rectangle_3287" data-name="Rectangle 3287" width="43" height="43" transform="translate(-21146 -13743)" fill="#fff"/>
    <path id="Path_31216" data-name="Path 31216" d="M275.888,263.692l9.463-11h-2.243l-8.217,9.552-6.563-9.552h-7.57l9.924,14.444-9.924,11.536H263l8.677-10.087,6.931,10.087h7.57l-10.292-14.979Z" transform="translate(-21397.76 -13987.692)" fill="#551515"/>
  </g>
</svg>
    `, link: '#'
    },
    {
        icon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43">
  <g id="Group_142460" data-name="Group 142460" transform="translate(21021 13743)">
    <rect id="Rectangle_3289" data-name="Rectangle 3289" width="43" height="43" transform="translate(-21021 -13743)" fill="#fff"/>
    <path id="_043-facebook-1" data-name="043-facebook-1" d="M145.435,11.987H138.9V7.628a2.18,2.18,0,0,1,2.179-2.179h2.179V0H138.9a6.538,6.538,0,0,0-6.538,6.538v5.448H128v5.448h4.359V34.87H138.9V17.435h4.359Z" transform="translate(-21129.279 -13735)" fill="#551515"/>
  </g>
</svg>
    `, link: '#'
    },
    {
        icon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43">
  <g id="Group_142463" data-name="Group 142463" transform="translate(21010.999 13743)">
    <rect id="Rectangle_3289" data-name="Rectangle 3289" width="43" height="43" transform="translate(-21011 -13743)" fill="#fff"/>
    <path id="Path_31217" data-name="Path 31217" d="M100.487,95.227h-.01c-5.007-.034-8.857-1.685-11.444-4.908-2.3-2.868-3.489-6.859-3.529-11.861v-.024c.04-5,1.227-8.992,3.529-11.861,2.585-3.224,6.436-4.875,11.442-4.908h.019a15.447,15.447,0,0,1,9.546,2.932,14.125,14.125,0,0,1,4.908,7.646l-2.852.8c-1.543-5.537-5.45-8.368-11.612-8.412-4.068.029-7.144,1.308-9.145,3.8-1.873,2.334-2.842,5.7-2.877,10.019.036,4.315,1,7.686,2.877,10.019,2,2.492,5.076,3.771,9.145,3.8,3.667-.027,6.094-.881,8.113-2.858a6.007,6.007,0,0,0,1.524-6.708,5.389,5.389,0,0,0-2.284-2.445,9.239,9.239,0,0,1-1.8,4.575,6.845,6.845,0,0,1-5.214,2.5,7.676,7.676,0,0,1-4.558-1.12,5.245,5.245,0,0,1-.592-8.455,8.269,8.269,0,0,1,5.01-1.8,19.162,19.162,0,0,1,4.223.2,4.863,4.863,0,0,0-1.045-2.456,4.218,4.218,0,0,0-3.3-1.246h-.041a4.389,4.389,0,0,0-3.807,1.844L94.259,72.64a7.266,7.266,0,0,1,6.263-3.153h.06c4.468.028,7.129,2.761,7.394,7.534.152.064.3.13.448.2a8.665,8.665,0,0,1,4.409,4.292,8.948,8.948,0,0,1-2.166,10.011c-2.584,2.531-5.722,3.673-10.173,3.7h-.008Zm1.4-16.35c-.338,0-.682.01-1.032.03-2.568.145-4.169,1.321-4.078,3,.1,1.755,2.032,2.571,3.892,2.471,1.713-.092,3.942-.758,4.315-5.189a14.882,14.882,0,0,0-3.1-.308Z" transform="translate(-21089.504 -13799.665)" fill="#551515"/>
  </g>
</svg>
    `, link: '#'
    },
    {
        icon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43">
  <g id="Group_142464" data-name="Group 142464" transform="translate(20942 13743)">
    <rect id="Rectangle_3290" data-name="Rectangle 3290" width="43" height="43" transform="translate(-20942 -13743)" fill="#fff"/>
    <g id="linkedin" transform="translate(-20933 -13733)">
      <path id="Path_31218" data-name="Path 31218" d="M6.488,159.684h5.163v15.163H6.488Zm0,0" transform="translate(-6.183 -152.374)" fill="#551515"/>
      <path id="Path_31219" data-name="Path 31219" d="M2.921.5A2.667,2.667,0,0,0,0,3.12,2.644,2.644,0,0,0,2.853,5.739h.034A2.666,2.666,0,0,0,5.808,3.12,2.656,2.656,0,0,0,2.921.5Zm0,0" transform="translate(0 -0.5)" fill="#551515"/>
      <path id="Path_31220" data-name="Path 31220" d="M186.789,151.934a5.146,5.146,0,0,0-4.653,2.5V152.29h-5.163v15.163h5.163v-8.468a3.379,3.379,0,0,1,.17-1.23,2.82,2.82,0,0,1,2.649-1.843c1.868,0,2.615,1.39,2.615,3.429v8.112h5.162v-8.694c0-4.657-2.547-6.825-5.944-6.825Zm0,0" transform="translate(-168.648 -144.98)" fill="#551515"/>
    </g>
  </g>
</svg>
    `, link: '#'
    }
]
</script>

<template>
    <div class="flex justify-center items-center">
        <nuxt-link to="/">
            <svg class="w-64.5 h-7.5 sm:w-47 sm:h-4.75" xmlns="http://www.w3.org/2000/svg" width="187.47" height="18.432"
                viewBox="0 0 187.47 18.432">
                <g id="Group_142795" data-name="Group 142795" transform="translate(-866 -70.568)">
                    <path id="Path_31052" data-name="Path 31052"
                        d="M795.461,129.223l7.959,17.484h6.595l8.187-17.484H813.54l-5.628,11.616a1.133,1.133,0,0,1-2.125-.025l-5.362-11.59Z"
                        transform="translate(208.617 -58.367)" fill="#EDE3D5" />
                    <path id="Path_31053" data-name="Path 31053"
                        d="M207.076,140.942a5.356,5.356,0,0,0,3.638-5.151,6.339,6.339,0,0,0-6.652-6.575H190.531V146.7h4.15v-3.659h8.586a4.06,4.06,0,0,1,3.525,3.659h4.546s0-4.473-4.262-5.76m-5.173-2.034h-7.335v-5.827h7.107s4.889,0,4.889,2.912-4.661,2.915-4.661,2.915"
                        transform="translate(708.541 -58.363)" fill="#EDE3D5" />
                    <path id="Path_31054" data-name="Path 31054"
                        d="M996.362,128.637H978.795v17.687h17.568v-4.337H982.718v-2.439h12.507v-4.066H982.718v-2.44h13.645Z"
                        transform="translate(57.107 -57.883)" fill="#EDE3D5" />
                    <path id="Path_31055" data-name="Path 31055"
                        d="M389.537,127.564H377.616a8.063,8.063,0,0,0-6.936,5.421c-1.706,5.15,0,8.4,0,8.4s1.137,4.608,7.5,4.608h11.352V141.93H377.73s-3.638.023-3.638-5.15c0-4.744,3.638-4.744,3.638-4.744h11.807Z"
                        transform="translate(560.291 -56.996)" fill="#EDE3D5" />
                    <rect id="Rectangle_3225" data-name="Rectangle 3225" width="3.789" height="17.551"
                        transform="translate(991.326 70.861)" fill="#EDE3D5" />
                    <path id="Path_31056" data-name="Path 31056"
                        d="M563.385,130.1v6.777H551.661V130.1h-3.789v17.551h3.789v-7.081h11.724v7.081h3.789V130.1Z"
                        transform="translate(413.229 -59.094)" fill="#EDE3D5" />
                    <g id="Group_25489" data-name="Group 25489" transform="translate(866 71.041)">
                        <path id="Path_31057" data-name="Path 31057"
                            d="M22.741,147.781,14.782,130.3H8.187L0,147.781H4.662l5.628-11.616a1.133,1.133,0,0,1,2.125.025l5.362,11.59Z"
                            transform="translate(0 -130.297)" fill="#EDE3D5" />
                        <rect id="Rectangle_3227" data-name="Rectangle 3227" width="12.958" height="4.163"
                            transform="translate(4.891 9.658)" fill="#EDE3D5" />
                    </g>
                </g>
            </svg>
        </nuxt-link>
    </div>

    <div class="flex justify-center items-center">
        <ul class="mt-12.5 sm:mt-8 flex flex-wrap justify-center gap-4 sm:gap-3 md:gap-4 items-center px-10 sm:px-0">
            <li v-for="item in links">
                <nuxt-link :to="item?.slug"
                    class="text-thwhite text-lg sm:text-base md:text-lg hover:text-thwhite/60 font-light">
                    {{ item?.title }}
                </nuxt-link>
            </li>
        </ul>
    </div>

    <div class="flex justify-center items-center">
        <ul class="mt-12.5 sm:mt-8 grid grid-cols-3 sm:flex gap-3 md:gap-8 items-center">
            <li v-for="item in social_media">
                <a :href="item?.link" target="_blank">
                    <div v-html="item?.icon"
                        class="size-20 sm:size-10.75 [&_svg]:size-20 sm:[&_svg]:size-10.75 overflow-hidden xl:hover:rounded-4xl transition-all duration-300">
                    </div>
                </a>
            </li>
        </ul>
    </div>

    <p class="sm:text-lg text-thwhite pt-12.5 sm:pt-0 border-t sm:border-t-0 border-thwhite/50 mt-12.5 sm:mt-8 md:mt-10 text-center">
        {{ $t('copyright') }}
    </p>
</template>