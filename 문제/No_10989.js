// const fs = require('fs');
// const [N,...arr] = fs.readFileSync('/dev/stdin').toString.trim().split('\n');
const arr = [4,2,1,10,9,2,3,5,2];
const max = Math.max(...arr);
function countingSort(arr,max){
    //[2,1,7,3,5]
    let count =Array(max+1).fill(0);
    let result=[];
    for(let i=0; i<arr.length; i++){
        count[arr[i]] +=1;
    }
    for(let i=0; i<max; i++){
        count[i+1] += count[i];
    }
    for(let i=0; i<arr.length; i++){
        result[count[arr[i]] - 1] =arr[i];
        count[arr[i]] -=1;
    }
    return result;
}
console.log(countingSort(arr,max).join('\n'));