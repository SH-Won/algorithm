const isRightString = (s) =>{
    let stack = [];
    const map ={
        '[' : ']',
        '(' : ')',
        '{' : '}',
    }
    let index = 0;
    while(index < s.length){
        if(s[index] ==='(' || s[index] ==='{' || s[index] ==='['){
            stack.push(s[index++]);
        }
        else{
            const last = stack[stack.length - 1];
            const match = map[last];
            if(match !== s[index]) return false;
            stack.pop();
            index++;
        }
    }
    return stack.length === 0 ? true : false ;
}
const solution = (s) =>{
    let answer = 0;
    for(let i=0; i<s.length; i++){
        const string = s.slice(i) + s.slice(0,i);
        if(isRightString(string)) answer++;
    }
    return answer;
}
// console.log(solution("[](){}"))
console.log(solution('}]()[{'))