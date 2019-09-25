module.exports = function zeros(expression) {
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