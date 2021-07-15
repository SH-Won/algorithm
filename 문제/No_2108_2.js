const fs = require('fs');
const [N,...arr] = fs.readFileSync('/dev/stdin').toString().split('\n').map(num => parseInt(num));
// let arr = [-4000,-3998,-3,1,4,2,5,-2,7];
const sortArr = countingSort(arr);
const average = averageResult(sortArr);
const middleNumber = sortArr[Math.floor( sortArr.length / 2 )];
const maxHitNumber =maxHitNumberResult(sortArr);
const range = sortArr[sortArr.length -1] - sortArr[0];
// countingSort 계수정렬
// 범위가 -4000 ~ 4000 
function averageResult(arr){
    return Math.round(arr.reduce((acc,pre)=> acc+=pre,0) / arr.length);
}
function maxHitNumberResult(arr){
    let numMap = new Map();
    let result =[];
    let maxHit = 0;
    for(let i=0; i<arr.length; i++){
        if(!numMap.has(arr[i])){
            numMap.set(arr[i],1);
        }
        else{
            numMap.set(arr[i], numMap.get(arr[i]) +1)
        }
    }
    numMap.forEach((value,key)=>{
        if(maxHit < value){
            maxHit = value;
            result = [];
            result.push(key);
        }
        else if(maxHit === value){
            result.push(key);
        }
    })
    return result.length !==1 ? result[1] : result[0]

}


function countingSort(arr){
    let count = Array(8001).fill(0); // [0,0,0,0,0,0,0 ...];
    
    let result =[];

    for(let i=0; i<arr.length; i++){
        let index = arr[i] + 4000;
        
        count[index]+=1;
    }
    for(let i=0; i<count.length-1; i++){
        count[i+1] +=count[i]
    }
   
    // [-4000,-3000,0,1,2,-4000];
    for(let i=0; i<arr.length; i++){
        let index = count[arr[i]+4000]
        result[index-1] = arr[i];
        count[arr[i]+4000] -= 1;
    }
    return result;
}
console.log([average,middleNumber,maxHitNumber,range].join('\n'));