const chooseOptimalDistance = (t, k, ls) => {
  if (!isValidArguments(t, k, ls)) {
    return null;
  }
  const sumOfCombination = combine(ls, k);

  return parseInt(
      sumOfCombination.reduce(
        (total, current) =>
          current <= t ? (total <= current ? current : null) : total, 
          0
      )
    ) || null;
  //Чи більш зрозумілий але "важчий" з точки зору продуктивності
  //   return parseInt(sumOfCombination.filter((el) => el <= t).sort((a, b) => b - a)[0]) || null
};

function isValidArguments(t, k, ls) {
  const tIsValid = (Number.isInteger(t) && t >= 0) || false;
  const kIsValid = (Number.isInteger(k) && k >= 1) || false;
  const lsIsValid =
    (Array.isArray(ls) &&
      ls.length > 0 &&
      ls.length >= k &&
      ls.every((element) => Number.isInteger(element) && element >= 0)) ||
    false;

  return (tIsValid && kIsValid && lsIsValid) || false;
}

function combine(array, k) {
  const arrayMaxIndex = array.length - 1; 
  const maskMaxIndex = k - 1;
  const result = []; 
  const mask = [];
  let finish = false;
  for (let i = 0; i < k; i++) mask.push(array[i]); 
  while (!finish) {
    finish = true;
    const str = mask.join(" ");
    if (!result.includes(str)) result.push(str);
    for (let i = 0; i < k; i++) {
      if (mask[maskMaxIndex - i] != array[arrayMaxIndex - i]) {
        finish = false;
        let p = array.indexOf(mask[maskMaxIndex - i]);
        mask[maskMaxIndex - i] = array[++p];
        for (let j = maskMaxIndex - i + 1; j < k; j++) {
          mask[j] = array[++p];
        }
        break;
      }
    }
  }
  return result.map((element) =>
    element.split(" ").reduce((curr, el) => parseInt(curr) + parseInt(el))
  );
}

console.log(chooseOptimalDistance(174, 3, [51, 56, 58, 59, 61]));
console.log(chooseOptimalDistance(163, 3, [50]));

