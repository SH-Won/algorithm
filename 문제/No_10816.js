const input = ['10','6 3 2 10 10 10 -10 -10 7 3','8','10 9 -5 2 3 4 5 -10']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getUpperIndex = (cardNumber,sanguen) =>{
    let left = 0;
    let right = sanguen.length;
    while(left < right){
        const mid = Math.floor((left+right) / 2);
        if(sanguen[mid] > cardNumber) right = mid;
        else left = mid+1;
    }
    return left;
}
const getLowerIndex = (cardNumber,sanguen) =>{
    let left = 0;
    let right = sanguen.length;
    while(left < right){
        const mid = Math.floor((left+right) / 2);
        if(sanguen[mid] >= cardNumber) right = mid;
        else left = mid+1;
    }
    return left;
}
const solution = input =>{
    const N = +input[0];
    const sanguen = input[1].split(' ').map(Number).sort((a,b) => a-b);
    const M = +input[2];
    const cardNumbers = input[3].split(' ').map(Number);
    let answer = '';
    cardNumbers.forEach(number => answer+=`${getUpperIndex(number,sanguen)-getLowerIndex(number,sanguen)} `);
    console.log(answer.trim());
}
solution(input);