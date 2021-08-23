// 4 3 6 8 7 5 2 1 을 만들어야함 
// 1 2 3 4             4  
// 1 2 3          4    4
// 1 2 3          4    3
// 1 2            4 3  3
// 1 2 5 6        4 3  6 
// 1 2 5          4 3 6  6
// 1 2 5 7 8      4 3 6  8
// 1 2 5 7        4 3 6 8 8
// 1 2 5 7       

// 1                   1
//               1     1
// 2             1     2
//               1 2   2
// 3 4 5         1 2   5
// 3 4           1 2 5  5
// 
const fs = require('fs');
const [N,...input] =fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(num => +num);
// let numbers = Array(8).fill(0).map((num,index) => num+index+1 );
// let input = [1,2,5,3,4]

let i = 0;
let j = 1;
let str = ''
let stack = [];
while(i < N){

    while(j <= input[i]){
        
        stack.push(j);
        str+='+\n'
        j++;
        
    }
    
    if(stack[stack.length-1] === input[i]){
        stack.pop();
        str+='-\n'
        
    }
    i++;
    
}

console.log(stack.length === 0 ? str.trim() : 'NO')
