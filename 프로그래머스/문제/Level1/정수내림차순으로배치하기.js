function solution(n) {
    let answer = n.toString().split('').map(num => +num).sort((a,b)=>b-a).join('')
    return parseInt(answer)
}

console.log(Math.sqrt(121) % 1);