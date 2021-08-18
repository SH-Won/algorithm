console.log(solution(10))

function solution(n) {
    let answer ;
    let primeArray = Array(n).fill(true);
    primeArray[0] = false; // 1은 소수가 아님
    for(let i=2; i<=Math.sqrt(n); i++){

        if(primeArray[i-1]){
            for(let j=i*i; j<=n; j+=i){
                primeArray[j-1] = false;
            }
        }
    }
    answer = primeArray.filter(primeNumber => primeNumber).length;
    return answer;
}