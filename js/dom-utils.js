const removeExtraFeatures = (elements, features) => {
  elements.forEach((element) => {
    const classes = element.classList[1].split('--');

    if (!features.includes(classes[1])) {
      element.remove();
    }
  });
};

const renderPhotos = (element, photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photoUrl) => {
    const photoElement = element.cloneNode(true);

    photoElement.src = photoUrl;
    fragment.appendChild(photoElement);
  });

  element.remove();

  return fragment;
};

const setOrRemove = (element, value, text) => {
  if (!value) {
    element.remove();

    return;
  }

  element.textContent = text ? text : value;
};

export {
  removeExtraFeatures,
  renderPhotos,
  setOrRemove
};

