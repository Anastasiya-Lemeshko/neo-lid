import {
  isEscapeKey,
  isArrowDownKey,
  isArrowUpKey,
  isEnterKey,
  setTabIndex,
  removeTabIndex
} from '../_utils.js';

const dropdowns = document.querySelectorAll('.dropdown');

const setDropdown = () => {
  if (!dropdowns) return;

  dropdowns.forEach((dropdown) => {
    const dropdownButton = dropdown.querySelector('.select__button');
    const dropdownList = dropdown.querySelector('.select__list');

    if (!dropdownList) return;

    const checkTabIndex = () => {
      const options = dropdownList.querySelectorAll('.select__item-link');

      if (dropdown.classList.contains('dropdown--open')) {
        setTabIndex(options);
        dropdownList.addEventListener('focusout', onSelectFocusOut);
      } else {
        removeTabIndex(options);
        dropdownList.removeEventListener('focusout', onSelectFocusOut);
      }
    };

    const openSelect = () => {
      dropdown.classList.add('dropdown--open');
      checkTabIndex();
      dropdownList.addEventListener('click', onSelectOptionClick);
      document.addEventListener('keydown', onSelectKeydown);
      document.addEventListener('click', onDocumentClick);
    };

    const closeSelect = () => {
      dropdown.classList.remove('dropdown--open');
      checkTabIndex();

      dropdownButton.focus();
      dropdownList.removeEventListener('click', onSelectOptionClick);
      document.removeEventListener('keydown', onSelectKeydown);
      document.removeEventListener('click', onDocumentClick);
    };

    const toggleSelect = () => {
      dropdownButton.addEventListener('click', () => {
        if (dropdown.classList.contains('dropdown--open')) {
          closeSelect();
        } else {
          openSelect();
        }
      });
    };

    function onSelectKeydown(evt) {
      const open = dropdown.classList.contains('dropdown--open');
      const options = Array.from(dropdownList.querySelectorAll('a'));
      const currentIndex = options.indexOf(document.activeElement);

      if (!open) {
        return;
      }

      if (isArrowDownKey(evt)) {
        evt.preventDefault();

        if (currentIndex < options.length - 1) {
          options[currentIndex + 1].focus();
        } else {
          options[0].focus();
        }
        return;
      }

      if (isArrowUpKey(evt)) {
        evt.preventDefault();

        if (currentIndex > 0) {
          options[currentIndex - 1].focus();
        } else {
          options[options.length - 1].focus();
        }
        return;
      }

      if (isEnterKey(evt)) {
        evt.preventDefault();

        if (currentIndex > 0) {
          closeSelect();
        }
        return;
      }

      if (isEscapeKey(evt)) {
        closeSelect();
      }

    }

    function onSelectOptionClick(evt) {
      if (evt.target.tagName === 'A') {
        closeSelect();
      }
    }

    function onDocumentClick(evt) {
      if (!dropdown.contains(evt.target)) {
        closeSelect();
      }
    }

    function onSelectFocusOut(evt) {
      if (evt.relatedTarget === null || !dropdown.contains(evt.relatedTarget)) {
        closeSelect();
      }
    }

    toggleSelect();
  });

};

export { setDropdown };

