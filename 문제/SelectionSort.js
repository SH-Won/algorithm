let arr = [2,4,5,7,1,3,6,8];

function selectionSort(arr){
    let i,j,temp,minIndex;

    for(i=0; i<arr.length-1; i++){
        minIndex=i;
        for(j=i+1; j<arr.length; j++){
            if(arr[j] <= arr[minIndex]){
                minIndex =j;
            }
        }
        temp=arr[minIndex];
        arr[minIndex]=arr[i]
        arr[i]=temp;

    }
    return arr;
}

console.log(selectionSort(arr));