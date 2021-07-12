import {
  NUMBER_MIN, TIMES, TITLES, LIMIT_SINGS, MIN_INDEX, TYPES, PRICE_MAX, ROOM_MAX,
  GUESTS_MAX, FEATURES, DESCRIPTIONS, PHOTOS, AVATAR_NUMBERS, Location
} from './constants.js';

import { getRandomFraction, getRandomInteger, getRandomArrayElement, createArrayRandom, getUrlAvatar } from './utils.js';

const getAd = () => {
  const lat = getRandomFraction(Location.LAT_MIN, Location.LAT_MAX, LIMIT_SINGS);
  const lng = getRandomFraction(Location.LNG_MIN, Location.LNG_MAX, LIMIT_SINGS);
  const timing = getRandomArrayElement(TIMES);

  return {
    author: {
      avatar: getUrlAvatar(getRandomInteger(NUMBER_MIN, AVATAR_NUMBERS)),
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${lat}, ${lng}`,
      price: getRandomInteger(MIN_INDEX, PRICE_MAX),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(NUMBER_MIN, ROOM_MAX),
      guests: getRandomInteger(NUMBER_MIN, GUESTS_MAX),
      checkin: timing,
      checkout: timing,
      features: createArrayRandom(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: createArrayRandom(PHOTOS),
    },
    location: {
      lat,
      lng,
    },
  };
};

const getAds = () => {
  const ads = [];

  for (let index = 0; index < AVATAR_NUMBERS; index++) {
    ads.push(getAd(index + 1));
  }

  return ads;
};

export {
  getAds
};

