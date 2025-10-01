import {
  setTabIndex,
  removeTabIndex
} from '../_utils.js';

const nav = document.querySelector('.nav');
const navButtons = nav ? nav.querySelectorAll('.nav__button') : null;
const navSubLinks = nav ? nav.querySelectorAll('.nav__sub-link') : null;

if (navSubLinks) {
  removeTabIndex(navSubLinks);
}

const openSubMenu = (item) => {
  const subLinks = item.querySelectorAll('.nav__sub-link');
  const menuGroup = item.querySelector('.nav__sub-list');

  item.classList.add('nav__item--open');
  menuGroup.style.maxHeight = `${menuGroup.scrollHeight}px`;

  setTabIndex(subLinks);
};

const closeSubMenu = (item) => {
  const subLinks = item.querySelectorAll('.nav__sub-link');
  const menuGroup = item.querySelector('.nav__sub-list');

  item.classList.remove('nav__item--open');
  menuGroup.style.maxHeight = null;

  removeTabIndex(subLinks);
};

const onNavSubButtonClick = (evt) => {
  const currentItem = evt.target.closest('.nav__item');

  if (currentItem.classList.contains('nav__item--open')) {
    closeSubMenu(currentItem);
  } else {
    openSubMenu(currentItem);
  }
};

const setNavToggles = () => {
  navButtons.forEach((button) => {
    button.addEventListener('click', onNavSubButtonClick);
  });
};

const removeNavToggles = () => {
  navButtons.forEach((button) => {
    button.removeEventListener('click', onNavSubButtonClick);
  });
};

export { closeSubMenu, setNavToggles, removeNavToggles };
