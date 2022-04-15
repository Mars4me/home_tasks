

const chooseOptimalDistance = (t, k, ls) => {
  if (!isValidArguments(t, k, ls)) {
    return null;
  }
  const sumOfCombination = combine()(ls, k)
  .map((element) =>
    element.reduce((curr, el) => parseInt(curr) + parseInt(el)))
    
    const result = sumOfCombination.filter((el) => el <= t).sort((a, b) => b - a)[0]

    return result || null
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

function combine() {
  let res = null;
    const combinations = (ls, k, start, index, current) => {
      if (index === k) {
        res.push([...current]);
        return;
      }
      for (let i = start; i < ls.length; i ++) {
        current[index] = ls[i];
        combinations(ls, k, i + 1, index + 1, current);
      }
    };

  return function(ls, k){
    res = [];
    combinations(ls, k, 0, 0, []);
    const temp = res;
    res = null;
    return temp;
  };
}

console.log(chooseOptimalDistance(230, 3, [ 91, 74, 73, 85, 73, 81, 87 ]));
console.log(chooseOptimalDistance(174, 3, [51, 56, 58, 59, 61]));
console.log(chooseOptimalDistance(163, 3, [50]));

