// const input = ['6','10 20 10 30 20 50']
const input = ['7','10 20 30 1 2 3 4']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const binarySearch = (number,arr) =>{
    let left = 0;
    let right = arr.length -1;
    while(left < right){
        const mid = Math.floor((left+right) / 2);
        if(number > arr[mid]) left = mid+1;
        else if (number < arr[mid]) right = mid;
        else return mid;
    }
    return right;
}
const solution = input =>{
    const N = +input[0];
    const A = input[1].split(' ').map(Number);
    const lenArr = Array(N).fill(1)
    let len = 1;
    const arr = [A[0]];
    for(let i=1; i<A.length; i++){
        if(A[i] > arr[arr.length-1]){
            arr.push(A[i]);
            lenArr[i] = ++len;
        }
        else{
            const idx = binarySearch(A[i],arr);
            arr[idx] = A[i];
            lenArr[i] = idx + 1;
        }
    }
    let sequence = [];
    for(let i=N-1; i>=0; i--){
        if(lenArr[i] === len){
            sequence.push(A[i]);
            len--;
        }
        if(len === 0) break;
    }
    console.log(sequence.length + '\n' + sequence.reverse().join(' '));
}
solution(input);


