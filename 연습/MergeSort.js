const arr = [2,4,1,8,3,7,6,5,10,9];

function mergeSort(arr){
    
    if(arr.length < 2) return arr;

    const pivot = Math.floor((arr.length)/2);
    const left = arr.slice(0,pivot);
    const right = arr.slice(pivot);

    return merge(mergeSort(left),mergeSort(right))
    
}
function merge(left,right){
    let result =[];

    while(left.length && right.length){
        if(left[0] < right[0]) result.push(left.shift());
        if(left[0] > right[0]) result.push(right.shift());
    }
    while(left.length){
        result.push(left.shift());
    }
    while(right.length){
        result.push(right.shift());
    }
    return result;

}
console.log(mergeSort(arr)[4]);