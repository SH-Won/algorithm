function solution(n) {
    let answer = n+1;

    for(let i=2; i<=Math.floor(n/2); i++){
        if(n % i ===0) answer+=i;
    }

    
    return answer;
}