const loadData = (url, onSuccess, onError) => {
  const dataPromise = fetch(url);

  dataPromise.then((response) => {
    if (!response.ok) {
      throw new Error('Данные не удалось получить.');
    }
    return response.json();
  }).then((json) => {
    onSuccess(json);
  }).catch((error) => {
    onError(error);
  });
};

const sendData = (url, body, onSuccess, onError) => {
  fetch(url, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Данные не удалось отправить.');
    })
    .then(() => {
      onSuccess();
    })
    .catch((error) => {
      onError(error);
    });
};

export { loadData, sendData };
