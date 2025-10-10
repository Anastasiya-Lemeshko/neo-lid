import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { addSwiperClass, removeSwiperClass, setSlidesTabIndex, checkVisibleSlides, getSwiperClass } from '../_utils.js';
import { TABLET_WIDTH } from "../_vars.js";

const sections = document.querySelectorAll('[data-swiper="pagination"]');

const initPaginationSwiper = () => {
  if (!sections.length) return;

  sections.forEach((section) => {
    const sectionClass = getSwiperClass(section);
    let swiperContainer = null;

    const destroyPaginationSwiper = (swiper, el) => {
      if (swiperContainer) {
        swiperContainer.destroy();
        swiperContainer = null;
        removeSwiperClass(swiper, el);
      }
    };

    const initPaginationSwiper = () => {
      addSwiperClass(section, sectionClass);

      swiperContainer = new Swiper(section, {
        modules: [Pagination],
        direction: 'horizontal',
        speed: 500,
        allowTouchMove: true,
        slidesPerView: 1,
        spaceBetween: 10,

        pagination: {
          el: `.${sectionClass}swiper-pagination`,
          bulletElement: 'button',
          bulletClass: `${sectionClass}pagination-bullet`,
          bulletActiveClass: `${sectionClass}pagination-bullet--active`,
          clickable: true,
        },

        on: {
          init: function () {
            const numberOfVisibleSlides = checkVisibleSlides('default');
            setSlidesTabIndex(this, numberOfVisibleSlides);
          },
          slideChange: function () {
            const numberOfVisibleSlides = checkVisibleSlides('default');
            setSlidesTabIndex(this, numberOfVisibleSlides);
          }
        },
      });
    };

    const checkPaginationSwiper = () => {
      if (TABLET_WIDTH.matches && swiperContainer) {
        destroyPaginationSwiper(section, sectionClass);
      } else if (!TABLET_WIDTH.matches && !swiperContainer) {
        initPaginationSwiper();
      }
    };

    checkPaginationSwiper();
    TABLET_WIDTH.addEventListener('change', checkPaginationSwiper);
  });
};

export { initPaginationSwiper };
