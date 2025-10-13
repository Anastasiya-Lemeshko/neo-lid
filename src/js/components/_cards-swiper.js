import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import { addSwiperClass, removeSwiperClass, getSwiperClass, setSlidesTabIndex, checkVisibleSlides } from './../_utils.js';
import { TABLET_WIDTH } from "./../_vars.js";

const sections = document.querySelectorAll('[data-swiper="cards"]');

const initCardsSwiper = () => {
  if (!sections.length) return;

  sections.forEach((section, index) => {
    const sectionClass = getSwiperClass(section);
    let swiperContainer = null;
    let autoplayDelay = 10000 + index * 1000;

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
        modules: [Pagination, Autoplay],
        direction: 'horizontal',
        speed: 500,
        allowTouchMove: false,
        slidesPerView: 1,
        spaceBetween: 10,

        pagination: {
          el: `.${sectionClass}swiper-pagination`,
          bulletElement: 'button',
          bulletClass: `${sectionClass}pagination-bullet`,
          bulletActiveClass: `${sectionClass}pagination-bullet--active`,
          clickable: true,
          renderBullet: function (index, className) {
            return `<button type="button" class="${className}"><span class="visually-hidden">Слайд ${index + 1}</span></button>`;
          },
        },

        autoplay: {
          delay: autoplayDelay,
          stopOnLastSlide: false,
          reverseDirection: false,
          waitForTransition: true,
        },

        on: {
          init: function () {
            const numberOfVisibleSlides = checkVisibleSlides('cards');
            setSlidesTabIndex(this, numberOfVisibleSlides);
          },
          slideChange: function () {
            const numberOfVisibleSlides = checkVisibleSlides('cards');
            setSlidesTabIndex(this, numberOfVisibleSlides);
          }
        },
      });
    };

    const checkSectionSwiper = () => {
      if (TABLET_WIDTH.matches && swiperContainer) {
        destroySectionSwiper(section, sectionClass);
      } else if (!TABLET_WIDTH.matches && !swiperContainer) {
        initSectionSwiper();
      }
    };

    const initImgSwiper = () => {
      const imgSwipers = section.querySelectorAll(`.${sectionClass}card-visual-swiper`);

      if (imgSwipers.length) {
        imgSwipers.forEach((imgSwiper) => {
          new Swiper(imgSwiper, {
            modules: [Pagination],
            direction: 'horizontal',
            speed: 500,
            allowTouchMove: true,
            slidesPerView: 1,
            spaceBetween: 5,

            pagination: {
              el: `.${sectionClass}card-visual-swiper-pagination`,
              bulletElement: 'button',
              bulletClass: `${sectionClass}card-visual-pagination-bullet`,
              bulletActiveClass: `${sectionClass}card-visual-pagination-bullet--active`,
              clickable: true,
              renderBullet: function (index, className) {
                return `<button type="button" class="${className}"><span class="visually-hidden">Слайд ${index + 1}</span></button>`;
              },
            },
          });
        });
      }
    };

    checkSectionSwiper();
    initImgSwiper();
    TABLET_WIDTH.addEventListener('change', checkSectionSwiper);
  });
};

export { initCardsSwiper };
