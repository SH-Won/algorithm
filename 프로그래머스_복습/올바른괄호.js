const solution =(s) =>{
    let stack = [];
    let index = 0;
    if(s[0] === ')') return false;
    while(index < s.length){
        if(s[index] === '('){
            stack.push(s[index++]);
        }
        else if(stack[stack.length-1] !== s[index] ){
            stack.pop();
            index++;
        }
    }
    return stack.length ? false : true;
}