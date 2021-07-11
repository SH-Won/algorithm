const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

let string;
const onInput = (input) => string = input;

const onClose = ()=>{
    let alphabet = Array.from({length:122-97+1},(_,i) => String.fromCharCode(i+97))
    let stringArray = string.split('');
    let solution = [];
    alphabet.forEach(v=>{
        let index = stringArray.indexOf(v);
        solution.push(index)
    })
    console.log(solution.join(' '));


    
       process.exit();
}
rl.on('line',onInput).on('close',onClose);