const FORM = document.querySelector('.ad-form');
const HEADER = FORM.querySelector('#title');
const ADDRESS = FORM.querySelector('#address');
const PRICE = FORM.querySelector('#price');
const ROOM_NUMBER = FORM.querySelector('#room_number');
const CAPACITY = FORM.querySelector('#capacity');
const TYPE = FORM.querySelector('#type');
const TIME_IN = FORM.querySelector('#timein');
const TIME_OUT = FORM.querySelector('#timeout');

const NUMBER_MIN = 1;
const MIN_INDEX = 0;
const STRING_INDEX = 2;
const LIMIT_SINGS = 5;
const ROOM_MAX = 3;
const GUESTS_MAX = 3;
const PRICE_MAX = 1000000;
const AVATAR_NUMBERS = 10;
const PHOTOS_ROOT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking';
const GUESTS = ['гостя', 'гостей', 'гостей'];
const ROOMS = ['комната', 'комнаты', 'комнат'];
const DATA_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const SAVE_URL = 'https://23.javascript.pages.academy/keksobooking';

const TITLES = [
  'Сдается в аренду крутое жильё',
  'Проживание со всеми удобствами',
  'Предлагаем для длительного проживания',
  'Вы захотите вернуться сюда снова',
  'Наилучшая локация для любителей пеших экскурсий',
];
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const AD_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTIONS = [
  'Великолепный вариант для комфортного проживания, богатая инфраструктура вокруг',
  'Апартаменты комфорт-класса для состоятельного гостя: дорого, но всё по-богатому',
  'Суперквартира недалеко от центра и тусовки филлипинских девушек',
  'Восхитительные виды из окон и приветливые глухониемые соседи',
  'У всех соседей есть антитела',
];
const PHOTOS = [
  `${PHOTOS_ROOT}/duonguyen-8LrGtIxxa4w.jpg`,
  `${PHOTOS_ROOT}/brandon-hoogenboom-SNxQGWxZQi0.jpg`,
  `${PHOTOS_ROOT}/claire-rendall-b6kAwr1i0Iw.jpg`,
];
const Location = {
  LAT_MIN: 35.65000,
  LAT_MAX: 35.70000,
  LNG_MIN: 139.70000,
  LNG_MAX: 139.80000,
};

export {
  MIN_INDEX,
  NUMBER_MIN,
  STRING_INDEX,
  ROOM_MAX,
  GUESTS_MAX,
  AVATAR_NUMBERS,
  PRICE_MAX,
  LIMIT_SINGS,
  DESCRIPTIONS,
  TITLES,
  TYPES,
  TIMES,
  FEATURES,
  PHOTOS,
  Location,
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
  SAVE_URL
};
