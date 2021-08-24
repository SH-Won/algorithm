//const string ="(()[[]])([])"
//const string = '[(((())))[[]][[]][[]]]'
const string = '(()[[]])()([])'
// const fs = require('fs');
// const string = fs.readFileSync('/dev/stdin').toString().trim();
let answer = bracketSum(string);
console.log(answer);

function bracketSum(string){
    let stack = [];
    let i=0;
    const match = {
        '(':')',
        '[':']'
    }
    // [ [ 2 3 4 ]
    while(i<string.length){
        
        if(string[i] ==='(' || string[i]==='['){
            stack.push(string[i]);
        }
        else{
            const last = stack[stack.length-1];
            if(match[last] === string[i]){
                stack.pop();
                string[i] ===')' ? stack.push(2) :stack.push(3)
            }
            else{
                let sum =0;
                let count = stack.length-1; // stack.length-2 이면 while(true){ count--;}
                
                while(count--){
                    sum+=stack.pop();
                    if(stack[count] ==='(' || stack[count]==='[' ){
                       stack.pop();
                       string[i] ===')' ? stack.push(2*sum) : stack.push(3*sum)
                        break;
                    }
                   // count--;
                }
            }
        }
        i++;
    }
    //하나라도 true 인게 있다면
   // return stack.some(el => typeof el ==='string') ? 0 : stack.reduce((acc,cur)=>acc+=cur,0)
   let answer = stack.reduce((acc,cur)=>acc+=cur,0)
   return typeof answer === 'number' ? answer : 0
}

