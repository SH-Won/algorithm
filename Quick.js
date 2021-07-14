console.time('quick');
const arr = [10, 5, 2, 3, 1, 4, 2, 3, 5, 1, 7];

function partition(arr,left,right,pivotIndex){
    let temp;
    let pivot = arr[pivotIndex];

    while(left <=right){
        while(arr[left] <pivot) left++;
        while(arr[right] >pivot) right--;

        if(left <= right){
            temp = arr[left];
            arr[left]=arr[right]
            arr[right]=temp;
            left++;
            right--;
        }
    }
    temp=arr[left];
    arr[left]=pivot;
    arr[pivotIndex]=temp;

    return left;

}

function quickSort(arr,left,right){
    
    if(!left) left=0;
    if(!right) right=arr.length-1;
    let pivotIndex = right;

    pivotIndex = partition(arr,left,right-1,pivotIndex);
    // return left; 4라면;
    if(left < pivotIndex-1) quickSort(arr,left,pivotIndex-1);
    if(right > pivotIndex+1) quickSort(arr,pivotIndex+1,right);

    return arr;

}
console.log(quickSort(arr).join('\n'));
console.timeEnd('quick');