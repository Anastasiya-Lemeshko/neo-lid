import { setTabIndex, removeTabIndex } from "../_utils.js";
import { DESKTOP_WIDTH } from "../_vars.js";

const nav = document.querySelector('.nav');
const popupItems = nav ? nav.querySelectorAll('.nav__with-popup') : null;
const authButton = nav ? nav.querySelector('.nav__popup-login') : null;
const accountItem = nav ? nav.querySelector('.nav__item--account') : null;
const loginFormPopup = nav ? nav.querySelector('.nav__popup--login-form') : null;

let isAddListener = false;
let isFocusIn = false;
let isFormActive = false;

const onAuthButtonClick = () => {
  loginFormPopup.classList.remove('nav__popup--hidden');
  isFormActive = true;
};

const onPopupLeave = (evt) => {
  const activeElement = document.activeElement;
  const isInputFocused = activeElement.tagName === 'INPUT';
  if (isInputFocused) return;

  const popup = evt.target.closest('.nav__with-popup');
  const links = popup.querySelectorAll('a');
  const closeButton = popup.querySelector('.nav__popup-close')
  popup.classList.remove('nav__with-popup--active');
  removeTabIndex(links);

  if (closeButton) {
    closeButton.removeEventListener('click', onPopupLeave);
  }

  if (popup.classList.contains('nav__item--account')) {
    authButton.removeEventListener('click', onAuthButtonClick);
    loginFormPopup.classList.add('nav__popup--hidden');
  }

  isFocusIn = false;
};

const onPopupEnter = (evt) => {
  if (!isFocusIn) {
    const popup = evt.target.closest('.nav__with-popup');
    const links = popup.querySelectorAll('a');
    const closeButton = popup.querySelector('.nav__popup-close')
    popup.classList.add('nav__with-popup--active');
    setTabIndex(links);

    if (closeButton) {
      closeButton.addEventListener('click', onPopupLeave);
    }

    if (popup.classList.contains('nav__item--account')) {
      authButton.addEventListener('click', onAuthButtonClick);
    }

    isFocusIn = true;
  }
};

const onPopupFocusOut = (evt) => {
  const popup = evt.target.closest('.nav__with-popup');

  if ((evt.relatedTarget === null || !popup.contains(evt.relatedTarget)) && !isFormActive) {
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

const removePopup = () => {
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
    removePopup();
  }
});

export { openPopup };
