/**
* The main algorithm is that we should factorize each number from expression  on multipliers.
* Then should count (separately) how many times each multiplier
* can be divided on 2 and 5 without remnant for each multiplier
*  After that, should summarize counts (separately) and return min from that two sums.
 */

/**
 * Variant one:
 * By using recursion functions 
 */
module.exports = function zeroes(expression) {
  let { fives, twos } = expression.split('*').map(exp =>
    /!!/.test(exp) ? factorial({ current: (+exp.replace(/!/g, '') % 2 === 0 ? 2 : 1), end: +exp.replace(/!/g, ''), step: 2 })
      : /!/.test(exp) ? factorial({ end: +exp.replace(/!/g, '') })
        : "The problem with expression"
  )
    .reduce((accum, { fives, twos }) => {
      accum.fives += fives;
      accum.twos += twos;
      return accum;
    });
  return Math.min(fives, twos);
}

const factorial = ({ current = 1, end = 1, step = 1, fives = 0, twos = 0 }) => {
  return current > end ? { fives, twos } : factorial({ current: current + step, end, step, fives: counter(current, 5, fives), twos: counter(current, 2, twos) })
}

const counter = (number, digit, count) => {
  return number % digit === 0 ? counter(number / digit, digit, ++count) : count;
}

/**
* Variant two:
* By using conditionals and loops for and while.
*/
module.exports = function zeroes(expression) {
  let { fives, twos } = expression.split('*').map(exp =>
    /!!/.test(exp) ? factorial(+exp.replace(/!/g, ''), 2)
      : /!/.test(exp) ? factorial(+exp.replace(/!/g, ''), 1)
        : "The problem with expression"
  )
    .reduce((accum, { fives, twos }) => {
      accum.fives += fives;
      accum.twos += twos;
      return accum;
    });
  return Math.min(fives, twos);
}
const factorial = (expression, step) => {
  const start = step === 1 ? 1 : expression % 2 === 0 ? 2 : 1;
  let fives = 0;
  let twos = 0;
  for (let current = start; current <= expression; current += step) {
    fives += counter(current, 5);
    twos += counter(current, 2);
  }
  return { fives, twos };
}
const counter = (number, digit) => {
  let count = 0;
  while (number % digit === 0) {
    count++;
    number /= digit;
  }
  return count;
}
