const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// const input =[
//     '11',
//     '1 4','3 5','0 6','5 7','3 8','5 9',
//     '6 10','8 11','8 12','2 13','12 14'
// ]
const N = +input[0];
let arr = Array.from({length:N},(_,i) => input[i+1].split(' ').map(num => +num));

arr.sort((a,b)=>{
    if(a[1]=== b[1]){
        return a[0]-b[0]
    }
    else{
        a[1] - b[1];
    }
});
//console.log(arr);
let count =1;
let temp = arr[0][1];

for(let i=1; i<N; i++){
    if(arr[i][0] >= temp){
        temp =arr[i][1];
        count ++;
    }
    
}
console.log(count);
// 끝나는 시간이 중요하다