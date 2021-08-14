
const isRight = (s) =>{
    if(s[0]===')') return false;
    const match = {'(' : ')' };
    let stack = [];
    let i=0;
    while(i < s.length){
        if(match[stack[stack.length-1]] !== s[i]){
            stack.push(s[i])
        }
        else{
            stack.pop();
        }
        i++;
    }
    return stack.length === 0 ? true : false
 
}

function solution(s){
    let answer = true;
    
    isRight(s) ? answer : answer =false;


    return answer;
}