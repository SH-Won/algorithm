console.log(solution("xababcdcdababcdcd"));


function solution(s){
    let answer = s.length;
    
    for(let i=1; i<=s.length; i++){
        let length = compression(s,i);
        if(length < answer) answer = length;
    }
    

    function compression(s,n){
        let stringArr =[]
        let comArr = [];
        let countArr = [];
        let count = 1;
        
        for(let i=0; i<s.length; i+=n){
            let subStr = s.substr(i,n);
            stringArr.push(subStr);
        }
        
        //stringArr = ['aa','aa','bb','bb','bb'];
        //comArr = ['aa','bb']
        for(let i=0; i<stringArr.length; i++){
            if(comArr[comArr.length-1] !== stringArr[i]){
                comArr.push(stringArr[i]);
                
                if(count !== 1){
                    countArr.push(count);
                    count =1;
                }
                       
            }
            else if( i===stringArr.length-1 && comArr[comArr.length-1] === stringArr[i]){
                
                    countArr.push(count+1);
                    
                

            }
            else{
                count++;
            }
        }
        
        return countArr.length + comArr.join('').length;

    }
    return answer;


}