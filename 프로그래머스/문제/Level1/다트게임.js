let dartResult ='10S10S10D'
console.log('S1'.search(/[SDT]/g))
//search 의 정규식은 정규식에 포함된것의 인덱스를 반환 없으면 -1 반환
console.log(solution(dartResult));

function solution(dartResult) {
    let answer = [];
    let temp=0;
    let i =0;
    let operate ={
        'S':1,
        'D':2,
        'T':3,
        '*':2,
        '#':-1
    }
    //console.log(answer);
    while(i<dartResult.length){
        let j=1;
      
        // console.log(dartResult.substring(i,i+j))
        while(dartResult.substring(i,i+j).search(/[SDT]/g) <= 0){
            
            j++;
        }
        let number = Number(dartResult.substring(i,i+j-1));
      
        let operation = operate[dartResult[i+j-1]];
        temp = number**operation;
       
        if(operate[dartResult[i+j]]){
            
            temp *= operate[dartResult[i+j]];
            if(answer.length && dartResult[i+j] ==='*'){
            answer[answer.length-1] =answer[answer.length-1] * (operate[dartResult[i+j]])
            }
            j++;

        }
        answer.push(temp);
        
        i=i+j;
       // console.log(i);


    }
    
    return answer.reduce((acc,cur)=>acc+cur);
}