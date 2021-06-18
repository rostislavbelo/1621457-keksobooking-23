const AVATAR_NUMBERS = 10;

const TITLE = ['Сдается в аренду', 'Проживание со всеми удобствами', 'Предлагаем для длительного проживания', 'Вы захотите вернуться сюда снова'];

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const TIMES = ['12:00', '13:00', '14:00'];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const DESCRIPTION = [
  'Великолепный вариант для комфортного проживания, богатая инфраструктура вокруг',
  'Апартаменты комфорт-класса для состоятельного гостя: дорого, но всё по-богатому',
  'Суперквартира недалеко от центра и тусовки филлипинских девушек',
  'Восхитительные виды из окон и приветливые глухониемые соседи'];

const PHOTOS_ROOT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking';

const PHOTOS = [
  `${PHOTOS_ROOT}/duonguyen-8LrGtIxxa4w.jpg`,
  `${PHOTOS_ROOT}/brandon-hoogenboom-SNxQGWxZQi0.jpg`,
  `${PHOTOS_ROOT}/claire-rendall-b6kAwr1i0Iw.jpg`];

const LOCATION = {
  LAT_MIN: 35.65000,
  LAT_MAX: 35.70000,
  LNG_MIN: 139.70000,
  LNG_MAX: 139.80000,
};

const isNumber = (value) => typeof value === 'number' && !Number.isNaN(value) && value >= 0;

const getRandomFraction = (min = 0, max = 0, dec = 0) => {
  if (!(isNumber(min) && isNumber(max) && isNumber(dec))) {
    throw new Error('Все аргументы должны быть числами, равными или больше нуля');
  }

  const from = Math.min(min, max);
  const to = Math.max(min, max);
  const fraction = Math.pow(10, dec);

  return Math.round((Math.random() * (to - from) + from) * fraction) / fraction;
};

const getRandomInteger = (min, max) => getRandomFraction(min, max, 0);

const makeUniqueRandomIntegerGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      throw new Error(`Перебраны все числа из диапазона от ${min} до ${max}`);
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const randomAvatarIdx = makeUniqueRandomIntegerGenerator(1, AVATAR_NUMBERS);


const getCard = () => {

  const padLeft = `${randomAvatarIdx()}`.padStart(2, '0');

  const getAvatar = `img/avatars/user${padLeft}.png`;

  const time = getRandomArrayElement(TIMES);

  const lat = getRandomFraction(LOCATION.LAT_MIN, LOCATION.LAT_MAX, 5);

  const lng = getRandomFraction(LOCATION.LNG_MIN, LOCATION.LNG_MAX, 5);

  return {
    author: {
      avatar: getAvatar,
    },
    offer: {
      title: getRandomArrayElement(TITLE),
      address: `location.${lat}, location.${lng}`,
      price: getRandomInteger(1, 1000000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(1, 10),
      guests: getRandomInteger(1, 20),
      checkin: time,
      checkout: time,
      features: FEATURES.slice(getRandomInteger(0, FEATURES.length - 1)),
      description: getRandomArrayElement(DESCRIPTION),
      photos: PHOTOS.slice(getRandomInteger(0, PHOTOS.length - 1)),
    },
    location: {
      lat,
      lng,
    },
  };
};

getCard();

// Ниже проверка - вызов в консоль 10 результатов. Закомментировано, чтобы нпм-тест не ругался;

/* for (let i = 1; i <= 10; i++) {
  console.log(getCard());
}
 */
