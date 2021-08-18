function solution(x, n) {
    let answer = Array.from({length:n},(_,i) => x * (i+1))
    return answer;
}