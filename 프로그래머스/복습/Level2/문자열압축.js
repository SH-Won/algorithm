
const compression = (string,splitCount) =>{
    //let length = Math.ceil(string.length / splitCount);
    let stringArr = [];
    for(let i=0; i<string.length; i+=splitCount){
        let str = string.substring(i,i+splitCount);
        stringArr.push(str);
    }
   
    let comStr = '';
    let count = 1;
    let preStr = stringArr[0];
    for(let i=1; i<=stringArr.length; i++){

        if(stringArr[i] === preStr){
            count++;
        }
        else{
            if(count ===1){
                comStr += preStr;
            }
            else{
                comStr += (""+count+preStr)
            
            }
            count = 1;
            preStr = stringArr[i]
        }
    }
    return comStr;

}
 //console.log(solution("abcabcabcabcdededededede"));

function solution(s){
    let answer =s.length ;
    
    for(let i=1; i<=(s.length / 2); i++){
        let length = compression(s,i).length;
        if(length < answer) answer = length

    }

    return answer;
}