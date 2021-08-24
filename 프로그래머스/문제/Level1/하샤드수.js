function solution(x) {
    let answer =x % x.toString().split('').map(num => +num).reduce((acc,cur)=>acc+=cur,0) === 0?
                true :false                
    return answer;
}