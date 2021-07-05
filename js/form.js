import {
  HeaderLength,
  PriceValue,
  validateHeader
  //validatePrice - пока не используется, осталось от старого варианта.
}
  from './validate.js';

import {
  HEADER,
  ADDRESS,
  PRICE,
  ROOM_NUMBER,
  CAPACITY,
  TYPE,
  TIME_IN,
  TIME_OUT
} from './constants.js';

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
  ADDRESS.setAttribute('required', true);
  ADDRESS.setAttribute('placeholder', 'Введите адрес');
};

const prepareForm = () => {
  prepareHeader();
  preparePrice();
  prepareAddress();
};

const LIMIT_MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const TYPE_TEXT = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  palace: 'Дворец',
};

const handLimitPrice = () => {
  PRICE.placeholder = LIMIT_MIN_PRICE[TYPE.value];
  PRICE.min = LIMIT_MIN_PRICE[TYPE.value];
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

  if (value < LIMIT_MIN_PRICE[TYPE.value] || value > PriceValue.MAX) {
    element.setCustomValidity(`${TYPE_TEXT[TYPE.value]} от ${LIMIT_MIN_PRICE[TYPE.value]}, до ${PriceValue.MAX} за ночь`);
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

const addValidators = () => {
  HEADER.addEventListener('input', handleHeaderChange);
  PRICE.addEventListener('input', handlePriceChange);
  ROOM_NUMBER.addEventListener('change', handleRoomsCapacityChange);
  CAPACITY.addEventListener('change', handleRoomsCapacityChange);
  TYPE.addEventListener('change', handLimitPrice);
  TYPE.addEventListener('change', handLimitPrice);
  TIME_IN.addEventListener('change', compensationTimein);
  TIME_OUT.addEventListener('change', compensationTimeout);
};

prepareForm();

export { addValidators };
