const getPluralIdx = (count) => {
  const c10 = count % 10;
  const c100 = count % 100;

  if (c10 === 1 && c100 !== 11) {
    return 0;
  }

  if (c10 >= 2 && c10 <= 4 && (c100 < 10 || c100 >= 20)) {
    return 1;
  }
  return 2;
};

const pluralize = (count, plurals) => plurals[getPluralIdx(count)];
const getPlural = (count, plurals) => `${count} ${pluralize(count, plurals)}`;

function debounce(callback, timeoutDelay) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  getPlural,
  debounce
};
