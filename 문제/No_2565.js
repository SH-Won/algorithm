const fs = require('fs');
const [T,...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// const [T,...input]=[
//     '8',
//     '1 8',
//     '3 9',
//     '2 2',
//     '4 1',
//     '6 4',
//     '10 10',
//     '9 7',
//     '7 6'

// ]
const N = +T;
const arr = input.reduce((acc,cur,index)=>{
    acc[index]=(cur.split(' ').map(num=>+num));
    return acc;

},Array(N)).sort((a,b) => a[0] - b[0]);


const dp = arr.reduce((acc,cur,index,array)=>{
    let temp=[];
    for(let i=0; i<index+1; i++){
        if(array[i][1] < cur[1]) temp.push(acc[i]); 
    }
    if(temp.length > 0){
        acc[index]+=Math.max(...temp);
    }
    return acc;

},Array(N).fill(1))

console.log(N-Math.max(...dp))


