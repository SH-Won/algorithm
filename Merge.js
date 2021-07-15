//let arr = [2,4,5,7,1,3,6,8];

const fs = require('fs');
const [N,...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(num => parseInt(num,10));



function mergeSort(arr){
    if(arr.length < 2) return arr;
    const length = arr.length;
    const pivot = Math.floor(length/2);
    const left = arr.slice(0,pivot);
    const right = arr.slice(pivot,length);

    return merge(mergeSort(left),mergeSort(right))

}

function merge(left,right){
    let result = [];
    let i=0;
    let j=0;
    //[1] [2]

   // while(left.length && right.length){
    
      while(left.length-1 >= i && right.length-1 >=j){
        if(left[i] <= right[j]){
            result.push(left[i]);
            i++;
        }
        else if(left[i] >= right[j]){
            result.push(right[j]);
            j++;
        }
      
    
        

    }
    while(left.length-1 >= i) {
        result.push(left[i]);
        i++;
    }
    while(right.length-1 >=j) {
        result.push(right[j]);
        j++;
    }

    

    return result
 
}

console.log(mergeSort(arr).join('\n'));