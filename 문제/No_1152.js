const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

let string ;
const onInput = (input) => string = input.toString().trim();

const onClose = ()=>{
    let stringArray = string.split(' ');
    let solution = 0;

    for(let i=0; i<stringArray.length; i++){
        stringArray[i] !=='' ? solution++ : solution
    }
    console.log(solution);
    
       process.exit();
}
rl.on('line',onInput).on('close',onClose);