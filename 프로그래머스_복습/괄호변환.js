const getSplitIndex = (s) =>{
    let count =0 , i = 0;
    for(i; i<s.length; i++){
        s[i] === '(' ? count++ : count--;
        if(count ===0) return i;
    }
}

const transform = (s) =>{
    if(s === '') return '';
    const splitIndex = getSplitIndex(s);
    const u = s.substring(0,splitIndex+1);
    const v = s.substring(splitIndex+1,s.length);
    if(u[0] !== '('){
        let str = '';
        str +=`(${transform(v)})`;
        for(let i=1; i<u.length-1; i++){
            u[i] === '(' ? str+=')' : str+='('
        }
        return str;
    }
    return u+transform(v);
}
const solution = (p) =>{
    return transform(p);
}
console.log(solution('()))((()'))