import Swiper from './swiper-bundle.min2';

var mobileSwipers;
var stableSwipers;
var isActive = false;
const configForSwiper = [
    [
        '.section__advantages-swiper',
        'navigation',
        2,
        26,
        [
            [2, 26],
            [2, 26],
            [2, 26],
            [2, 26],
            [2, 26],
            [2, 26]
        ],
        true,
        ['.section__advantages-nav--next', '.section__advantages-nav--prev']
    ]
];

checker();

window.addEventListener('resize', () => {
    checker();
});

function checker() {
    if (!isActive && window.innerWidth < 768) {
        sliderInit();
        return;
    }
    if (isActive && window.innerWidth >= 768) {
        sliderDestroy(mobileSwipers);
        return;
    }
}

function sliderInit() {
    mobileSwipers = [createSwiper(...configForSwiper[0])];
    isActive = true;
    console.log(typeof mobileSwipers[0]);
}

function sliderDestroy(swipers) {
    swipers.forEach((swiper) => {
        Array.isArray(swiper)
            ? sliderDestroy(swiper)
            : swiper.destroy(true, true);
    });
    isActive = false;
}

function createSwiper(
    className,
    move,
    slidesPerView,
    spaceBetween,
    brPs,
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
        spaceBetween: spaceBetween,
        //Responsive breakpoints
        breakpoints: {
            375: {
                slidesPerView: brPs[0][0],
                spaceBetween: brPs[0][1]
            },
            480: {
                slidesPerView: brPs[1][0],
                spaceBetween: brPs[1][1]
            },
            576: {
                slidesPerView: brPs[2][0],
                spaceBetween: brPs[2][1]
            },
            640: {
                slidesPerView: brPs[3][0],
                spaceBetween: brPs[3][1]
            },
            768: {
                slidesPerView: brPs[4][0],
                spaceBetween: brPs[4][1]
            },
            1440: {
                slidesPerView: brPs[5][0],
                spaceBetween: brPs[5][1]
            }
        }
    };

    if (autoplay) {
        config.autoplay = {
            delay: 5000,
            pauseOnMouseEnter: true
        };
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
}
