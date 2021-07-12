let arr = [2,4,5,7,1,3,6,8];

function bubbleSort(arr){
    let i,j,temp;

    for(i=0; i<arr.length-1; i++){
        for(j=0; j<arr.length-1-i; j++){
            if(arr[j] > arr[j+1]){
                temp = arr[j+1];
                arr[j+1]=arr[j];
                arr[j]=temp;
            }
        }
    }

    return arr;
}
console.log(bubbleSort(arr));