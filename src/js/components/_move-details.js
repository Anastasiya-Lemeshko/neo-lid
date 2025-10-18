import { DESKTOP_WIDTH } from "./../_vars.js";

const details = document.querySelector('.details');
const content = details ? details.querySelector('.details__content') : null;
const info = content ? content.querySelector('.details__info') : null;
const char = content ? content.querySelector('.details__card-char') : null;
const userPanel = content ? content.querySelector('.details__user-panel') : null;
const actions = content ? content.querySelector('.details__actions') : null;

let isDetailsMoved = false;

const moveDetails = () => {
  if (content && DESKTOP_WIDTH.matches && !isDetailsMoved) {
    userPanel.prepend(info);
    content.appendChild(char);
    content.prepend(userPanel);
    content.prepend(actions);

    isDetailsMoved = true;
  }

  if (content && !DESKTOP_WIDTH.matches && isDetailsMoved) {
    content.appendChild(userPanel);
    content.appendChild(actions);
    content.prepend(char);
    content.prepend(info);

    isDetailsMoved = false;
  }
};

DESKTOP_WIDTH.addEventListener('change', moveDetails);

export { moveDetails };
