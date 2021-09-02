const s = "xababcdcdababcdcd";
const splitString = (string,unit) =>{
    let stringArr = [];

    for(let i=0; i<string.length; i+=unit){
        const letters = string.substr(i,unit);
        stringArr.push(letters);
    }
    
    return stringArr;

}
const compression = (stringArr) =>{
    let count = 1;
    let comStr ='';
    let temp = stringArr[0];
    for(let i=1; i<=stringArr.length; i++){
        if(stringArr[i] === temp){
            count++;
        }
        else{
             if(count ===1){
                 comStr+=temp;
             }
             else{
                 comStr+=""+count+temp
             }
             count =1;
             temp = stringArr[i];
        }
    }
    return comStr.length;
}


function solution(s){
    let answer = s.length;

    for(let unit=1; unit<=(s.length/2); unit++){
        let stringArr = splitString(s,unit);
        let length = compression(stringArr);
        length < answer ? answer=length : answer;
    }
    return answer;

}
console.log(solution(s));