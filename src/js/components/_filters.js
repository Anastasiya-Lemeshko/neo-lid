import { TABLET_WIDTH } from './../_vars.js';

const filters = document.querySelector('.filters');
const filtersWrapper = filters ? filters.querySelector('.filters__wrapper') : null;
const controls = filters ? filters.querySelector('.filters__controls') : null;
const filterPanel = filters ? filters.querySelector('.filters__filter') : null;
const filterButton = filters ? filters.querySelector('.filters__filter-button') : null;
let isFilterMoved = false;

const moveFilters = () => {
  if (!controls || !filterPanel) return;

  if (!TABLET_WIDTH.matches) {
    filterPanel.classList.remove('filters__filter--opened');
  } else {
    filterPanel.classList.add('filters__filter--opened');
  }

  if (TABLET_WIDTH.matches && !isFilterMoved) {
    filtersWrapper.prepend(filterPanel);
  }

  if (!TABLET_WIDTH.matches && isFilterMoved) {
    filtersWrapper.prepend(controls);
  }
};

if (filterButton && filterPanel) {
  filterButton.addEventListener('click', () => {
    filterPanel.classList.toggle('filters__filter--opened');
  });
}

TABLET_WIDTH.addEventListener('change', moveFilters);

export { moveFilters };
