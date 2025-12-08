import Swiper from 'swiper';
import { Scrollbar, Thumbs, EffectFade } from 'swiper/modules';
import { getSwiperClass } from '../_utils.js';

const sections = document.querySelectorAll('[data-swiper="thumb"]');

const setThumbSwiper = () => {
  if (!sections || !sections.length) return;

  sections.forEach((section) => {
    const mainSwiper = section.querySelector('.main-swiper');
    const thumbSwiper = section.querySelector('.thumb-swiper');
    let mainSwiperContainer = null;

    const sectionClass = getSwiperClass(mainSwiper);

    const thumbSwiperContainer = new Swiper(thumbSwiper, {
      slidesPerView: 3,
      spaceBetween: 10,
      watchSlidesProgress: true,
      centeredSlidesBounds: true,

      breakpoints: {
        780: {
          slidesPerView: 6,
        },
      }
    });

    const initMainSwiper = () => {
      if (!mainSwiper) return;

      mainSwiperContainer = new Swiper(mainSwiper, {
        modules: [Scrollbar, Thumbs, EffectFade],
        direction: 'horizontal',
        speed: 500,
        allowTouchMove: true,
        slidesPerView: 1,
        spaceBetween: 10,

        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },

        scrollbar: {
          el: `.${sectionClass}scrollbar`,
          draggable: true,
          dragClass: `${sectionClass}scrollbar-drag`,
        },

        thumbs: {
          swiper: thumbSwiperContainer,
          slideThumbActiveClass: 'details__thumb-slide--active'
        },
      });
    };

    initMainSwiper();
  });
};

export { setThumbSwiper };
