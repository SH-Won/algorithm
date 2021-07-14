const input = [0,10, 5, 2, 3, 1, 4, 2, 3, 5, 1, 7];
const max = Math.max(...input);
const min = Math.max(...input);



function countingSort(arr,max){
    let result=[];
    
    let count = Array(max+1).fill(0);
    for(let i=0; i<arr.length; i++){
        count[arr[i]] +=1;
    }
    console.log(count);
    for(let i=0; i<count.length-1; i++){
        count[i+1]+=count[i]
    }
    console.log(count);
    for(let i=0; i<arr.length; i++){
        result[count[arr[i]]-1]= arr[i];
        count[arr[i]] -=1;
    }


    
   return result;
}
console.log(countingSort(input,max).join(' '));