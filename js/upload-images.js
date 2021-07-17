import { FORM } from './constants.js';

const PREVIEW_IMG = FORM.querySelector('.ad-form-header__preview img');
const AVATAR_IMG = FORM.querySelector('.ad-form-header__input');
const HOUSING_IMG = FORM.querySelector('.ad-form__input');
const IMAGES_PREVIEW = FORM.querySelector('.ad-form__photo');
const URL_IMG_AVATAR = 'img/muffin-grey.svg';

const FILE_TYPES = ['jpeg', 'png', 'gif', 'jpg'];

const downloadFotoHousing = () => {
  const file = HOUSING_IMG.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      IMAGES_PREVIEW.style.backgroundImage = `url(${reader.result})`;
      IMAGES_PREVIEW.style.backgroundSize = '70px 70px';
    });

    reader.readAsDataURL(file);
  }
};

const downloadFotoUser = () => {
  const file = AVATAR_IMG.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      PREVIEW_IMG.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

const resetImages = () => {
  IMAGES_PREVIEW.style = '';
  PREVIEW_IMG.src = URL_IMG_AVATAR;
};

const addEventListenersImages = () => {
  AVATAR_IMG.addEventListener('change', downloadFotoUser);
  HOUSING_IMG.addEventListener('change', downloadFotoHousing);
};

export { resetImages, addEventListenersImages };
