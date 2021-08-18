console.log(Number('1234'))
function solution(n) {
    let word = "수박".repeat(Math.ceil(n/2));
    let answer = n % 2 ===0 ? word : word.substring(0,word.length-1);
    return answer;
}