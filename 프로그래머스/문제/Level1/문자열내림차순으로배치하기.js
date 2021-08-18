
console.log(solution("Zbcdefg"))
console.log('g'.charCodeAt());

function solution(s) {
    let answer = s.split('').sort((a,b)=> b.charCodeAt() - a.charCodeAt())

    return answer.join('');
}