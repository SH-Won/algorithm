const fs = require('fs');
const [N,...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(num=>parseInt(num));


function partition(arr,left,right,pivotIndex){
      let temp;
      let pivot = arr[pivotIndex];
      while(left <= right){
        while(arr[left] < pivot) left++;
        while(arr[right] > pivot) right--;

        if(left<=right){
          temp = arr[left];
          arr[left]=arr[right];
          arr[right]=temp;
          left++;
          right--;
        }
      }
      temp =arr[left];
      arr[left] = arr[pivotIndex];
      arr[pivotIndex] =temp;

      return left;
 
  
}

function quickSort(arr,left,right){
      if(!left) left=0;
      if(!right) right=arr.length-1;
      let pivotIndex = right;

      pivotIndex = partition(arr,left,right-1,pivotIndex);

      if(left < pivotIndex-1) quickSort(arr,left,pivotIndex-1);
      if(right > pivotIndex+1) quickSort(arr,pivotIndex+1,right);

      return arr;

}
console.log(quickSort(arr).join('\n'));




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