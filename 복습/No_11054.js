const input =['10','1 5 2 1 4 3 4 5 2 1'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const bitonic = input[1].split(' ').map(num =>+num);


const getLongLength = (bitonic) =>{

    return bitonic.reduce((acc,cur,index,array)=>{
        let isSequenceable = [];
        for(let i=0; i<index; i++){
            if(array[i] < cur){
                isSequenceable.push(acc[i]);
            }
        }
        if(isSequenceable.length !==0){
            const max = Math.max(...isSequenceable);
            acc[index] +=max;
        }
        return acc;

    },Array(N).fill(1));
}
const sequence1 = getLongLength(bitonic);
const sequence2 = getLongLength(bitonic.reverse()).reverse();
const answerSequence = sequence1.map((num,index)=> num+sequence2[index]);
console.log(Math.max(...answerSequence) -1 )
