// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim();

//console.log(input.charCodeAt())

// 셀프넘버

// const N = 10000;
// let array = Array(10000).fill().map((v,i)=>v=i+1);

// const d = (number)=>{
//     let sum = number.toString().split('').reduce((acc,cur)=>acc+= +cur,0);

//     return sum+number;
// }

// for(let i=0; i<N; i++){
//     const index = array.indexOf(d(i));
//     if(index !== -1) array[index] = false;
// }
// for(let i=0; i<array.length; i++){
//     if(array[i]) console.log(array[i])
// }

//
// let answer = 
// Array.prototype.some.call([1,2,2,4,5],(number,index,array)=>{
//     if(index === array.length-1) return;

//     return array[index] - array[index+1] !== array[0] - array[1]
// })
// // 하나라도 같지 않으면 true  다 같으면 false;
// console.log(answer);


// // 한 수
// const fs = require('fs');
// const N = +fs.readFileSync('/dev/stdin').toString().trim();

// let count = 0;
// for(let i=1; i<=N; i++){
//     if( i >= 100){
//         const numbers = i.toString().split('').map(num => +num);
//         const isNotDiff = numbers.some((number,index)=>{
//             if(index === numbers.length-1) return;
//             return numbers[index] - numbers[index+1] !== numbers[0] -numbers[1]
//         })
//         if(!isNotDiff) count++;        
//     }
//     else{
//          count++;
//     }

// }
// console.log(count);

let arr=[1,2,3,4,5];
let copy = [...arr];
const mod = (copy) =>{
    const copyArr=[...copy];
    copy[2] =2;
    console.log(copyArr);

   return copyArr;
}
const copyArr = mod(copy);
console.log(copyArr);

