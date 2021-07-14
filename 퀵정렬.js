const arr = [10, 5, 2, 3, 1, 4, 2, 3, 5, 1, 7];

function quickSort(arr){
    if(arr.length < 2) return arr;

    console.log(arr);

    return sort(arr,0,arr.length-1);

}

function sort(arr,l,r){
    
    let left = l;
    let right = r;
    let pivot = arr[Math.floor( (l+r) / 2 )];

    while(left <= right){
        while(arr[left] < pivot) left++;
        while(arr[right] > pivot) right--;

        if(left <= right){
            swap(arr,left,right);
            left++;
            right--;
        }

    }
    // [ 1,2,3,4,5,6,7,8 ]
    // left 6 right 4
    if(l < right) sort(arr,l,right);
    if(r > left) sort(arr,left,r);

    return arr;

}

function swap(arr,left,right){
   return [arr[left],arr[right]] = [arr[right],arr[left]];

}
console.log(quickSort(arr));



function quickSort(arr){
    return sort(arr,0,arr.length-1);
}
function sort(arr,left,right){
    if(arr.length > 1 ){
        const index = partition(arr,left,right);
        if(left < index-1) sort(arr,left,index-1);
        if(index < right) sort(arr,index,right);
    }
    return arr;
}
function partition(arr,left,right){
    const pivot = arr[Math.floor((right+left) / 2)];
    while(left <= right){
        while(arr[left] <pivot) left++;
        while(arr[right] >pivot ) right --;

        if(left <=right){
            swap(arr,left,right);
            left++;
            right--;
        }
    }
    return left;
}