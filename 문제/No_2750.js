// const readline = require('readline');
// const rl = readline.createInterface({
//     input:process.stdin,
//     output:process.stdout
// });

// let array = []
// const onInput = (input) => array.push(input);

// const onClose = ()=>{
//     array.shift();
//     array.sort((a,b)=>a-b);

//     for(let i=0; i<array.length; i++){
//         console.log(array[i]);
//     }

    
//        process.exit();
// }
// rl.on('line',onInput).on('close',onClose);

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const sortArr = input.splice(1).map(num => parseInt(num));

sortArr.sort((a,b)=> a-b)
console.log(sortArr.join('\n'));

