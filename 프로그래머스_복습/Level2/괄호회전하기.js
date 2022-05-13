const isOpenBracket = bracket => bracket === '(' ||  bracket === '{' || bracket === '[';
const isRight = s =>{
    const map = {
        '[' : ']',
        '(' : ')',
        '{' : '}'
    }
    const stack = [s[0]];
    for(let i=1; i<s.length; i++){
        const bracket = s[i];
        if(isOpenBracket(bracket)) stack.push(bracket);
        else{
            const prevBracket = stack[stack.length-1];
            if(map[prevBracket] === bracket) stack.pop();
            else return false;
        }
    }
    return stack.length === 0;
}
const solution = s =>{
    let answer = 0;
    for(let i=0; i<s.length; i++){
        const newS = s.substring(i)+s.substring(0,i);
        if(isRight(newS)) answer++;
    }
    return answer;
}
// console.log(solution('[](){}'))
// console.log(solution('}]()[{'))
