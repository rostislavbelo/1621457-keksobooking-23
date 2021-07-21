import { PRICE_FILTER_MIN, PRICE_FILTER_MAX, SELECT_VALUE_PRICE, SELECT_KEY_ANY } from './constants.js';

const defaultFeatureValues = {
  wifi: false,
  dishwasher: false,
  parking: false,
  washer: false,
  elevator: false,
  conditioner: false,
};

const defaultSelectValues = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
};

let features = { ...defaultFeatureValues };
let selectValues = { ...defaultSelectValues };

const priceValue = {
  min: 'low',
  middle: 'middle',
  max: 'high',
};

const selectKeys = Object.keys(selectValues);

const setSelectValue = (name, value) => {
  selectValues[name] = value;
};

const setFeatureValue = (name, value) => {
  features[name] = value;
};

const checkPrice = (value, price) => {
  switch (value) {
    case priceValue.min:
      if (price > PRICE_FILTER_MIN) {
        return false;
      }

      break;

    case priceValue.middle:
      if (price < PRICE_FILTER_MIN || price >= PRICE_FILTER_MAX) {
        return false;
      }

      break;

    case priceValue.max:
      if (price < PRICE_FILTER_MAX) {
        return false;
      }

      break;
  }

  return true;
};

const filterAd = (ad) => {

  for (const key of selectKeys) {
    const value = selectValues[key];

    if (value !== SELECT_KEY_ANY) {
      if (key !== SELECT_VALUE_PRICE && String(ad.offer[key]) !== value) {
        return false;
      }

      if (key === SELECT_VALUE_PRICE && !checkPrice(value, ad.offer[key])) {
        return false;
      }
    }
  }

  const featureKeys = Object.keys(features);
  const adFeatures = ad.offer.features || [];

  for (const feature of featureKeys) {
    if (features[feature] && !adFeatures.includes(feature)) {
      return false;
    }
  }

  return true;
};

const resetFilterValues = () => {
  features = { ...defaultFeatureValues };
  selectValues = { ...defaultSelectValues };
};

export { filterAd, setFeatureValue, setSelectValue, resetFilterValues };
