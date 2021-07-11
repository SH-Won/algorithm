const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();

const constructorArr = [];

function sum(n){
    const N = n.split('').reduce((acc,pre) => acc=acc+Number(pre),0);
    return N;
}
for(let i=1; i<=Number(input); i++){
    if(Number(input) === sum(String(i))+i){
        constructorArr.push(i);
    }

}
constructorArr.length === 0 ? console.log(0) :
console.log(Math.min(...constructorArr))