const body = document.querySelector('body');
const adForm = body.querySelector('.ad-form');
const mapFilters = body.querySelector('.map__filters');
const loadError = body.querySelector('#load-error').content;
const errorButton = body.querySelector('.error__button');

const FORMS = [
  {
    element: adForm,
    disabledClass: 'ad-form--disabled',
    selector: 'fieldset.ad-form__element',
  },
  {
    element: mapFilters,
    disabledClass: 'map__filters--disabled',
    selector: 'select, fieldset',
  },
];

const success = body.querySelector('#success')
  .content
  .querySelector('.success');

const error = body.querySelector('#error')
  .content
  .querySelector('.error');

const errorElement = error.cloneNode(true);
const successElement = success.cloneNode(true);

const switchForm = (form, className, selector, enable) => {
  const controls = form.querySelectorAll(selector);

  if (enable) {
    form.classList.remove(className);
  } else {
    form.classList.add(className);
  }

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
  const cloneError = loadError.cloneNode(true);
  body.append(cloneError);
};

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

const showMessageSuccess = () => {
  body.append(successElement);
  document.addEventListener('keydown', removeElementEsc);
  document.addEventListener('click', removeSuccess);
};

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

const showMessageError = () => {
  body.append(errorElement);
  document.addEventListener('keydown', removeErrorEsc);
  document.addEventListener('click', removeError);
  errorButton.addEventListener('click', removeError);
};

export {
  disableForms,
  enableForms,
  onError,
  showMessageSuccess,
  showMessageError,
  body,
  adForm
};
