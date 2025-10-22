export default {
  windowEl: window,
  documentEl: document,
  htmlEl: document.documentElement,
  bodyEl: document.body,
}

export const TABLET_WIDTH = window.matchMedia('(min-width: 768px)');
export const DESKTOP_WIDTH = window.matchMedia('(min-width: 1366px)');

export const COUNT_GRID_COLUMNS = 2;

export const SLIDES_COUNT = {
  'default': 1,
  'promo': {
    'mobile': 1,
    'tablet': 2,
    'desktop': 2
  },
  'companies': {
    'mobile': 2,
    'tablet': 2,
    'desktop': 2
  },
  'delivery': {
    'mobile': 2,
    'tablet': 2,
    'desktop': 2
  },
  'latest': {
    'mobile': 2,
    'tablet': 2,
    'desktop': 2
  },
  'cards': {
    'mobile': 1,
    'tablet': 1,
    'desktop': 1
  },
  'service': {
    'mobile': 1,
    'tablet': 1,
    'desktop': 1
  },
  'navigation': {
    'mobile': 1,
    'tablet': 2,
    'desktop': 2
  },
};

export const FILTER_VALUES = {
  'default': {
    'min': 0,
    'max': 100,
    'step': 1,
    'start': 0,
    'end': 100,
  },
  'price': {
    'min': 2003242,
    'max': 8234212,
    'step': 1,
    'start': 2003242,
    'end': 8234212,
  },
  'height': {
    'min': 2100,
    'max': 2300,
    'step': 1,
    'start': 2100,
    'end': 2300,
  },
  'width': {
    'min': 1605,
    'max': 2300,
    'step': 1,
    'start': 1605,
    'end': 2300,
  },
  'length': {
    'min': 1605,
    'max': 2300,
    'step': 1,
    'start': 1605,
    'end': 2300,
  },
};
