const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
let [N,...arr]=input;
// let [N,...arr]=[
// '14'
// ,'push 1'
// ,'push 2'
// ,'top'
// ,'size'
// ,'empty'
// ,'pop'
// ,'pop'
// ,'pop'
// ,'size'
// ,'empty'
// ,'pop'
// ,'push 3'
// ,'empty'
// ,'top'
// ]
let inputIndex = 0;
let stack = []
let str = '';

while(inputIndex < Number(N)){
    const order = arr[inputIndex++].split(' ');

    switch(order[0]){
        case 'push' :
            stack.push(Number(order[1]));
            break;
        case 'pop' :
            str+=stack.length ===0 ? '-1\n' :`${stack.pop()}\n`;
            break;
        case 'size':
            str+=`${stack.length}\n`
            break;
        case 'empty':
            str+= stack.length === 0 ? '1\n' :'0\n'
            break;
        case 'top' :
            str+= stack.length === 0 ? '-1\n' :`${stack[stack.length-1]}\n`
        default :
        break;
            
    }
    
}
console.log(str.trim());

