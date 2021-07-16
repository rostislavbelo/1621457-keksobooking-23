import { BODY } from './constants.js';

const AD_FORM = document.querySelector('.ad-form');
const MAP_FILTRES = document.querySelector('.map__filters');

const FORMS = [
  {
    element: AD_FORM,
    disabledClass: 'ad-form--disabled',
    selector: 'fieldset.ad-form__element',
  },
  {
    element: MAP_FILTRES,
    disabledClass: 'map__filters--disabled',
    selector: 'select, fieldset',
  },
];

const SUCCESS = BODY.querySelector('#success')
  .content
  .querySelector('.success');

const ERROR = BODY.querySelector('#error')
  .content
  .querySelector('.error');

const LOAD_ERROR = BODY.querySelector('#load-error').content;
const ERROR_BUTTON = BODY.querySelector('.error__button');

const switchForm = (form, className, selector, enable) => {
  if (enable) {
    form.classList.remove(className);
  } else {
    form.classList.add(className);
  }

  const controls = form.querySelectorAll(selector);

  controls.forEach((control) => {
    if (enable) {
      control.removeAttribute('disabled');
    } else {
      control.setAttribute('disabled', true);
    }
  });
};

const switchForms = (enable) => {
  FORMS.forEach((form) => {
    switchForm(form.element, form.disabledClass, form.selector, enable);
  });
};

const disableForms = () => switchForms(false);
const enableForms = () => switchForms(true);

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onError = () => {
  const cloneError = LOAD_ERROR.cloneNode(true);
  BODY.append(cloneError);
};

const successElement = SUCCESS.cloneNode(true);

const removeSuccess = () => {
  successElement.remove();
  document.removeEventListener('click', removeSuccess);
};

const removeElementEsc = () => {
  if (isEscEvent) {
    removeSuccess();
    document.removeEventListener('keydown', removeElementEsc);
  }
};

const messageSuccess = () => {
  BODY.append(successElement);
  document.addEventListener('keydown', removeElementEsc);
  document.addEventListener('click', removeSuccess);
};

const errorElement = ERROR.cloneNode(true);

const removeError = () => {
  errorElement.remove();
  document.removeEventListener('click', removeError);
};

const removeErrorEsc = () => {
  if (isEscEvent) {
    removeError();
    document.removeEventListener('keydown', removeErrorEsc);
  }
};

const messageError = () => {
  BODY.append(errorElement);
  document.addEventListener('keydown', removeErrorEsc);
  document.addEventListener('click', removeError);
  ERROR_BUTTON.addEventListener('click', removeError);
};

export {
  disableForms,
  enableForms,
  onError,
  messageSuccess,
  messageError
};
