const input = ['2','3 4','3 5']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = input =>{
    let T = +input[0];
    let max = 0;
    const couple = Array.from({length:T},(_,i)=>{
        const [A,B] = input[i+1].split(' ').map(Number);
        const sum = A + B;
        if(sum > max) max = sum;
        return sum;
    })
    const prime = Array(max+1).fill(true);
    prime.fill(false,0,2);
    for(let i=2; i<=Math.sqrt(max); i++){
        if(prime[i]){
            for(let j=i*i; j<=max; j+=i){
                prime[j] = false;
            }
        }
    }
    let answer = [];
    let idx = 0;
    const check = (number) =>{
        if(number < 4) return 'NO';
        if(number % 2 === 0) return 'YES';
        else{
            if(prime[number-2]) return 'YES';
            for(let i=2; i<prime.length; i++){
                if(prime[i] && (number-2) % i === 0) return 'NO'; 
            }
            return 'YES';
        }
    }
    while(T--){
        const number = couple[idx++];
        answer.push(check(number));
    }
    console.log(answer.join('\n'));
}
solution(input);

