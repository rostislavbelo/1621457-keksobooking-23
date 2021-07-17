import { FORM, EMPTY_VALUE } from './constants.js';

const PREVIEW_IMG = FORM.querySelector('.ad-form-header__preview img');
const AVATAR_IMG = FORM.querySelector('.ad-form-header__input');
const HOUSING_IMG = FORM.querySelector('.ad-form__input');
const IMAGES_PREVIEW = FORM.querySelector('.ad-form__photo');
const URL_IMG_AVATAR = 'img/muffin-grey.svg';

const FILE_TYPES = ['jpeg', 'png', 'gif', 'jpg'];

const unloadPreview = (inpit, previewHousing, previewAvatar) => {
  const file = inpit.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {

      if (previewHousing) {
        previewHousing.style.backgroundImage = `url(${reader.result})`;//form
        previewHousing.style.backgroundSize = '70px 70px';
      }

      if (previewAvatar) {
        previewAvatar.src = reader.result;
      }

    });

    reader.readAsDataURL(file);
  }
};

const showtPrewiewHousing = () => {
  unloadPreview(HOUSING_IMG, IMAGES_PREVIEW, EMPTY_VALUE);
};

const showPrewiewAvatar = () => {
  unloadPreview(AVATAR_IMG, EMPTY_VALUE, PREVIEW_IMG);
};

const resetImages = () => {
  IMAGES_PREVIEW.style = '';
  PREVIEW_IMG.src = URL_IMG_AVATAR;
  AVATAR_IMG.value = '';
  HOUSING_IMG.value = '';
};

const addEventListenersImages = () => {
  HOUSING_IMG.addEventListener('change', showtPrewiewHousing);
  AVATAR_IMG.addEventListener('change', showPrewiewAvatar);
};

export { resetImages, addEventListenersImages };
