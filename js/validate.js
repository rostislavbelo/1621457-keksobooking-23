const HeaderLength = {
  MIN: 30,
  MAX: 100,
};

const PriceValue = {
  MIN: 0,
  MAX: 1000000,
};

const isString = (value) => typeof value === 'string';
const isNumber = (value) => typeof value === 'number' && !Number.isNaN(value);

const validateNumber = (value, min, max) =>
  isNumber(value) && value >= min && value <= max;

const validateLength = (value, minLength, maxLength) =>
  isString(value) && validateNumber(value.length, minLength, maxLength);

const validateHeader = (header) => validateLength(header, HeaderLength.MIN, HeaderLength.MAX);

const validatePrice = (price) => validateNumber(price, PriceValue.MIN, PriceValue.MAX);


export { HeaderLength, PriceValue, validateHeader, validatePrice };

