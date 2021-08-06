console.log(solution("abcabcabcabcdededededede"))


function solution(s){

    let answer =s.length;
    

    for(let i=1; i<=s.length/2; i++){
        let length = compression(s,i);
        if(length < answer) answer =length;
       
    }

    function compression(s,n){
        let count = 1;
        let stringArr = [];
        let str =''
        
        
       
       for(let i=0; i<s.length; i+=n){
           let subStr = s.substr(i,n);
           stringArr.push(subStr);
          }
          let temp = stringArr[0];
          
        for(let i=1; i<=stringArr.length; i++){
            if(temp ===stringArr[i]){
                count++;
            }
            else{
                if(count === 1) str+=temp;
                else{
                    str+=(count+temp);
                    
                }
                count =1;
                temp = stringArr[i];

            }
        }
       
    return str.length;
    
}
return answer;

}