import { setTabIndex, removeTabIndex } from "../_utils.js";
import { DESKTOP_WIDTH } from "../_vars.js";

const nav = document.querySelector('.nav');
const popupItems = nav ? nav.querySelectorAll('.nav__with-popup') : null;

let isAddListener = false;
let isFocusIn = false;

const onPopupEnter = (evt) => {
  if (!isFocusIn) {
    const popup = evt.target.closest('.nav__with-popup');
    const links = popup.querySelectorAll('a');
    popup.classList.add('nav__with-popup--active');
    setTabIndex(links);
    isFocusIn = true;
  }
};

const onPopupLeave = (evt) => {
  const popup = evt.target.closest('.nav__with-popup');
  const links = popup.querySelectorAll('a');
  popup.classList.remove('nav__with-popup--active');
  removeTabIndex(links);
  isFocusIn = false;
};

const onPopupFocusOut = (evt) => {
  const popup = evt.target.closest('.nav__with-popup');
  if (evt.relatedTarget === null || !popup.contains(evt.relatedTarget)) {
    onPopupLeave(evt);
  }
}

const openPopup = () => {
  if (popupItems && DESKTOP_WIDTH.matches) {
    popupItems.forEach((item) => {
      item.addEventListener('mouseenter', onPopupEnter);
      item.addEventListener('focusin', onPopupEnter);
      item.addEventListener('mouseleave', onPopupLeave);
      item.addEventListener('focusout', onPopupFocusOut);

      isAddListener = true;
    });
  }
};

const removepopup = () => {
  popupItems.forEach((item) => {
    item.removeEventListener('mouseenter', onPopupEnter);
    item.removeEventListener('focusin', onPopupEnter);
    item.removeEventListener('mouseleave', onPopupLeave);
    item.removeEventListener('focusout', onPopupFocusOut);

    isAddListener = false;
  });
};

DESKTOP_WIDTH.addEventListener('change', () => {
  if (popupItems && DESKTOP_WIDTH.matches && !isAddListener) {
    openPopup();
  }
  if (popupItems && !DESKTOP_WIDTH.matches && isAddListener) {
    removepopup();
  }
});

export { openPopup };
