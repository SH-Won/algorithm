// const readline = require('readline');
// const rl = readline.createInterface({
//     input:process.stdin,
//     output:process.stdout
// });

// let array =[];
// const onInput = (input) => array.push(input);

// const onClose = ()=>{
//     for(let i=1; i<=Number(array[0]); i++){
//         let solutionArray = array[i].split(' '); //[5,ABC]
//         let solution = solutionArray[1].split('');//[A,B,C]
//         let s="";
        
//         for(let j=0; j<solution.length; j++){
             
//              s += solution[j].repeat(Number(solutionArray[0]))
//         }
//         console.log(s);

//     }
//        process.exit();
// }
// rl.on('line',onInput).on('close',onClose);

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split("\n");

for(let i=1; i<=Number(input[0]); i++){
            let solutionArray = input[i].split(' '); //[5,ABC]
            let solution = solutionArray[1].split('');//[A,B,C]
            let s="";
            
            for(let j=0; j<solution.length; j++){
                 
                 s += solution[j].repeat(Number(solutionArray[0]))
            }
            console.log(s);
    
        }