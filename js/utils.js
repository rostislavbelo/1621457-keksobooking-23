import { STRING_INDEX, MIN_INDEX } from './constants.js';

const isNumber = (value) => typeof value === 'number' && !Number.isNaN(value) && value >= 0;

const getRandomFraction = (min = 0, max = 0, dec = 0) => {
  if (!(isNumber(min) && isNumber(max) && isNumber(dec))) {
    throw new Error('Все аргументы должны быть числами равными или болше нуля');
  }

  const from = Math.min(min, max);
  const to = Math.max(min, max);
  const fraction = Math.pow(10, dec);

  return Math.round((Math.random() * (to - from) + from) * fraction) / fraction;
};

const getRandomInteger = (min, max) => getRandomFraction(min, max, 0);

const getPadLeft = (index) => `${index}`.padStart(STRING_INDEX, '0');

const getUrlAvatar = (index) => `img/avatars/user${getPadLeft(index)}.png`;

const getRandomArrayElement = (elements) => elements[getRandomInteger(MIN_INDEX, elements.length - 1)];

const getRandomBoolean = () => Math.random() >= 0.5;

const createArrayRandom = (items) => {
  const array = items.filter(getRandomBoolean);

  if (array.length < 1) {
    array.push(items[Math.floor(Math.random() * items.length)]);
  }

  return array;
};

const getPluralIdx = (count) => {
  const c10 = count % 10;
  const c100 = count % 100;

  if (c10 === 1 && c100 !== 11) {
    return 0;
  }

  if (c10 >= 2 && c10 <= 4 && (c100 < 10 || c100 >= 20)) {
    return 1;
  }
  return 2;
};

const pluralize = (count, plurals) => plurals[getPluralIdx(count)];
const getPlural = (count, plurals) => `${count} ${pluralize(count, plurals)}`;

export {
  getRandomFraction,
  getRandomInteger,
  getRandomArrayElement,
  createArrayRandom,
  getUrlAvatar,
  getPlural
};
