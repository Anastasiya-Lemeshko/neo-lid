import Swiper from 'swiper';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { addSwiperClass, removeSwiperClass, setSlidesTabIndex, checkVisibleSlides } from './../_utils.js';
import { DESKTOP_WIDTH } from './../_vars.js';

const promo = document.querySelector('.promo')
const promoMainSwiper = promo ? promo.querySelector('.promo__main-swiper') : null;
const promoCatalogSwiper = promo ? promo.querySelector('.promo__catalog-swiper') : null;
const promoServiceSwiper = promo ? promo.querySelector('.promo__service-swiper') : null;

const initPromoSwiper = () => {
  if (promoMainSwiper) {
    new Swiper(promoMainSwiper, {
      modules: [Autoplay, EffectFade],
      direction: 'horizontal',
      speed: 500,
      slideActiveClass: 'promo__main-slide--active',
      allowTouchMove: true,
      slidesPerView: 1,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },

      autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        reverseDirection: false,
        waitForTransition: true,
      }
    });
  }

  if (promoCatalogSwiper) {
    let swiperContainer = null;

    const destroyPromoCatalogSwiper = (swiper, el) => {
      if (swiperContainer) {
        swiperContainer.destroy();
        swiperContainer = null;
        removeSwiperClass(swiper, el);
      }
    };

    const initPromoCatalogSwiper = () => {
      addSwiperClass(promoCatalogSwiper, 'promo__catalog-');

      swiperContainer = new Swiper(promoCatalogSwiper, {
        modules: [Navigation],
        speed: 500,
        direction: 'horizontal',
        loop: true,
        spaceBetween: 10,
        allowTouchMove: true,
        slidesPerView: 1,

        breakpoints: {
          768: {
            slidesPerView: 2,
          },
        },

        navigation: {
          nextEl: '.promo__catalog-button--next',
          prevEl: '.promo__catalog-button--prev',
        },
      });
    };

    const checkPromoCatalogSwiper = () => {
      if (DESKTOP_WIDTH.matches && swiperContainer) {
        destroyPromoCatalogSwiper(promoCatalogSwiper, 'promo__catalog-');
      } else if (!DESKTOP_WIDTH.matches && !swiperContainer) {
        initPromoCatalogSwiper();
      }
    };

    checkPromoCatalogSwiper();
    DESKTOP_WIDTH.addEventListener('change', checkPromoCatalogSwiper);
  }

  if (promoServiceSwiper) {
    new Swiper(promoServiceSwiper, {
      modules: [Navigation],
      speed: 500,
      direction: 'horizontal',
      loop: true,
      spaceBetween: 10,
      allowTouchMove: true,
      slidesPerView: 1,

      breakpoints: {
        768: {
          slidesPerView: 2,
        },
      },

      navigation: {
        nextEl: '.promo__service-button--next',
        prevEl: '.promo__service-button--prev',
      },

      on: {
        init: function () {
          const numberOfVisibleSlides = checkVisibleSlides('promo');
          setSlidesTabIndex(this, numberOfVisibleSlides);
        },
        slideChange: function () {
          const numberOfVisibleSlides = checkVisibleSlides('promo');
          setSlidesTabIndex(this, numberOfVisibleSlides);
        }
      },
    });
  }
};

export { initPromoSwiper };
