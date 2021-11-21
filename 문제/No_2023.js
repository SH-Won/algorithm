const N = 4;
//const fs = require('fs');
//const N = fs.readFileSync('/dev/stdin').toString().trim();
const isPrime = (number) =>{
    if(number === 1) return false;
    for(let i=2; i<=Math.sqrt(number); i++){
        if(number % i === 0) return false;
    }
    return true;
}

const solution = (N) =>{
    const length = +N;
    let answer = "";
    const findPrimeNumber = (str,count) =>{
        if(count === length){
            answer+=`${str}\n`;
            return;
        }
        for(let i=1; i<=9; i++){
            const nextStr = str+i;
            if(isPrime(parseInt(nextStr))) findPrimeNumber(nextStr,count+1);
        }
    }
    findPrimeNumber("",0);
    console.log(answer.trim());
}
solution(N);