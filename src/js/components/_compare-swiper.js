import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import {
  getSlidesCount,
  addSwiperClass,
  removeSwiperClass,
  setSlidesTabIndex,
  checkVisibleSlides,
  getSwiperClass,
  debounce
} from '../_utils.js';
import { TABLET_WIDTH, SLIDES_COUNT, SLIDER_GAP } from "../_vars.js";

const compare = document.querySelector('.compare__wrapper');
const imageSwiper = compare ? compare.querySelector('.compare__swiper') : null;
const charSwiper = compare ? compare.querySelector('.compare__char-swiper') : null;
const compareButtons = compare ? compare.querySelector('.compare__swiper-buttons') : null;

const onWindowScroll = () => {
  const compareRect = compare.getBoundingClientRect();

  const visibleTop = Math.max(compareRect.top, 0);
  const visibleBottom = Math.min(compareRect.bottom, window.innerHeight);
  const visibleHeight = Math.max(visibleBottom - visibleTop, 0);

  const isCompareVisible = visibleHeight >= window.innerHeight * 0.5;

  if (isCompareVisible) {
    compareButtons.classList.add('compare__swiper-buttons--visible');
  } else {
    compareButtons.classList.remove('compare__swiper-buttons--visible');
  }
};

const debouncedOnScrollWindow = debounce(onWindowScroll, 30);

const addWindowListener = () => {
  window.addEventListener('scroll', debouncedOnScrollWindow);
};

const removeWindowListener = () => {
  window.removeEventListener('scroll', debouncedOnScrollWindow);
};

const setCompareSwiper = () => {
  if (!imageSwiper || !charSwiper) return;

  const sectionClass = getSwiperClass(imageSwiper);
  const charLists = charSwiper.querySelectorAll('dl div')
  const charItem = charSwiper.querySelector('dd');

  const shiftChar = (index) => {
    const totalWidth = charItem.clientWidth + SLIDER_GAP.mobile;

    charLists.forEach((charList) => {
      charList.style.transform = `translateX(${-1 * totalWidth * index}px)`;
    });
  };

  const setImageSwiper = () => {
    let imageSwiperContainer = null;

    const destroyImageSwiper = (swiper, el) => {
      if (imageSwiperContainer) {
        imageSwiperContainer.destroy();
        imageSwiperContainer = null;
        removeSwiperClass(swiper, el);
      }
    };

    const initImageSwiper = () => {
      addSwiperClass(imageSwiper, sectionClass);

      imageSwiperContainer = new Swiper(imageSwiper, {
        modules: [Navigation],
        direction: 'horizontal',
        speed: 500,
        allowTouchMove: true,
        slidesPerView: 2,
        spaceBetween: 20,
        loop: false,

        breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        },

        navigation: {
          nextEl: `.${sectionClass}swiper-button--next`,
          prevEl: `.${sectionClass}swiper-button--prev`,
        },

        on: {
          init: function () {
            const numberOfVisibleSlides = checkVisibleSlides('compare');
            setSlidesTabIndex(this, numberOfVisibleSlides);
          },
          slideChange: function () {
            const numberOfVisibleSlides = checkVisibleSlides('compare');
            setSlidesTabIndex(this, numberOfVisibleSlides);
            shiftChar(this.activeIndex);
          }
        },
      });
    };

    const checkImageSwiper = () => {
      const isNeedSwiperMobile = getSlidesCount(imageSwiper) > SLIDES_COUNT.compare.mobile;
      const isNeedSwiperTablet = getSlidesCount(imageSwiper) > SLIDES_COUNT.compare.tablet;

      if (!imageSwiperContainer && (!TABLET_WIDTH.matches && isNeedSwiperMobile || TABLET_WIDTH.matches && isNeedSwiperTablet)) {
        initImageSwiper();
        addWindowListener();
      } else if (TABLET_WIDTH.matches && !isNeedSwiperTablet && imageSwiperContainer) {
        destroyImageSwiper(imageSwiper, sectionClass);
        removeWindowListener();
      }
    };

    checkImageSwiper();
    TABLET_WIDTH.addEventListener('change', checkImageSwiper);
  };

  const setCharSwiper = () => {
    const charClass = getSwiperClass(charSwiper);
    let charSwiperContainer = null;

    const destroyCharSwiper = (swiper, el) => {
      if (charSwiperContainer) {
        charSwiperContainer.destroy();
        charSwiperContainer = null;
        removeSwiperClass(swiper, el);
      }
    };

    const initCharSwiper = () => {
      addSwiperClass(charSwiper, charClass);

      charSwiperContainer = new Swiper(charSwiper, {
        modules: [Navigation],
        direction: 'horizontal',
        speed: 500,
        allowTouchMove: true,
        slidesPerView: 2,
        spaceBetween: 20,
        loop: false,

        breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        },

        navigation: {
          nextEl: `.${sectionClass}swiper-button--next`,
          prevEl: `.${sectionClass}swiper-button--prev`,
        },

        on: {
          init: function () {
            const numberOfVisibleSlides = checkVisibleSlides('compare');
            setSlidesTabIndex(this, numberOfVisibleSlides);
          },
          slideChange: function () {
            const numberOfVisibleSlides = checkVisibleSlides('compare');
            setSlidesTabIndex(this, numberOfVisibleSlides);
          }
        },
      });
    };

    const checkImageSwiper = () => {
      const isNeedSwiperTablet = getSlidesCount(imageSwiper) > SLIDES_COUNT.compare.tablet;

      if (!charSwiperContainer && TABLET_WIDTH.matches && isNeedSwiperTablet) {
        initCharSwiper();
      } else if (charSwiperContainer && TABLET_WIDTH.matches && !isNeedSwiperTablet || !TABLET_WIDTH.matches) {
        destroyCharSwiper(imageSwiper, charClass);
      }
    };

    checkImageSwiper();
    TABLET_WIDTH.addEventListener('change', checkImageSwiper);
  };

  setImageSwiper();
  setCharSwiper();
};

export { setCompareSwiper };
