const string = "abcabcabcabcdededededede";
const compression = (string,n) =>{

    let strArr = [];
    let count =1;
    let str ='';

    for(let i=0; i<string.length; i+=n){
        let subStr = string.substring(i,i+n);
        strArr.push(subStr);
    }
    let temp = strArr[0];
    for(let i=1; i<=strArr.length; i++){
        
        if(strArr[i]===temp){
            count++;
            
        }
        else{
            if(count ===1){
                str+=temp;
                
            }
            else{
                str+=(count+temp);
            }
            count =1;
            temp = strArr[i]
        }
        
    }
    return str.length;

}
console.log(solution(string));

function solution(s){
    let answer = s.length;

    for(let i=1; i<=s.length/2; i++){
        let len = compression(s,i);
        len < answer ? answer=len : answer;
    }
    return answer;

}