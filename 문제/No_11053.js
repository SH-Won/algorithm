// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const N = +input[0];
// const arr= input[1].split(' ').map(num=> +num);


const [N,...arr]=[6,10,20,10,30,20,50];

const dp = arr.reduce((acc,cur,index,array)=>{
    let temp =[];
    for(let i=0; i<index+1; i++){
        if(array[i] < cur){
            temp.push(acc[i])
        }
    }
    if(temp.length > 0 ){
        acc[index]+=Math.max(...temp);
    }
    return acc;
},Array(arr.length).fill(1))

console.log(dp);
console.log(Math.max(...dp));