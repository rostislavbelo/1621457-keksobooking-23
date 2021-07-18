import { FORM } from './constants.js';

const PREVIEW_AVATAR = FORM.querySelector('.ad-form-header__preview img');
const AVATAR_IMG = FORM.querySelector('.ad-form-header__input');
const HOUSING_IMG = FORM.querySelector('.ad-form__input');
const PREVIEW_HOUSING = FORM.querySelector('.ad-form__photo');
const URL_IMG_AVATAR = 'img/muffin-grey.svg';

const ImageType = {
  housing: PREVIEW_HOUSING,
  avatar: PREVIEW_AVATAR,
};

const FILE_TYPES = ['jpeg', 'png', 'gif', 'jpg'];

const unloadPreview = (inpit, type) => {
  const file = inpit.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {

      if (type === ImageType.housing) {
        ImageType.housing.style.backgroundImage = `url(${reader.result})`;
        ImageType.housing.style.backgroundSize = '70px 70px';
      }

      if (type === ImageType.avatar) {
        ImageType.avatar.src = reader.result;
      }

    });

    reader.readAsDataURL(file);
  }
};

const showtPrewiewHousing = () => {
  unloadPreview(HOUSING_IMG, ImageType.housing);
};

const showPrewiewAvatar = () => {
  unloadPreview(AVATAR_IMG, ImageType.avatar);
};

const resetImages = () => {
  ImageType.housing.style = '';
  ImageType.avatar.src = URL_IMG_AVATAR;
  AVATAR_IMG.value = '';
  HOUSING_IMG.value = '';
};

const addEventListenersImages = () => {
  HOUSING_IMG.addEventListener('change', showtPrewiewHousing);
  AVATAR_IMG.addEventListener('change', showPrewiewAvatar);
};

export { resetImages, addEventListenersImages };
