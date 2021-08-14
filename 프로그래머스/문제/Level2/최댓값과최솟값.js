

console.log(solution("1 2 3 4"))
function solution(s) {
    let answer = '';
    const array = s.split(' ').map(num => +num);

    answer += (Math.min(...array)+" "+Math.max(...array))


    return answer;
}