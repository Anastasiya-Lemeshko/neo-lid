import { closeSubMenu, removeNavToggles, setNavToggles } from './_nav-submenu.js';
import { isEscapeKey, getScrollWidth } from './../_utils.js';
import { DESKTOP_WIDTH } from "./../_vars.js";

const nav = document.querySelector('.nav');
const burgerMenu = nav ? nav.querySelector('.nav__burger') : null;
const navLinks = nav ? nav.querySelectorAll('.nav__link') : null;
const navButtons = nav ? nav.querySelectorAll('.nav__button') : null;
const subMenuItems = nav ? nav.querySelectorAll('.nav__item--sub-menu') : null;

let scrollSize = 0;

const removeTabIndex = () => {
  navLinks.forEach((link) => {
    link.setAttribute('tabindex', '-1');
  });
  navButtons.forEach((button) => {
    button.setAttribute('tabindex', '-1');
  });
};

const setTabIndex = () => {
  navLinks.forEach((link) => {
    link.setAttribute('tabindex', '0');
  });
  navButtons.forEach((button) => {
    button.setAttribute('tabindex', '0');
  });
};

const openMobileMenu = () => {
  nav.classList.add('nav--menu-opened');
  burgerMenu.classList.add('button--secondary');
  document.body.classList.add('page__scroll-lock');
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
  nav.addEventListener('focusout', onNavFocusOut);
  setTabIndex();
  setNavToggles();

  scrollSize = getScrollWidth();
  document.body.style.paddingRight = `${scrollSize}px`;
};

const closeMobileMenu = () => {
  nav.classList.remove('nav--menu-opened');
  burgerMenu.classList.remove('button--secondary');
  document.body.classList.remove('page__scroll-lock');
  document.body.style.paddingRight = 0;
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
  nav.removeEventListener('focusout', onNavFocusOut);
  removeTabIndex();
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
  removeTabIndex();

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });
}

DESKTOP_WIDTH.addEventListener('change', () => {
  if (DESKTOP_WIDTH.matches) {
    setTabIndex();
  } else {
    removeTabIndex();
  }
});

export { toggleBurgerMenu };
