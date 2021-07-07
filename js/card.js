import {
  getPlural
} from './utils.js';
import {
  AD_TYPES,
  GUESTS,
  ROOMS
} from './constants.js';

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

const SIMILAR_CARD_TEMPLATE = document.querySelector('#card')
  .content
  .querySelector('.popup');

const renderCard = (ad) => {
  const offer = ad.offer;
  const author = ad.author;
  const cardElement = SIMILAR_CARD_TEMPLATE.cloneNode(true);

  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__type').textContent = AD_TYPES[offer.type];
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__text--capacity').textContent = `${getPlural(offer.rooms, ROOMS)} для ${getPlural(offer.guests, GUESTS)}`;
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin} выезд до ${offer.checkout}`;
  const offerFeatureClasses = offer.features && offer.features.map((features) => `popup__feature--${features}`) || [];
  const featureElementList = cardElement.querySelectorAll('.popup__feature');
  const PHOTOS = cardElement.querySelector('.popup__photos');
  const PHOTO = PHOTOS.querySelector('.popup__photo');

  removeElement(featureElementList, offerFeatureClasses);

  fillOrDeletePhoto(offer.photos, PHOTOS, PHOTO);

  return cardElement;
};

export { renderCard };


