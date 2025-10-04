export default {
  windowEl: window,
  documentEl: document,
  htmlEl: document.documentElement,
  bodyEl: document.body,
}

export const TABLET_WIDTH = window.matchMedia('(min-width: 768px)');
export const DESKTOP_WIDTH = window.matchMedia('(min-width: 1366px)');

export const SLIDES_COUNT = {
  'default': 1,
  'promo': {
    'mobile': 1,
    'tablet': 2,
    'desktop': 2
  },
  'cards': {
    'mobile': 1,
    'tablet': 1,
    'desktop': 1
  },
};
