import { getPlural } from './utils.js';
import { GUESTS, ROOMS } from './constants.js';

const cardTemplate = document.querySelector('#card');
const cardTemplateElement = cardTemplate.content.querySelector('.popup');

const adTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const removeElement = (elements, elementClasses) => {
  elements.forEach((element) => {
    const elementClass = element.classList[1];
    if (!elementClasses.includes(elementClass)) {
      element.remove();
    }
  });
};

const fillOrDeletePhoto = (photos, block, element) => {
  if (!photos || photos.length === 0) {
    element.remove();
  } else {
    photos.forEach((photo) => {
      const clonePhoto = element.cloneNode(true);
      clonePhoto.src = photo;
      block.appendChild(clonePhoto);
    });
    element.remove();
  }
};

const renderCard = (ad) => {
  const offer = ad.offer;
  const author = ad.author;
  const cardElement = cardTemplateElement.cloneNode(true);
  const photos = cardElement.querySelector('.popup__photos');
  const photo = photos.querySelector('.popup__photo');

  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__type').textContent = adTypes[offer.type];
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__text--capacity').textContent = `${getPlural(offer.rooms, ROOMS)} для ${getPlural(offer.guests, GUESTS)}`;
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin} выезд до ${offer.checkout}`;
  const featureElementList = cardElement.querySelectorAll('.popup__feature');

  const getClassfeature = (features) => `popup__feature--${features}`;

  const offerFeatureClasses = offer.features && offer.features.map(getClassfeature) || [];

  removeElement(featureElementList, offerFeatureClasses);

  fillOrDeletePhoto(offer.photos, photos, photo);

  return cardElement;
};

export { renderCard, adTypes };


