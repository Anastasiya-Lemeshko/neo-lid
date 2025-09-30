import { DESKTOP_WIDTH } from "./../_vars.js";

const nav = document.querySelector('.nav');
const logo = nav ? nav.querySelector('.nav__logo-wrapper') : null;
const catalog = nav ? nav.querySelector('.nav__item--catalog') : null;
const account = nav ? nav.querySelector('.nav__item--account') : null;
const accountLink = account ? account.querySelector('.nav__item--account a') : null;
const userList = nav ? nav.querySelector('.nav__user-list') : null;
const navList = nav ? nav.querySelector('.nav__list') : null;

const navTop = nav ? nav.querySelector('.nav__top') : null;
const navBottom = nav ? nav.querySelector('.nav__bottom') : null;
let isUserNavMoved = false;

const moveNav = () => {
  if (nav && DESKTOP_WIDTH.matches && !isUserNavMoved) {
    navBottom.prepend(catalog);
    navBottom.prepend(logo);
    userList.prepend(account);
    account.classList.remove('nav__item');
    account.classList.add('nav__user-item');
    accountLink.classList.remove('nav__link');
    accountLink.classList.add('nav__user-link', 'nav__user-link--account');

    // navTop.appendChild(userNav);
    // mainNav.appendChild(theme);
    // mainNavItem.setAttribute('aria-hidden', 'true');
    isUserNavMoved = true;
  }

  if (nav && !DESKTOP_WIDTH.matches && isUserNavMoved) {
    navTop.appendChild(logo);
    navList.appendChild(account);
    account.classList.add('nav__item');
    account.classList.remove('nav__user-item');
    navList.prepend(catalog);
    accountLink.classList.add('nav__link');
    accountLink.classList.remove('nav__user-link', 'nav__user-link--account');



    // mainNavItem.appendChild(userNav);
    // mainNav.prepend(theme);
    // mainNavItem.removeAttribute('aria-hidden');
    isUserNavMoved = false;
  }
};

DESKTOP_WIDTH.addEventListener('change', moveNav);

export { moveNav };
