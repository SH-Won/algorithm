
console.log(solution('1234'))
function solution(s) {
    let answer = 
    s.length === 6 ? s.split('').every(num => !isNaN(Number(num))) : s.length ===4 ? 
    s.split('').every(num => !isNaN(Number(num))) : false
    return answer;
}