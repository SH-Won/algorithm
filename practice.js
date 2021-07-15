const fs = require('fs');
const [N,...arr] = fs.readFileSync('/dev/stdin').toString().split('\n').trim().map(num => parseInt(num));
const result = quickStart(arr).join('\n');

function quickStart(arr){
    if(arr.length < 2 ) {
      return arr;
    }

    
    return quickSort(arr,0,arr.length-1);
}
function quickSort(array,l,r){
   const pivot = array[Math.floor((l + r) / 2)];
  
    
    let left = l;
    let right = r;
    

    while(left<=right){
        while(array[left] < pivot) left++;
        while(array[right] > pivot) right--;
    
        if(left <=right){
            const temp = array[left];
            array[left]=array[right];
            array[right]=temp;
            left++;
            right--;

        }

    }
    if(l<right) quickSort(array,l,right)
    if(r > left) quickSort(array,left,r)
    
    return array;
}
console.log(result);




// console.time('quick');
// const input = [10, 5, 2, 3, 1, 4, 2, 3, 5, 1, 7];
// const N = input.shift();

// const result = quickSortStarter(input).join('\n');

// function quickSortStarter(arr) {
//   if (!arr.length) {
//     return arr;
//   }
//   return quickSort(arr, 0, arr.length - 1);
// }

// function quickSort(array, l, r) {
//   const pivot = array[Math.floor((l + r) / 2)];
//   let left = l;
//   let right = r;

//   while (left <= right) {
//     while (array[left] < pivot) left++;
//     while (array[right] > pivot) right--;

//     if (left <= right) {
//       const temp = array[left];
//       array[left] = array[right];
//       array[right] = temp;
//       left++;
//       right--;
//     }
//   }

//   if (l < right) quickSort(array, l, right);
//   if (r > left) quickSort(array, left, r);

//   return array;
// }

// console.log(result);
// console.timeEnd('quick');

const M=2;
const N=4;
let result ='';
let output= [];

function dfs(cnt){
    if(cnt ===M) {
        result +=`${output.join(' ')}\n`;
        return;
    }
    for(let i =0; i<N; i++){
        if(visited[i] === true) continue;
        visited[i]=true;
        output.push(i+1);
        dfs(cnt+1);
        output.pop();
        visitied[i]=false;  
    }
}
