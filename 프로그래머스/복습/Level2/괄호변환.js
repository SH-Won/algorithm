console.log(solution("()))((()"))

function solution(string){
    
   // ()))((()
    function balance(string){
        let stack = [];
        let i=1;
        stack.push(string[0]);
        while(stack.length){
           if(stack[stack.length-1] ===string[i]){
               stack.push(string[i])
           }
           else{
               stack.pop();
           }
           i++;
        }
        
        return i
    }

    function split(string){
        if(string === "") return ""

        const splitIndex = balance(string);
        let u = string.substring(0,splitIndex);
        let v = string.substring(splitIndex)

        if(u[0] === ')'){
            let str=''
            let temp = u.substring(1,u.length-1);
            str +=`(${solution(v)})`
            for(let i=0; i<temp.length; i++){
                if(temp[i] ==='(') str+=')'
                else str+='('
            }
            return str


        }

        return u+split(v)
    }
    return split(string)
}