const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// const input =[
//     '5',
//     '3 1 4 3 2'
// ]

const N = +input[0];
const inputArr = input[1].split(' ').map(num => +num);
let personArr = Array.from({length:N},(_,i) => [i+1,inputArr[i]]);

personArr.sort((a,b)=>{
    return a[1] - b[1];
})
//console.log(personArr);
let result = personArr.reduce((acc,cur,index)=>{
   index === 0 ? 
   acc[index] = cur[1] :
   acc[index] = acc[index-1]+cur[1];
                 

    return acc;

},Array(N).fill(0))

console.log(result.reduce((acc,cur)=> acc+=cur , 0));

