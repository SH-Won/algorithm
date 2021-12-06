const solution = (s) =>{
    let stack = [];
    let index=0;
    while(index < s.length){
        console.log(stack);
        if(stack[stack.length-1] === s[index]){
            stack.pop();
            index++;
        }
        else{
            stack.push(s[index++]);
        }
    }
    return stack.length ? 0 : 1;
}
console.log(solution('cdcd'));