const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();

let check ={
    'ABC':2,
    'DEF':3,
    'GHI':4,
    'JKL':5,
    'MNO':6,
    'PQRS':7,
    'TUV':8,
    'WXYZ':9
}
let sol = [];

for(let i=0; i<input.length; i++){
    
    for(let key in check){
        sol[i] =
        Array.prototype.some.call(key, v => v===input[i]) ? check[key] : sol[i];
    }
}
let sum = sol.reduce((acc,pre)=> acc=acc+pre+1 ,0);
console.log(sum);


// for(let i=0; i< input.length; i++){
//     let charNumber = input[i].charCodeAt();

//     charNumber >= 65 && charNumber <=67 ?
//     input[i] = 2 :
//     charNumber >68 && charNumber
// }
