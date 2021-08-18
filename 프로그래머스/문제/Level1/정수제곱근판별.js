function solution(n) {
    let answer = Math.sqrt(n) % 1 ===0 ? (Math.sqrt(n)+1)**2 : -1
    return answer;
}