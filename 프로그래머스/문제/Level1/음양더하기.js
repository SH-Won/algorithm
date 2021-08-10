

function solution(absolutes,signs){
    let answer=0;

    for(let i=0; i<absolutes.length; i++){
        let number = signs[i] ? absolutes[i] : (-1)*absolutes[i];
        answer +=number;
    }
    return answer;

}