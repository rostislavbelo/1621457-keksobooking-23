const NUMBER_MIN = 1;
const MIN_INDEX = 0;
const STRING_INDEX = 2;
const LIMIT_SINGS = 5;
const ROOM_MAX = 3;
const GUESTS_MAX = 3;
const PRICE_MAX = 1000000;
const AVATAR_NUMBERS = 10;
const PHOTOS_ROOT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking';

const TITLES = [
  'Сдается в аренду',
  'Проживание со всеми удобствами',
  'Предлагаем для длительного проживания',
  'Вы захотите вернуться сюда снова',
];
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
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
  Location
};
