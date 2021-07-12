import { HeaderLength, PriceValue, validateHeader } from './validate.js';
import { HEADER, DESCRIPTION, ADDRESS, PRICE, ROOM_NUMBER, CAPACITY, TYPE, TIME_IN, TIME_OUT, AD_TYPES, FORM, SAVE_URL } from './constants.js';
import { sendData } from './api.js';
import { messageSuccess, messageError } from './dom-utils.js';
import { setInitialStateMap } from './map.js';

const prepareHeader = () => {
  HEADER.setAttribute('required', true);
  HEADER.setAttribute('minlength', HeaderLength.MIN);
  HEADER.setAttribute('maxlength', HeaderLength.MAX);
};

const preparePrice = () => {
  PRICE.setAttribute('required', true);
  PRICE.setAttribute('min', PriceValue.MIN);
  PRICE.setAttribute('max', PriceValue.MAX);
};

const prepareAddress = () => {
  ADDRESS.setAttribute('readonly', true);
  ADDRESS.setAttribute('placeholder', 'Введите адрес');
};

const prepareForm = () => {
  prepareHeader();
  preparePrice();
  prepareAddress();
};

const LimitMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const handLimitPrice = () => {
  PRICE.placeholder = LimitMinPrice[TYPE.value];
  PRICE.min = LimitMinPrice[TYPE.value];
};

const handleHeaderChange = (evt) => {
  const element = evt.target;
  const value = element.value;

  if (!validateHeader(value)) {
    element.setCustomValidity(`От ${HeaderLength.MIN} знаков, до ${HeaderLength.MAX}`);
  } else {
    element.setCustomValidity('');
  }

  element.reportValidity();
};

const handlePriceChange = (evt) => {
  const element = evt.target;
  const value = element.value;

  if (value < LimitMinPrice[TYPE.value] || value > PriceValue.MAX) {
    element.setCustomValidity(`${AD_TYPES[TYPE.value]} от ${LimitMinPrice[TYPE.value]}, до ${PriceValue.MAX} за ночь`);
  } else {
    element.setCustomValidity('');
  }

  element.reportValidity();
};

const handleRoomsCapacityChange = () => {
  const rooms = Number(ROOM_NUMBER.value);
  const count = Number(CAPACITY.value);

  let message = '';

  if (rooms === 100) {
    if (count !== 0) {
      message = '100 комнат - это не для гостей.';
    }
  } else {
    if (count === 0 || rooms < count) {
      message = 'Количество гостей должно быть меньше или равно количеству комнат.';
    }
  }

  CAPACITY.setCustomValidity(message);
  CAPACITY.reportValidity();
};

const compensationTimein = () => {
  TIME_OUT.value = TIME_IN.value;
};

const compensationTimeout = () => {
  TIME_IN.value = TIME_OUT.value;
};

const getStartValues = () => {
  setInitialStateMap();
  HEADER.value = '';
  DESCRIPTION.value = '';
  PRICE.value = '';
  ROOM_NUMBER.value = '1';
  TYPE.value = 'flat';
  CAPACITY.value = '1';
  TIME_IN.value = '12:00';
  TIME_OUT.value = '12:00';
};

const resetForms = (evt) => {
  evt.preventDefault();
  getStartValues();
};

const onSubmitSuccess = () => {
  messageSuccess();
  getStartValues();
};

const onSubmitError = () => {
  messageError();
};

const onSubmit = (evt) => {
  const formData = new FormData(evt.target);

  evt.preventDefault();
  sendData(SAVE_URL, formData, onSubmitSuccess, onSubmitError);
};

FORM.addEventListener('reset', resetForms);

const addValidators = () => {
  HEADER.addEventListener('input', handleHeaderChange);
  PRICE.addEventListener('input', handlePriceChange);
  ROOM_NUMBER.addEventListener('change', handleRoomsCapacityChange);
  CAPACITY.addEventListener('change', handleRoomsCapacityChange);
  TYPE.addEventListener('change', handLimitPrice);
  TYPE.addEventListener('change', handLimitPrice);
  TIME_IN.addEventListener('change', compensationTimein);
  TIME_OUT.addEventListener('change', compensationTimeout);
  FORM.addEventListener('submit', onSubmit);
};

prepareForm();

export { addValidators };
