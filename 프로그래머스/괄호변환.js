const p = "()))((()"
const balance = (string) =>{
    let stack = [string[0]];
    let i=1;
    while(true){
        if(stack.length ===0) return i;
        
        if(stack[stack.length-1] !==string[i]){
            stack.pop();
        }
        else{
            stack.push(string[i]);
        }
        i++;
    }
}

const transform = (string) =>{
    if(string ==="") return "";
    const splitIndex = balance(string);

    const u = string.substring(0,splitIndex);
    const v = string.substring(splitIndex);
    if(u[0] !== '('){
        let str = `(${transform(v)})`
        for(let i=1; i<u.length-1; i++){
            u[i] ==='(' ? str+=')' : str+='('
        }
        return str;
    }

    return u+transform(v);

}
const solution = (string) =>{
    return transform(string);
}
console.log(solution(p));
