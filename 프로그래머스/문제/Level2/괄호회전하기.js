const isRightStr = (str) =>{
    let i =0;
    let stack = [];
    let match = {
        '[' :']',
        '(':')',
        '{' :'}'
    }
    while(i <str.length){
        let last = stack[stack.length-1];
       if(match[last] !== str[i]){
           stack.push(str[i])
       }
        else{
            stack.pop();
        }
        i++;
    }
    return stack.length === 0 ? true : false;
}


function solution(s) {
    let answer = 0;
    
    for(let i=0; i<s.length; i++){
        let leftStr = s.substring(0,i);
        let rightStr = s.substring(i,s.length);
        
        if(isRightStr(""+rightStr+leftStr)){
            answer++;
        }
    }
    
    return answer;
}