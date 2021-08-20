console.log(solution(15))

function solution(n){
    let answer = 0;

    for(let i=1; i<=Math.floor(n/2); i++){
        let j = i;
        let sum = 0;
        while(sum < n){
            sum+=j;
            j++;
        }
        if(sum === n) answer++;
    }
    return answer+1;
}

function expressionNumber(n){
    let answer = 0;

    const continuous = (curNumber,sum) =>{
        if(sum === n) return true;
        if(sum > n) return false;

        return continuous(curNumber+1,sum+curNumber);
    }
    for(let i=1; i<Math.floor(n/2); i++){
        if(continuous(i,0)) answer++;
    }
    return answer++;
}