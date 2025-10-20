import { COUNT_GRID_COLUMNS } from './../_vars.js';

const gridArray = document.querySelectorAll('[data-layout="grid-column"]');

const setGridColumnLayout = () => {
  if (!gridArray || !gridArray.length) return;

  gridArray.forEach((grid) => {
    const childElements = grid.children;

    const lengthOfOneColumn = Math.ceil(childElements.length / COUNT_GRID_COLUMNS);

    for (let i = 0; i < childElements.length; i++) {
      if (i < lengthOfOneColumn) {
        childElements[i].style.gridColumn = '1 / 2';
      } else {
        childElements[i].style.gridColumn = '2 / 3';
      }
    }
  });
};

export { setGridColumnLayout };
