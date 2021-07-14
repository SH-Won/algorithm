const fs = require('fs');
const [N,...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(num => parseInt(num));
//let arr = [1,3,8,-2,2];
// 합병정렬 
const result = mergeSort(arr); //
const average = averageResult(result);
const middleNumber = result[Math.floor(arr.length/2)];
const maxHit = maxHitNumber(result);
const range = Math.max(...result) - Math.min(...result);
const answer = [average,middleNumber,maxHit,range];

function averageResult(arr){
    return Math.round(arr.reduce((acc,pre)=> acc+=pre,0) / arr.length)
}
function maxHitNumber(arr){
    let numMap ={};
    let maxHitArr = [];
    let maxHit;
    for(let i=0; i<arr.length; i++){
        if(numMap[arr[i]]){
            numMap[arr[i]] +=1;
        }
        else{
            numMap[arr[i]] = 1;
        }
    }
    maxHit=Math.max(...Object.values(numMap));
    for(let num in numMap){
        if(numMap[num] === maxHit){
            maxHitArr.push(Number(num));
        }
    }
    maxHitArr = mergeSort(maxHitArr);
    
    return maxHitArr.length > 1 ? maxHitArr[1] : maxHitArr[0];
}

function mergeSort(arr){
    if(arr.length < 2) return arr;
     const length = arr.length;
     const pivot = Math.floor(length / 2);
     const left = arr.slice(0,pivot);
     const right = arr.slice(pivot);

     return merge(mergeSort(left),mergeSort(right))
}
function merge(left,right){
    let result=[];
    let i=0;
    let j=0;
       
    while(left.length-1 >=i && right.length-1 >=j){
        if(left[i] <= right[j]){
            result.push(left[i]);
            i++;
        }
        else if(left[i] > right[j]){
            result.push(right[j]);
            j++;
        }
        console.log(i,j);
        
    }
    
    while(left.length-1 >=i){
        result.push(left[i]);
        i++;
    }
    while(right.length-1 >=j){
        result.push(right[j]);
        j++;
    }
    

    return result;
}

console.log(answer.join('\n'));
