import { debounce } from '../_utils.js';

const compare = document.querySelector('.compare__wrapper');
const compareSwiperContainer = compare ? compare.querySelector('.compare__swiper-container') : null;
const compareSwiper = compareSwiperContainer ? compareSwiperContainer.querySelector('.compare__swiper') : null;
const cards = compareSwiper ? compareSwiper.querySelectorAll('.compare__card') : null;

const setStickyCards = () => {
  if (!compareSwiper || !cards || !cards.length) return;

  const visual = cards[0].querySelector('.compare__card-visual');
  const visualHeight = visual.offsetHeight;
  const contentHeight = cards[0].offsetHeight - visualHeight;
  const swiperHeight = compareSwiper.offsetHeight;

  const onWindowScroll = () => {
    const visualRect = visual.getBoundingClientRect();
    const isSwiperVisible = compareSwiperContainer.getBoundingClientRect().bottom >= contentHeight;
    const isCompareVisible = compare.getBoundingClientRect().bottom >= contentHeight;
    compareSwiperContainer.style.height = `${swiperHeight}px`;
    compareSwiper.style.setProperty('--visual-height', `${visualHeight}px`);

    if (visualRect.bottom <= 0) {
      compareSwiper.classList.add('compare__swiper--fixed');
    }

    if (isSwiperVisible || !isCompareVisible) {
      compareSwiper.classList.remove('compare__swiper--fixed');
    }
  };

  const debouncedOnScrollWindow = debounce(onWindowScroll, 30);

  window.addEventListener('scroll', debouncedOnScrollWindow);
};

const debouncedsetStickyCards = debounce(setStickyCards, 50);
window.addEventListener('resize', debouncedsetStickyCards);

export { setStickyCards };
