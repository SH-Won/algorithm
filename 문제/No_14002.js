const input = ['6','10 20 10 30 20 50']
// const input = ['6','10 5 30 3 50 20']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// const binarySearch = (number,result) =>{
//     let left = 0;
//     let right = result.length - 1;
//     while(left < right){
//         const mid = Math.floor((left+right) / 2);
//         if(number < result[mid]) right = mid;
//         else if(number > result[mid]) left = mid + 1;
//         else return mid;
//     }
//     return right;
// }
// const solution = input => {
//     const N = +input[0];
//     const A = input[1].split(' ').map(Number);
//     const result = [A[0]];
//     for(let i=1; i<A.length; i++){
//         if(A[i] > result[result.length-1] ){
//             result.push(A[i]);
//         }
//         else{
//             const idx = binarySearch(A[i],result);
//             result[idx] = A[i];
//         }
//         console.log(result);
//     }
//     console.log(result);
// }
// solution(input);
const solution = input =>{
    const N = +input[0];
    const A = input[1].split(' ').map(Number);
    const answer = A.reduce((acc,cur,idx,origin) =>{
        let maxIndex = -1;
        for(let i=idx-1; i>=0; i--){
            if(origin[i] < cur && acc.max[i] >= acc.max[idx]){
               maxIndex = i;
               acc.max[idx] = 1 + acc.max[i];
            } 
        }
        acc.sequence[idx] = maxIndex === -1 ? [cur] : acc.sequence[maxIndex].concat(cur);
        if(acc.max[idx] > acc.length){
            acc.length = acc.max[idx];
            acc.arr = acc.sequence[idx];
        }
        return acc; 
    },{max:Array(N).fill(1),sequence:Array(N),length:0 ,arr:null});
    console.log(answer.length +'\n' + answer.arr.join(' '));
}
solution(input);