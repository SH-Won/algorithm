// const string = "(()[[]])([])"
const string ="[][]((])"
// const fs = require('fs');
// const string = fs.readFileSync('/dev/stdin').toString().trim();

const balance = (string) =>{
    let stack = [string[0]];
    let i =1;
    while(i < string.length){
        if(stack.length ===0 ) return i;
        if(string[i] ==='(' || string[i]==='['){
            stack.push(string[i]);
        }
        else{
          stack.pop();
        }
        i++;
    }
    return i;
}
const isRight = (string) =>{
    if(string[0] ===")" || string[0] ==="]") return false;
    let stack = [string[0]];
    const map = {"(":")","[":"]"};
    let i=1;
    while(i < string.length){
       
        if(string[i] ==='(' || string[i]==='['){
            stack.push(string[i]);
        }
        else{
            const last = stack.pop();
            if(map[last] !== string[i]){
                return false;
            }
        }
        i++;
    }
    return stack.length ===0 ? true : false;

}

const getValue = (string) =>{
    
    const splitIndex = balance(string);
    
    if(splitIndex === string.length){
        if(string ==="()") return 2;
        if(string==="[]") return 3; 
        
        const nString = string.substring(1,string.length-1);
        return string[0] ==='(' ? 2*getValue(nString) : 3*getValue(nString);    
    }
    const leftStr = string.substring(0,splitIndex);
    const rightStr = string.substring(splitIndex);

    return getValue(leftStr) + getValue(rightStr);

}
const solution =(string)=>{
    return isRight(string) ? getValue(string) : 0;
}
console.log(solution(string));