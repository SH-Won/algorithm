function solution(n) {
    let answer = n.toString().split('').map(num => +num).reverse();
    return answer;
}