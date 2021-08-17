

console.log(solution(5,24));
function solution(a, b) {
    let answer = '';
    let day = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    const date = new Date(`2016,${a},${b}`);
    answer = day[date.getDay()];
    return answer;
}