const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// const input = [
// 'So when I die (the [first] I will see in (heaven) is a score list).',
// '[ first in ] ( first out ).',
// 'Half Moon tonight (At least it is better than no Moon at all].',
// 'A rope may form )( a trail in a maze.',
// 'Help( I[m being held prisoner in a fortune cookie factory)].',
// '([ (([( [ ] ) ( ) (( ))] )) ]).',
// ' .',
// '.'
// ]
const isRight = (string)=>{
   //string = string.replace(/[a-z]|[A-Z]|[\s]|[\.]/g,"");
    string = string.replace(/[^\[\]\(\)]/g,"");
    console.log(string);
   // console.log(string);
    if([')',']'].some(el => el===string[0])) return false;
    if(string ==="") return true;
    
    const match = {
        '(' : ')',
        '[' : ']',
        
    }
    let stack = [];
    let i = 0;
    while(i<string.length){
        if(['(','['].some(el => el ===string[i])){
            stack.push(string[i])
        }
        else{
            let last = stack.pop();
            if(match[last] !== string[i]){
                return false;
            }
        }
        i++;
    }
    
    return stack.length ===0 ? true : false;
}

function solution(input){
    let answer ='';
    input = input.filter(el => el!==".");
    // 입력의 마지막조건으로 .을 붙이므로 .은 생략한다
    for(let i=0; i<input.length; i++){
        isRight(input[i]) ? answer+='yes\n' : answer+='no\n'

}
    return answer;

}

console.log(solution(input).trim())