const getSplitIndex = string =>{
    let count = -1;
    for(let i=1; i<string.length; i++){
        if(string[i] !== string[0]) count++;
        else count--;
        if(count === 0) return i+1;
    }
    return string.length;
}
const solution = p =>{
    if(p === "") return p;
    const idx = getSplitIndex(p);
    const [u,v] = [p.substring(0,idx),p.substring(idx)];
    if(u[0] !=='('){
        let result = `(${solution(v)})`;
        for(let i=1; i<u.length-1; i++) u[i] === '(' ? result+=')' : result+='(';
        return result;
    }
    return u + solution(v);
}
console.log(solution("(()())()"))
console.log(solution(')('))