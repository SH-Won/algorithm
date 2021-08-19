
console.log(solution([0,1,2,3,4]))
function solution(numbers){

    let answer = numbers.sort((a,b) => Number(""+b+a) - Number(""+a+b));

    return answer.join('')[0] ==='0' ? '0' : answer.join('');
}
