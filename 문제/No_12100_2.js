const stdin = require("fs").readFileSync("/dev/stdin").toString(),
  [n, ...blocks] = stdin.split("\n").filter((a) => a),
  Board = blocks.map((a) =>
    a
      .trim()
      .split(" ")
      .map((a) => +a)
  ),
  pullLine = (a) => {
    const b = [...a.filter((a) => 0 < a)];
    for (let c = 0; c < n - 1; c++)
      b[c] && b[c] === b[c + 1] && (([b[c], b[c + 1]] = [2 * b[c], 0]), c++);
    const c = b.filter((a) => 0 < a);
    return c.concat(Array(n - c.length).fill(0));
  },
  transpose = (a) => a[0].map((b, c) => a.map((a) => a[c])),
  left = (a) => a.map((a) => pullLine(a)),
  right = (a) => a.map((a) => pullLine(a.reverse()).reverse()),
  up = (a) => transpose(left(transpose(a))),
  down = (a) => transpose(right(transpose(a))),
  max = (a) => Math.max(...a),
  MaxOf = (a) => max(a.map((a) => max(a)));
let scores = [];
const brute = (a, b) =>
  5 === b
    ? scores.push(MaxOf(a))
    : void (brute(left(a), b + 1),
      brute(right(a), b + 1),
      brute(up(a), b + 1),
      brute(down(a), b + 1));
brute(Board, 0), console.log(max(scores));
