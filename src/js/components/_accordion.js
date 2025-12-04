const accordionButtons = document ? document.querySelectorAll('.accordion-button') : null;

const openVisibleFontCardContent = () => {
  if (!accordionButtons.length) return;

  const visibleFontCardContent = document.querySelectorAll('.accordion-content--opened');
  visibleFontCardContent.forEach((element) => {
    element.style.maxHeight = `${element.scrollHeight}px`;
  });
};

const openCardDetails = (evt) => {
  evt.preventDefault();

  const currentButton = evt.target.closest('button');
  const currentAccordion = currentButton.closest('.accordion');
  const currentContent = currentAccordion ? currentAccordion.querySelector('.accordion-content') : currentButton.parentElement.querySelector('.accordion-content');

  if (!currentContent) return;

  currentContent.classList.toggle('accordion-content--opened');
  currentButton.classList.toggle('accordion-button--active');

  if (currentContent.classList.contains('accordion-content--opened')) {
    currentContent.style.maxHeight = `${currentContent.scrollHeight}px`;
  } else {
    currentContent.style.maxHeight = null;
  }
};

const setAccordeonToggles = () => {
  if (!accordionButtons.length) return;

  accordionButtons.forEach((button) => {
    button.addEventListener('click', openCardDetails);
  });
};

export { openVisibleFontCardContent, setAccordeonToggles };
