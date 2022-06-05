const solution = (begin,end) =>{
    
    const getBlock = (number) => { 
        for(let i=2; i<=Math.sqrt(number); i++){
            if( number % i === 0 && i <= 10000000) return number / i; 
        }
        return 1;
    }
    const answer = [];
    for(let i=begin; i<=end; i++){
        if(i === 1) answer.push(0);
        else answer.push(getBlock(i));
    }
    return answer;
}
console.log(solution(1,10))