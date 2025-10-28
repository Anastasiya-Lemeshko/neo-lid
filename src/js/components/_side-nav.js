import { debounce } from './../_utils.js';

const sideNav = document.querySelector('.side-nav');
const footer = document.querySelector('.footer');

const onWindowScroll = () => {
  const scrollPosition = window.pageYOffset;

  const isFooterVisible = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;

  if (scrollPosition > 550 && !isFooterVisible) {
    sideNav.classList.add('side-nav--visible');
  } else {
    sideNav.classList.remove('side-nav--visible');
  }
};

const debouncedOnScrollWindow = debounce(onWindowScroll, 30);

const addSideNav = () => {
  if (!sideNav) return;

  window.addEventListener('scroll', debouncedOnScrollWindow);
};

export { addSideNav };
