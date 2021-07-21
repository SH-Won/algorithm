const arr = [2,4,1,8,3,7,6,5,10,9];

function quickSort(arr){
    if(arr.length < 2) return arr;

    return sort(arr,0,arr.length-1);
}
function sort(arr,left,right){

    const index = partition(arr,left,right);
    if(left < index-1) sort(arr,left,index-1);
    if(index < right) sort (arr,index,right);

    return arr;
}
function partition(arr,left,right){

    const pivotIndex = Math.floor((left+right)/2);
    

    while(left<=right){
        while(arr[left] < arr[pivotIndex]) left++;
        while(arr[right] > arr[pivotIndex]) right--;

        if(left<=right){
            [arr[left],arr[right]] =[arr[right],arr[left]];
            left++;
            right--;
        }
    }
    return left;

}
console.log(quickSort(arr));