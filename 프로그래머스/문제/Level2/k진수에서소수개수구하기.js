const isPrime = (number) =>{
    if(number < 2) return false;
    if(number === 2 ) return true;
    for(let i=2; i<=Math.sqrt(number); i++){
        if(number % i === 0) return false;
    }
    return true;
}
const solution = (n,k)=>{
    let answer = 0;
    const numbers = n.toString(k).split('0');
    for(let i=0; i<numbers.length; i++){
        if(numbers[i] === '') continue;
        if(isPrime(parseInt(numbers[i]))) answer++;
    }
    return answer;
}
console.log(solution(437674,3))