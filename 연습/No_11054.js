const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const input =[
//     '10',
//     '1 5 2 1 4 3 4 5 2 1'
// ]
const N = +input[0];
const arr = input[1].split(' ').map(num => +num);
let dp = Array.from({length:2},()=> Array(N));
dp[0] = bytonic(arr);
dp[1] = bytonic(arr.reverse()).reverse();

let result = sumArray(dp[0],dp[1]);
console.log(Math.max(...result) - 1);
function sumArray(arr1,arr2){
    let array = Array(N);
    for(let i=0; i<N; i++){
        array[i] = arr1[i]+arr2[i]
    }
    return array;
}


function bytonic(arr){
    let result =
    arr.reduce((acc,cur,index,array)=>{
        let temp=[];
        for(let i=0; i<index+1; i++){
            if(array[i] < cur){
                temp.push(acc[i])
            }
        }
        if(temp.length > 0){
            acc[index] += Math.max(...temp);
        }

        return acc;
    },Array(arr.length).fill(1));
    return result;
}