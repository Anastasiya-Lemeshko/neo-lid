import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { addSwiperClass, removeSwiperClass, setSlidesTabIndex, checkVisibleSlides } from './../_utils.js';
import { TABLET_WIDTH } from "./../_vars.js";

const service = document.querySelector('.service')
const serviceSwiper = service ? service.querySelector('.service__swiper') : null;

const initServiceSwiper = () => {
  if (serviceSwiper) {
    let swiperContainer = null;

    const destroyServiceSwiper = (swiper, el) => {
      if (swiperContainer) {
        swiperContainer.destroy();
        swiperContainer = null;
        removeSwiperClass(swiper, el);
      }
    };

    const initServiceSwiper = () => {
      addSwiperClass(serviceSwiper, 'service__');

      swiperContainer = new Swiper(serviceSwiper, {
        modules: [Pagination],
        direction: 'horizontal',
        speed: 500,
        allowTouchMove: false,
        slidesPerView: 1,
        spaceBetween: 10,

        pagination: {
          el: '.service__swiper-pagination',
          bulletElement: 'button',
          bulletClass: 'service__pagination-bullet',
          bulletActiveClass: 'service__pagination-bullet--active',
          clickable: true,
        },

        on: {
          init: function () {
            const numberOfVisibleSlides = checkVisibleSlides('service');
            setSlidesTabIndex(this, numberOfVisibleSlides);
          },
          slideChange: function () {
            const numberOfVisibleSlides = checkVisibleSlides('service');
            setSlidesTabIndex(this, numberOfVisibleSlides);
          }
        },
      });
    };

    const checkServiceSwiper = () => {
      if (TABLET_WIDTH.matches && swiperContainer) {
        destroyServiceSwiper(serviceSwiper, 'service__');
      } else if (!TABLET_WIDTH.matches && !swiperContainer) {
        initServiceSwiper();
      }
    };

    checkServiceSwiper();
    TABLET_WIDTH.addEventListener('change', checkServiceSwiper);
  }
};

export { initServiceSwiper };
