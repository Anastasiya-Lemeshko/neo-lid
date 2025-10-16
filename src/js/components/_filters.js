import { TABLET_WIDTH } from './../_vars.js';

const filters = document.querySelector('.filters');
const filtersWrapper = filters ? filters.querySelector('.filters__wrapper') : null;
const controls = filters ? filters.querySelector('.filters__controls') : null;
const filterPanel = filters ? filters.querySelector('.filters__filter') : null;
const filterButton = filters ? filters.querySelector('.filters__filter-button') : null;
const filterView = filters ? filters.querySelector('.filters__view') : null;
const filterList = filters ? filters.querySelector('.filters__list') : null;
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

const setFilterToggles = () => {
  if (!filterView || !filterList) return;

  const animateToggle = () => {
    filterList.classList.add('filters__list--hidden');
    setTimeout(() => {
      filterList.classList.remove('filters__list--hidden');
    }, 500);
  };

  filterView.addEventListener('click', (evt) => {
    const button = evt.target.closest('button');

    filterView.querySelector('.filters__view-toggle--active').classList.remove('filters__view-toggle--active');
    button.classList.add('filters__view-toggle--active');

    if (button.classList.contains('filters__view-toggle--list')) {
      filterList.classList.add('filters__list--list');
      filterList.classList.remove('filters__list--grid', 'filters__list--short');
    } else if (button.classList.contains('filters__view-toggle--short')) {
      filterList.classList.remove('filters__list--grid', 'filters__list--list');
      filterList.classList.add('filters__list--short');
    } else {
      filterList.classList.remove('filters__list--short', 'filters__list--list');
      filterList.classList.add('filters__list--grid');
    }
  });
};

TABLET_WIDTH.addEventListener('change', moveFilters);

export { moveFilters, setFilterToggles };
