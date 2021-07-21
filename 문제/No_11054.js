// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input =[
    '10',
    '1 5 2 1 4 3 4 5 2 1'
]

const N = +input[0];
const arr = input[1].split(' ').map(num => +num);

const dp =Array(2);
dp[0] = binary(arr);
dp[1] = binary(arr.reverse()).reverse();
function binary(arr){
    let binaryArray = arr.reduce((acc,cur,index,array)=>{
        let temp=[];
        for(let i=0; i<index+1; i++){
            if(array[i] < cur){
                temp.push(acc[i]);
            }
        }
        if(temp.length > 0){
            acc[index]+=Math.max(...temp);
        }
        return acc;
    },Array(N).fill(1));

    return binaryArray
}
let result =[];
for(let i=0; i<N; i++){
    result.push(dp[1][i]+dp[0][i]);
}
console.log(dp);
console.log(Math.max(...result) -1 );

// dp = Array(N) [0,0], [1,1],[2,1] 이런식으로 다시 짜보기
