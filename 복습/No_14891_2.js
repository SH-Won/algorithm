// const input = [
//     '10101111',
// '01111101',
// '11001110',
// '00000010',
// '2',
// '3 -1',
// '1 1',
// ]
// const input = [
//     '11111111',
// '11111111',
// '11111111',
// '11111111',
// '3',
// '1 1',
// '2 1',
// '3 1',
// ]
// const input = [
//     '10001011',
// '10000011',
// '01011011',
// '00111101',
// '5',
// '1 1',
// '2 1',
// '3 1',
// '4 1',
// '1 -1'
// ]
// const input = [
//     '10010011',
// '01010011',
// '11100011',
// '01010101',
// '8',
// '1 1',
// '2 1',
// '3 1',
// '4 1',
// '1 -1',
// '2 -1',
// '3 -1',
// '4 -1'
// ]
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getTotalScore = (gear) =>{
     return gear.reduce((acc,cur,index) => acc+= cur[0] === '1' ? Math.pow(2,index) : 0 ,0);    
}
const rotateGear = (gear,number,dir) =>{
    const CLOCKWISE = 1;
    let willRotate = [[number,dir]];
    for(let i=number; i>0; i--){
        if(gear[i][6] === gear[i-1][2]) break;
        (number - (i-1)) % 2 === 0 ? willRotate.push([i-1,dir]) : willRotate.push([i-1,dir === 1 ? -1 : 1])
    }
    for(let i=number; i<3; i++){
        if(gear[i][2] === gear[i+1][6]) break;
        ((i+1) - number) % 2 === 0 ? willRotate.push([i+1,dir]) : willRotate.push([i+1,dir === 1 ? -1 : 1])
    }
    for(let i=0; i<willRotate.length; i++){
        const [number,dir] = willRotate[i];
        if(dir === CLOCKWISE){
           gear[number].unshift(gear[number].pop());
        }
        else{
           gear[number].push(gear[number].shift());
        }
    }
}
const solution = (input) =>{
    // N극 0 S극 1 , 시계 1 반시계 -1
    let gear = Array.from({length:4},(_,i) => input[i].split(''));
    const K = +input[4];
    const command = Array.from({length:K},(_,i)=>input[i+5].split(' ').map(Number));
    let i = 0;
    while(i < K){
        const [number,dir] = command[i++];
        rotateGear(gear,number-1,dir);
    }
    const answer = getTotalScore(gear);
    console.log(answer);
}
solution(input);