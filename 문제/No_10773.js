const fs = require('fs');
const [N,...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(num =>+num);

let i =0;
let stack = [];

while(i < N){
    if(arr[i] !==0 ){
        stack.push(arr[i])
    }
    else{
        stack.pop();
    }
    i++;
}
console.log(stack.reduce((acc,cur)=>acc+=cur,0));