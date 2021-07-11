const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

let string;
const onInput = (input) => string = input.toLowerCase();

const onClose = ()=>{
    let charNumber = {};
    for(let char of string){
        charNumber[char] = charNumber[char] ? charNumber[char] +1 : 1;
    }
    let counter = 0;
    let solution;
    let max = Math.max(...Object.values(charNumber));
    
    for(let char in charNumber){
        if(charNumber[char] === max){
            solution = char;
            counter ++;
        }
    }
    if(counter > 1){
        console.log('?');
        return
    }
    console.log(solution.toUpperCase());

    
    
       process.exit();
}
rl.on('line',onInput).on('close',onClose);