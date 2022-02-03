// const input = ['5','4 1 5 2 3','5','1 3 7 9 5']
const input = ['5','1 2 3 4 5','5','5 5 5 5 5']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const binarySearch = (number,N,A) =>{
    let left = 0;
    let right = N;
    while(left < right-1 ){
        const mid = Math.floor((left+right) / 2);
        if(A[mid] === number) return 1;
        else if(A[mid] > number) right = mid;
        else left = mid;
    }
    return A[left] === number ? 1 : 0;
}
const solution = input =>{
    const N = +input[0];
    const A = input[1].split(' ').map(Number).sort((a,b) => a-b);
    const M = +input[2];
    const numbers = input[3].split(' ').map(Number);
    let answer = '';
    for(let i=0; i<numbers.length; i++){
        const number = numbers[i];
        answer += `${binarySearch(number,N,A)}\n`;
    }
    console.log(answer.trim());
}
solution(input);