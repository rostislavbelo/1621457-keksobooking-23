import { URL_IMG_AVATAR, FILE_TYPES } from './constants.js';
import { adForm } from './dom-utils.js';

const previewAvatar = adForm.querySelector('.ad-form-header__preview img');
const avatarImage = adForm.querySelector('.ad-form-header__input');
const housingImage = adForm.querySelector('.ad-form__input');
const previewHousing = adForm.querySelector('.ad-form__photo');

const unloadPreview = (input, type) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {

      if (type === previewHousing) {
        previewHousing.style.backgroundImage = `url(${reader.result})`;
        previewHousing.style.backgroundSize = '70px 70px';
      }
      else {
        previewAvatar.src = reader.result;
      }

    });

    reader.readAsDataURL(file);
  }
};

const showtPrewiewHousing = () => {
  unloadPreview(housingImage, previewHousing);
};

const showPrewiewAvatar = () => {
  unloadPreview(avatarImage, previewAvatar);
};

const resetImages = () => {
  previewHousing.style = '';
  previewAvatar.src = URL_IMG_AVATAR;
  avatarImage.value = '';
  housingImage.value = '';
};

const addEventListenersImages = () => {
  housingImage.addEventListener('change', showtPrewiewHousing);
  avatarImage.addEventListener('change', showPrewiewAvatar);
};

export { resetImages, addEventListenersImages };
