import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import {
  getSlidesCount,
  addSwiperClass,
  removeSwiperClass,
  setSlidesTabIndex,
  checkVisibleSlides,
  getSwiperClass
} from '../_utils.js';
import { TABLET_WIDTH, SLIDES_COUNT } from "../_vars.js";

const sections = document.querySelectorAll('[data-swiper="navigation"]');

const setNavigationSwiper = () => {
  if (!sections || !sections.length) return;

  sections.forEach((section, index) => {

    const sectionClass = getSwiperClass(section);
    let swiperContainer = null;
    let autoplayDelay = 7000 + index * 1000;

    const destroyNavigationSwiper = (swiper, el) => {
      if (swiperContainer) {
        swiperContainer.destroy();
        swiperContainer = null;
        removeSwiperClass(swiper, el);
      }
    };

    const initNavigationSwiper = () => {
      addSwiperClass(section, sectionClass);

      swiperContainer = new Swiper(section, {
        modules: [Navigation, Autoplay],
        direction: 'horizontal',
        speed: 500,
        allowTouchMove: true,
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        autoHeight: true,

        autoplay: {
          delay: autoplayDelay,
          stopOnLastSlide: false,
          reverseDirection: false,
          waitForTransition: true,
        },

        breakpoints: {
          768: {
            slidesPerView: 2,
            autoHeight: false,
          },
        },

        navigation: {
          nextEl: `.${sectionClass}swiper-button--next`,
          prevEl: `.${sectionClass}swiper-button--prev`,
        },

        on: {
          init: function () {
            const numberOfVisibleSlides = checkVisibleSlides('navigation');
            setSlidesTabIndex(this, numberOfVisibleSlides);
          },
          slideChange: function () {
            const numberOfVisibleSlides = checkVisibleSlides('navigation');
            setSlidesTabIndex(this, numberOfVisibleSlides);
          }
        },
      });
    };

    const checkNavigationSwiper = () => {
      const isNeedSwiperMobile = getSlidesCount(section) > SLIDES_COUNT.navigation.mobile;
      const isNeedSwiperTablet = getSlidesCount(section) > SLIDES_COUNT.navigation.tablet;

      if (!swiperContainer && (!TABLET_WIDTH.matches && isNeedSwiperMobile || TABLET_WIDTH.matches && isNeedSwiperTablet)) {
        initNavigationSwiper();
      } else if (TABLET_WIDTH.matches && !isNeedSwiperTablet && swiperContainer) {
        destroyNavigationSwiper(section, sectionClass);
      }
    };

    checkNavigationSwiper();
    TABLET_WIDTH.addEventListener('change', checkNavigationSwiper);
  });
};

export { setNavigationSwiper };
