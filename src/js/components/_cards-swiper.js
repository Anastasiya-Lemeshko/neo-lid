import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { addSwiperClass, removeSwiperClass, getSwiperClass } from './../_utils.js';
import { TABLET_WIDTH } from "./../_vars.js";

const sections = document.querySelectorAll('[data-swiper="cards"]');

const initCardsSwiper = () => {
  if (sections.length) {
    sections.forEach((section) => {
      const sectionClass = getSwiperClass(section);
      let swiperContainer = null;

      const destroySectionSwiper = (swiper, el) => {
        if (swiperContainer) {
          swiperContainer.destroy();
          swiperContainer = null;
          removeSwiperClass(swiper, el);
        }
      };

      const initSectionSwiper = () => {
        addSwiperClass(section, sectionClass);

        swiperContainer = new Swiper(section, {
          modules: [Pagination],
          direction: 'horizontal',
          speed: 500,
          allowTouchMove: true,
          slidesPerView: 1,
          spaceBetween: 10,
        });
      };

      const checkSectionSwiper = () => {
        if (TABLET_WIDTH.matches && swiperContainer) {
          destroySectionSwiper(section, sectionClass);
        } else if (!TABLET_WIDTH.matches && !swiperContainer) {
          initSectionSwiper();
        }
      };

      checkSectionSwiper();
      TABLET_WIDTH.addEventListener('change', checkSectionSwiper);
    });
  }
};

initCardsSwiper()

// export { initPromoSwiper };
