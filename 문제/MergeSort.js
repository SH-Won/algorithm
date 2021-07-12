let arr = [2,4,5,7,1,3,6,8];

function mergeSort(arr){
    
    const length = arr.length;
    if(length < 2) return arr;
    const pivot = Math.floor(length/2);
    
    const left = arr.slice(0,pivot);
    const right = arr.slice(pivot,length);

    return merge(mergeSort(left),mergeSort(right));
}

function merge(left,right){
    let result = [];
    while(left.length && right.length){
        if(left[0] <= right[0]){
            result.push(left.shift())
        }
        else{
            result.push(right.shift())
        }
    }
    while(left.length) result.push(left.shift())
    while(right.length) result.push(right.shift())

    return result;
}

console.log(mergeSort(arr));