const BODY = document.querySelector('body');
const FORM = BODY.querySelector('.ad-form');
const HEADER = FORM.querySelector('#title');
const DESCRIPTION = FORM.querySelector('#description');
const ADDRESS = FORM.querySelector('#address');
const PRICE = FORM.querySelector('#price');
const ROOM_NUMBER = FORM.querySelector('#room_number');
const CAPACITY = FORM.querySelector('#capacity');
const TYPE = FORM.querySelector('#type');
const TIME_IN = FORM.querySelector('#timein');
const TIME_OUT = FORM.querySelector('#timeout');
const CHECKBOX_FORM = BODY.querySelectorAll('input[type=checkbox]');
const CARD_TEMPLATE = BODY.querySelector('#card');
const CARD_TEMPLATE_ELEMENT = CARD_TEMPLATE.content.querySelector('.popup');
const MAP_FILTERS = BODY.querySelector('.map__filters');
const FEATURES_HOUSING = MAP_FILTERS.querySelector('#housing-features');
const TYPE_HOUSING = MAP_FILTERS.querySelector('#housing-type');
const PRICE_HOUSING = MAP_FILTERS.querySelector('#housing-price');
const ROOMS_HOUSING = MAP_FILTERS.querySelector('#housing-rooms');
const GUESTS_HOUSING = MAP_FILTERS.querySelector('#housing-guests');

const NUMBER_MIN = 1;
const LIMIT_SINGS = 5;
const ROOM_MAX = 3;
const GUESTS_MAX = 3;
const PRICE_FILTER_MIN = 10000;
const PRICE_FILTER_MAX = 50000;
const PRICE_MAX = 1000000;
const AVATAR_NUMBERS = 10;
const TIMEOUT_DELAY = 500;
const GUESTS = ['гостя', 'гостей', 'гостей'];
const ROOMS = ['комната', 'комнаты', 'комнат'];
const DATA_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const SAVE_URL = 'https://23.javascript.pages.academy/keksobooking';

const AD_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const LIMIT_MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

export {
  BODY,
  NUMBER_MIN,
  ROOM_MAX,
  DESCRIPTION,
  GUESTS_MAX,
  AVATAR_NUMBERS,
  PRICE_MAX,
  LIMIT_SINGS,
  AD_TYPES,
  GUESTS,
  ROOMS,
  FORM,
  HEADER,
  ADDRESS,
  PRICE,
  ROOM_NUMBER,
  CAPACITY,
  TYPE,
  TIME_IN,
  TIME_OUT,
  DATA_URL,
  SAVE_URL,
  CHECKBOX_FORM,
  FEATURES_HOUSING,
  MAP_FILTERS,
  TYPE_HOUSING,
  PRICE_HOUSING,
  ROOMS_HOUSING,
  GUESTS_HOUSING,
  CARD_TEMPLATE_ELEMENT,
  PRICE_FILTER_MIN,
  PRICE_FILTER_MAX,
  TIMEOUT_DELAY,
  LIMIT_MIN_PRICE
};
