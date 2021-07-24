const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();
// const input = '55-50+40';
let arr = input.split('-');
let resultArr = [];
let result ;
for(let i of arr){
    let sum = 0;
    let innerArr = i.split('+');
    for(let j of innerArr){
        
        sum +=  +j;
    }
    resultArr.push(sum);
}
// for(let i=1; i<resultArr.length; i++){
//     result -= resultArr[i];
// }
result = resultArr.reduce((acc,cur,index)=> index===0 ? acc+=cur : acc-=cur ,0)
console.log(result);
