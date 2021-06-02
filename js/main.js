const isNumber = (n) => typeof n === "number" && !Number.isNaN(n);

const getRandomFraction = (min = 0, max = 0, dec = 0) => {
  if (!(isNumber(min) && isNumber(max) && isNumber(dec))) {
    throw new Error("Все аргументы должны быть числами");
  }

  const from = Math.min(min, max);
  const to = Math.max(min, max);
  const fraction = Math.pow(10, dec);

  return Math.round((Math.random() * (to - from) + from) * fraction) / fraction;
};

getRandomFraction(0, 12, 3);

const getRandomInteger = (min, max) => getRandomFraction(min, max, 0);

getRandomInteger(0, 33);
