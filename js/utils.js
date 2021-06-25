import {
  STRING_INDEX,
  MIN_INDEX
} from './variables.js';

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

export {
  getRandomFraction,
  getRandomInteger,
  getRandomArrayElement,
  createArrayRandom,
  getUrlAvatar
};
