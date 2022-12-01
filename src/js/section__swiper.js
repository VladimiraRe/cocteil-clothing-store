import Swiper from './swiper-bundle.min2';

const isActive = { advantages: false, catchSwiper: false };
let advantages;
let catchSwiper;
const configForSwiper = {
    advantages: [
        '.section__advantages-swiper',
        'navigation',
        2,
        26,
        false,
        true,
        ['.section__advantages-nav--next', '.section__advantages-nav--prev']
    ],
    catchSwiper: [
        '.section__catch-swiper',
        'navigation',
        0,
        20,
        { 768: [3.2, 20], 880: [3.4, 20], 992: [3.7, 20], 1170: [4, 20] },
        false,
        ['.section__catch-nav--next', '.section__catch-nav--prev']
    ]
};

checker();

window.addEventListener('resize', () => {
    checker();
});

function checker() {
    if (document.documentElement.clientWidth < 768) {
        if (!isActive.advantages) {
            advantages = sliderInit('advantages', configForSwiper.advantages);
        }
        if (isActive.catchSwiper) sliderDestroy(catchSwiper);
        return;
    }
    if (document.documentElement.clientWidth >= 768) {
        if (!isActive.catchSwiper) {
            catchSwiper = sliderInit(
                'catchSwiper',
                configForSwiper.catchSwiper
            );
        }
        if (isActive.advantages) sliderDestroy(advantages);
        return;
    }
}

function sliderInit(swiperName, config) {
    isActive[swiperName] = true;
    const newSwiper = createSwiper(...config);
    newSwiper.swiperName = swiperName;
    return newSwiper;
}

function sliderDestroy(swiper) {
    isActive[swiper.swiperName] = false;
    if (!Array.isArray(swiper)) {
        swiper.destroy(true, true);
        return;
    }
    swiper.forEach((el) => {
        Array.isArray(el) ? sliderDestroy(el) : el.destroy(true, true);
    });
}

function createSwiper(
    className,
    move,
    slidesPerView,
    spaceBetween,
    breakpoints,
    autoplay,
    btnsClasses
) {
    let config = {
        //Loop mode
        loop: true,

        //Round values of slides width and height
        roundLengths: true,

        //Pagination or navigation
        [move]: createNavigation(move, btnsClasses),

        slidesPerView: slidesPerView,
        spaceBetween: spaceBetween
    };

    if (autoplay) {
        config.autoplay = {
            delay: 5000,
            pauseOnMouseEnter: true
        };
    }

    if (breakpoints) {
        config.breakpoints = createBreakpoints(breakpoints);
    }

    return new Swiper(className, config);

    function createNavigation(
        move,
        btnsClasses = ['.swiper-button-next', '.swiper-button-prev']
    ) {
        let obj;
        if (move === 'pagination') {
            obj = {
                el: '.swiper-pagination',
                clickable: true
            };
        }
        if (move === 'navigation') {
            obj = {
                nextEl: btnsClasses[0],
                prevEl: btnsClasses[1]
            };
        }
        return obj;
    }

    function createBreakpoints(obj) {
        const breakpoints = {};
        for (let breakpoint in obj) {
            breakpoints[breakpoint] = {
                slidesPerView: obj[breakpoint][0],
                spaceBetween: obj[breakpoint][1]
            };
        }
        return breakpoints;
    }
}
