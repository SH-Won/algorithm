
const isPossible = s =>{
    for(let i=1; i<s.length; i++){
        if(s[i] !== s[s.length-1-i]) return false
    }
    return true
}
const solution = s =>{
    let length = s.length;
    let answer = -1;
    for(let i=0; i<length; i++){
        if(answer > -1) break;
        for(let j=0; j<=i; j++){
            const string = s.slice(j,length-i+j);
            if(s[j] === s[length-i+j-1] && isPossible(string)){
                answer = length -i;
                break;
            }       
        }
    }
    return answer;
}