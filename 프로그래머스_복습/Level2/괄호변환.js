const getSplitIndex = string =>{
    let count = 1;
    let temp = string[0];
    for(let i=1; i<string.length; i++){
        if(temp === string[i]) count++;
        else count--;
        if(count === 0) return i+1;
    }
    
}
const solution = p =>{
    if(p === '') return '';
    const splitIndex = getSplitIndex(p);
    const u = p.substring(0,splitIndex);
    const v = p.substring(splitIndex);
    if(u[0] === ')'){
        let string = `(${solution(v)})`;
        for(let i=1; i<u.length-1; i++){
            string += u[i] ==='(' ? ')' : '(';
        }
        return string;
    }
    return u + solution(v);
}
// console.log((solution("(()())()")))
// console.log(solution(")("))
console.log(solution("()))((()"))