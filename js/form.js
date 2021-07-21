import { HeaderLength, PriceValue, validateHeader } from './validate.js';
import { SAVE_URL } from './constants.js';
import { sendData } from './api.js';
import { showMessageSuccess, showMessageError, body, adForm } from './dom-utils.js';
import { getData, prepareData } from './store.js';
import { setInitialStateMap, addPins, removePins } from './map.js';
import { renderCard, adTypes } from './card.js';
import { setFeatureValue, setSelectValue, filterAd, resetFilterValues } from './filters.js';
import { resetImages } from './upload-images.js';

const header = adForm.querySelector('#title');
const description = adForm.querySelector('#description');
const address = adForm.querySelector('#address');
const price = adForm.querySelector('#price');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const type = adForm.querySelector('#type');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const checkboxForm = body.querySelectorAll('input[type=checkbox]');
const mapFilters = body.querySelector('.map__filters');
const housingFeatures = mapFilters.querySelector('#housing-features');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');

const limitMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const prepareHeader = () => {
  header.setAttribute('required', true);
  header.setAttribute('minlength', HeaderLength.MIN);
  header.setAttribute('maxlength', HeaderLength.MAX);
};

const preparePrice = () => {
  price.setAttribute('required', true);
  price.setAttribute('min', PriceValue.MIN);
  price.setAttribute('max', PriceValue.MAX);
};

const prepareAddress = () => {
  address.setAttribute('readonly', true);
  address.setAttribute('placeholder', 'Введите адрес');
};

const prepareform = () => {
  prepareHeader();
  preparePrice();
  prepareAddress();
};

const handleLimitPrice = () => {
  price.value = limitMinPrice[type.value];
  price.min = limitMinPrice[type.value];
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

  if (value < limitMinPrice[type.value] || value > PriceValue.MAX) {
    element.setCustomValidity(`${adTypes[type.value]} от ${limitMinPrice[type.value]}, до ${PriceValue.MAX} за ночь`);
  } else {
    element.setCustomValidity('');
  }

  element.reportValidity();
};

const handleRoomsCapacityChange = () => {
  const rooms = Number(roomNumber.value);
  const count = Number(capacity.value);

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

  capacity.setCustomValidity(message);
  capacity.reportValidity();
};

const compensateTimeIn = () => {
  timeOut.value = timeIn.value;
};

const compensateTimeOut = () => {
  timeIn.value = timeOut.value;
};

const renderPins = () => {
  removePins();
  prepareData(filterAd);
  addPins(getData(), renderCard);
};

const resetCheckbox = () => {
  checkboxForm.forEach((checkbox) => checkbox.checked = false);
};

const resetInput = () => {
  header.value = '';
  description.value = '';
  price.value = '';
  price.placeholder = '1000';
  roomNumber.value = '1';
  type.value = 'flat';
  capacity.value = '1';
  timeIn.value = '12:00';
  timeOut.value = '12:00';
  housingType.value = 'any';
  housingPrice.value = 'any';
  housingRooms.value = 'any';
  housingGuests.value = 'any';
};

const resetStartValues = () => {
  setInitialStateMap();
  resetFilterValues();
  resetImages();
  resetInput();
  resetCheckbox();
  renderPins();
};

const resetforms = (evt) => {
  evt.preventDefault();
  resetStartValues();
};

const onSubmitSuccess = () => {
  showMessageSuccess();
  resetStartValues();
};

const onSubmitError = () => {
  showMessageError();
};

const onSubmit = (evt) => {
  const formData = new FormData(evt.target);

  evt.preventDefault();
  sendData(SAVE_URL, formData, onSubmitSuccess, onSubmitError);
};

const getFeatureChange = (onChange) => (evt) => {
  const el = evt.target;
  const name = el.value;
  const value = el.checked;

  setFeatureValue(name, value);
  onChange();
};

const getFilterChange = (onChange) => (evt) => {
  const el = evt.target;
  if (el.type === 'checkbox') {
    return;
  }
  const name = el.name.split('-')[1];
  const value = el.value;

  setSelectValue(name, value);
  onChange();
};

const addValidators = (onFiltersChange) => {
  header.addEventListener('input', handleHeaderChange);
  price.addEventListener('input', handlePriceChange);
  roomNumber.addEventListener('change', handleRoomsCapacityChange);
  capacity.addEventListener('change', handleRoomsCapacityChange);
  type.addEventListener('change', handleLimitPrice);
  timeIn.addEventListener('change', compensateTimeIn);
  timeOut.addEventListener('change', compensateTimeOut);
  adForm.addEventListener('submit', onSubmit);
  adForm.addEventListener('reset', resetforms);

  const onFilterChange = getFilterChange(onFiltersChange);
  const onFeatureChange = getFeatureChange(onFiltersChange);

  mapFilters.addEventListener('change', onFilterChange);
  housingFeatures.addEventListener('change', onFeatureChange);
};

prepareform();

export { addValidators, renderPins, body, adForm, adTypes };
