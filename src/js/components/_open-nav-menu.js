import { closeSubMenu, removeNavToggles, setNavToggles } from './_nav-submenu.js';
import { isEscapeKey, getScrollWidth, setTabIndex, removeTabIndex } from './../_utils.js';
import { DESKTOP_WIDTH } from "./../_vars.js";

const nav = document.querySelector('.nav');
const menu = nav ? nav.querySelector('.nav__menu') : null;
const burgerMenu = nav ? nav.querySelector('.nav__burger') : null;
const navLinks = menu ? menu.querySelectorAll('a:not(.nav__sub-link), button:not(.nav__sub-link)') : null;
const subMenuItems = nav ? nav.querySelectorAll('.nav__item--sub-menu') : null;

let scrollSize = 0;

const openMobileMenu = () => {
  nav.classList.add('nav--menu-opened');
  burgerMenu.classList.add('nav__burger--active');
  document.body.classList.add('page__scroll-lock');
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
  nav.addEventListener('focusout', onNavFocusOut);
  setTabIndex(navLinks);
  setNavToggles();

  scrollSize = getScrollWidth();
  document.body.style.paddingRight = `${scrollSize}px`;
};

const closeMobileMenu = () => {
  nav.classList.remove('nav--menu-opened');
  burgerMenu.classList.remove('nav__burger--active');
  document.body.classList.remove('page__scroll-lock');
  document.body.style.paddingRight = 0;
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
  nav.removeEventListener('focusout', onNavFocusOut);
  removeTabIndex(navLinks);
  removeNavToggles();

  subMenuItems.forEach((item) => {
    closeSubMenu(item);
  });
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMobileMenu();
  }
}

function onNavFocusOut(evt) {
  if (evt.relatedTarget === null || !nav.contains(evt.relatedTarget)) {
    closeMobileMenu();
  }
}

function onDocumentClick(evt) {
  if (!nav.contains(evt.target)) {
    closeMobileMenu();
  }
}

const toggleBurgerMenu = () => {
  burgerMenu.addEventListener('click', () => {
    if (nav.classList.contains('nav--menu-opened')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
};

if (!DESKTOP_WIDTH.matches) {
  removeTabIndex(navLinks);
}

DESKTOP_WIDTH.addEventListener('change', () => {
  if (DESKTOP_WIDTH.matches) {
    setTabIndex(navLinks);
  } else {
    removeTabIndex(navLinks);
  }
});

export { toggleBurgerMenu };
