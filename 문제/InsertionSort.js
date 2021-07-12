
let arr = [8,2,3,1,5,7];

function InsertionSort(arr){

    let i=1,j,temp;
    for(i; i<arr.length; i++){
        temp = arr[i];
        for(j=i-1; j>=0 && arr[j]>temp; j--){
            arr[j+1] = arr[j];


        }
        arr[j+1] =temp;
    }


    return arr;
}
console.log(InsertionSort(arr));