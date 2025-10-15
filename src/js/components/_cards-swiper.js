import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { getBlockClass } from './../_utils.js';

const sections = document.querySelectorAll('[data-swiper="cards"]');

const initCardsSwiper = () => {
  if (!sections.length) return;

  sections.forEach((section) => {
    const sectionClass = getBlockClass(section);

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

    initImgSwiper();
  });
};

export { initCardsSwiper };
