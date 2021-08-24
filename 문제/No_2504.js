// const fs = require('fs');
// const string = fs.readFileSync('/dev/stdin').toString().trim();
// const string ="(()[[]])([])"
const string ="[][]((])"
let answer = bracketSum(string);
console.log(answer);
function bracketSum(string){
     if(!isRight(string)) return 0;
     if(string ==="") return 0;
     if(string ==="()") return 2;
     if(string ==="[]") return 3;

     const splitIndex = balance(string);
     if(splitIndex === string.length){
         let inString = string.substring(1,string.length-1);
         return string[0]==='(' ? 2*(bracketSum(inString))
                                : 3*(bracketSum(inString))

     }
     let u = string.substring(0,splitIndex);
     let v = string.substring(splitIndex);

     return bracketSum(u) + bracketSum(v);

}

function balance(string){
    let stack = [string[0]];
    let i=1;
    const match = {
        '(' : ')',
        '[' : ']'
    }
    while(i<string.length){
        if(stack.length === 0) return i;

        const last = stack[stack.length-1];
        if(match[last] !==string[i]){
            stack.push(string[i])
        }
        else{
            stack.pop();
        }
        i++;
    }
    return i;
}
function isRight(string){
    if(string[0] ===')' || string[0] ===']') return false;

    let stack = [];
    const match = {
        '(' : ')',
        '[' : ']'
    }
    let i = 0;
    while(i<string.length){
        if(string[i] ==='(' || string[i]==='['){
            stack.push(string[i])
        }
        else{
            const last = stack.pop();
            if(match[last] !== string[i]){
                return false;
            }
        }
        i++;
    }
    return stack.length ===0 ? true : false
}
