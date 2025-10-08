import { TABLET_WIDTH } from "./../_vars.js";

const forms = document.querySelectorAll('.form');
let isFormMoved = false;

const moveForm = () => {
  if (forms.length && TABLET_WIDTH.matches && !isFormMoved) {
    forms.forEach((form) => {
      const contacts = form.querySelector('.form__contacts');
      const socials = form.querySelector('.form__socials');
      const textarea = form.querySelector('textarea');
      contacts.appendChild(socials);
      textarea.setAttribute('rows', '8');
    });

    isFormMoved = true;
  }

  if (forms.length && !TABLET_WIDTH.matches && isFormMoved) {
    forms.forEach((form) => {
      const contacts = form.querySelector('.form__contacts');
      const socials = form.querySelector('.form__socials');
      const textarea = form.querySelector('textarea');
      contacts.prepend(socials);
      textarea.setAttribute('rows', '4');
    });


    isFormMoved = false;
  }
};

TABLET_WIDTH.addEventListener('change', moveForm);

export { moveForm };
