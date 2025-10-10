import { debounce } from './../_utils.js';

const sideNav = document.querySelector('.side-nav');
const footer = document.querySelector('.footer');

const onWindowScroll = () => {
  const scrollPosition = window.pageYOffset;
  const windowHeight = window.innerHeight;

  const isFooterVisible = footer ? footer.getBoundingClientRect().top < windowHeight : false;

  if (scrollPosition > 550 && !isFooterVisible) {
    sideNav.classList.add('side-nav--visible');
  } else {
    sideNav.classList.remove('side-nav--visible');
  }
};

const debouncedOnScrollWindow = debounce(onWindowScroll, 30);

const onScrollButtonClick = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const addSideNav = () => {
  if (!sideNav) return;

  window.addEventListener('scroll', debouncedOnScrollWindow);
  sideNav.addEventListener('click', onScrollButtonClick);
};

export { addSideNav };
