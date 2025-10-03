import { renderCustomSelect } from './components/_custom-select.js';
import { toggleBurgerMenu } from './components/_open-nav-menu.js';
import { moveNav } from './components/_move-nav.js';
import { openPopup } from './components/_nav-popup.js';
import { initPromoSwiper } from './components/_promo-swiper.js';
import './components/_cards-swiper.js';

document.addEventListener('DOMContentLoaded', () => {
  renderCustomSelect();
  toggleBurgerMenu();
  moveNav();
  openPopup();
  initPromoSwiper();
});
