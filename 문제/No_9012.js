// const fs = require('fs');
// const [N,...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,...arr]=[
    '6',
'(())())',
'(((()())()',
'(()())((()))',
'((()()(()))(((())))()',
'()()()()(()()())()',
'(()((())()('
]
let answer =''

const VPS = (string) =>{
    if(string[0] ===')') return false;
    const match = {
        '(':')'
    }
    let i = 1;
    let stack =[string[0]];
    while(i<string.length){
        if(match[stack[stack.length-1]] !== string[i]){
            stack.push(string[i]);
        }
        else{
           stack.pop();
        }
        i++

    }
    return stack.length ===0 ? true :false;
}

for(let i=0; i<Number(N); i++){
    if(VPS(arr[i])){
        answer+='YES\n'
    }
    else{
        answer+='NO\n'
    }
}
console.log(answer.trim());

let string = '[ first in ] ( first out ).'

console.log(string.replace(/[a-z]|[\s]|[\.]/g,''))
console.log(string.replace(/[^\[|^\]|^\{|^\}|^\(|^\)]/g,""))