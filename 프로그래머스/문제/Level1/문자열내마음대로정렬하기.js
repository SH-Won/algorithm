

function solution(strings, n) {
    let answer = strings.sort((a,b)=>a[n].localeCompare(b[n]));
    return answer;
}