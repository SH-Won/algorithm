let string = "()))((()"

console.log(solution(string))

function solution(string){
    if(string === "") return ""

    let u,v;
    let count = 0;

    for(let i=0; i<string.length; i++){
        string[i] === string[0] ? count++ : count--;
        if(count ===0){
            u = string.slice(0,i+1);
            v = string.slice(i+1);
            break;
        }
    }
   
    
    if(u[0] !=='('){
        let str ="";
        str+=`(${solution(v)})`
        for(let i=1; i<u.length-1; i++){
            u[i] ==='(' ? str+=')' : str+='('
        }
        return str;
    }

    return u+solution(v);

}