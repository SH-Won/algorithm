
console.log(solution(45));
function solution(n) {
    let answer = 0;
    let ternary = n.toString(3).split('').reverse().join('');
    answer = parseInt(ternary,3);
     
    return answer;
}