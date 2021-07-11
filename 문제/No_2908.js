const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

let string ;
const onInput = (input) => string = input.trim();

const onClose = ()=>{
    let numberArray = string.split(' '); 
    for(let i=0; i<numberArray.length; i++){
        numberArray[i] = numberArray[i].split('').reverse().join('');
    }

    let max = Math.max(...numberArray);
    console.log(max);
   
       process.exit();
}
rl.on('line',onInput).on('close',onClose);