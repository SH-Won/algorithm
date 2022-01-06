//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const input = ['mirkovC4nizCC44','C4'];
// const input = ['12ab112ab2ab','12ab']

const solution = (input) =>{
    const string = input[0];
    const exWord = input[1];
    const len = exWord.length; 
    let stack = [];
    for(let i=0; i<string.length; i++){
        if(string[i] === exWord[len-1]){
            let flag = true;
            for(let j=1; j<len; j++){
                if(stack[stack.length-j] === exWord[len-j-1]) continue;
                else{
                    flag = false;
                    break;
                }
            }
            if(flag){
                let count = len-1;
                while(count--) stack.pop();
            }
            else stack.push(string[i]);
        }
        else stack.push(string[i]);
    }
    const answer = stack.join('');
    console.log(answer === '' ? 'FRULA' : answer);
}
solution(input);
