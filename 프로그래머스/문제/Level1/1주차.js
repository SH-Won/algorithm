function solution(price, money, count) {
    let answer;
    let sum=0;
    for(let i=1; i<=count; i++){
        sum+=i*price;
    }
    answer = sum-money;

    return answer <= 0 ? 0 : answer;
}