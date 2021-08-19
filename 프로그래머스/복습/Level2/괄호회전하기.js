console.log(solution("}]()[{"))
function solution(s){
    
    const isRight = (string) =>{
        const match = {
            '[' : ']',
            '(' : ')',
            '{' : '}'
        }
        let stack =[string[0]]
        let i=1;
        while(i<string.length){
            if(match[stack[stack.length-1]] !== string[i]){
                stack.push(string[i]);
            }
            else{
                stack.pop()
            }
            i++;
        }
        return stack.length ===0 ? true : false
    }
    let answer = 0
    for(let i=0; i<s.length; i++){
         if(isRight(s.slice(i)+s.slice(0,i))) answer++;
    }
    return answer;
}