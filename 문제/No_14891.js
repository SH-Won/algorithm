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
let index = 0;
const gear =Array.from({length:5},(_,i)=>{ 
     if(i===0) return null
     return input[index++].split('') });
const K = input[index++];
const manipulation = Array.from({length:K},()=>input[index++].split(' ').map(num => +num));

solution(gear);
//1 은 시계방향 -1은 반시계방향
//N극은 0 S극은 1
function solution(gear){

    const rotateGear = (gearDirection) =>{
        for(let i=1; i<gearDirection.length; i++){
            const direction = gearDirection[i];
            if(direction === 0) continue;
            else if(direction === 1) gear[i].unshift(gear[i].pop());
            else gear[i].push(gear[i].shift());
        }
       
    }

    for(let i=0; i<K; i++){
        let gearDirection = Array(5).fill(0);
        const [gearNumber,direction] = manipulation[i];
        gearDirection[gearNumber] = direction;
        for(let j=gearNumber; j<=3; j++){
            if(gearDirection[j] === 0 ) gearDirection[j+1] = 0;
            else if(gear[j][2] === gear[j+1][6]){
               gearDirection[j+1] = 0
           }
           else{
               gearDirection[j+1] = gearDirection[j] ===1 ? -1 : 1 
           } 
        }
        
        for(let k=gearNumber; k>=2; k--){
            if(gearDirection[k] === 0 ) gearDirection[k-1] = 0;
            else if(gear[k][6] === gear[k-1][2]){
                gearDirection[k-1] = 0
            }
            else{
                gearDirection[k-1] = gearDirection[k] === 1 ? -1 : 1
            }
        }
        rotateGear(gearDirection);
    }
    const score = [gear[1][0],gear[2][0],gear[3][0],gear[4][0]].reduce((acc,cur,index)=>{
        //N 극이 0;
        if(cur ==='0') return acc+=0;
        else return acc+=Math.pow(2,index);
    },0);
    return console.log(score); 
}