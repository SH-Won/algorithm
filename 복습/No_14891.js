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
const input = [
    '10010011',
'01010011',
'11100011',
'01010101',
'8',
'1 1',
'2 1',
'3 1',
'4 1',
'1 -1',
'2 -1',
'3 -1',
'4 -1'
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = () =>{
    let index = 0;
    let gear = Array.from({length:4},()=>input[index++].split('').map(Number));
    const K = +input[index++];
    const command = Array.from({length:K},()=>input[index++].split(' ').map(Number));
    // N극은 0 S극은 1 시계방향은 1 반시계방향은 -1;
    const rotateGear = (command) =>{
        const [number,direction] = command;
        return direction === 1 ? 
               gear[number].unshift(gear[number].pop()) :
               gear[number].push(gear[number].shift());
    }
    for(let i=0; i<K; i++){
        const [number,direction] = command[i];
        let rotate = [];
        let current = {number:number-1,direction};
        rotate.push([current.number,current.direction]);
        for(let next=number; next<4; next++){
           
            if(gear[current.number][2] !== gear[next][6]){
               const nextDirection = current.direction ===1 ? -1 : 1;
               current.number = next;
               current.direction = nextDirection;
               rotate.push([next,nextDirection])
            }
            else break;
         
        }
        current = {number:number-1,direction};

        for(let prev=number-2; prev>=0; prev--){
            
                if(gear[current.number][6] !== gear[prev][2]){
                    const nextDirection = current.direction === 1 ? -1 : 1;
                    current.number = prev;
                    current.direction= nextDirection;
                    rotate.push([prev,nextDirection]);
                }
                else break;
            
        }
        for(let i=0; i<rotate.length; i++){
            rotateGear(rotate[i]);
        }
    }

    const score = gear.map(array => array[0]).reduce((acc,cur,index)=>{
         if(cur) return acc+=Math.pow(2,index);
         return acc;
    },0)
    console.log(score);
}
solution();