const answer = [1,2,3,4,5];
console.log(solution(answer));

function solution(answers){
    let answer =[];
    let answerArr =[
        [1,2,3,4,5],
        [2,1,2,3,2,4,2,5],
        [3,3,1,1,2,2,4,4,5,5]
    ]
    let score = Array(3).fill(0);
    let max = 0;
    answers.forEach((ans,index)=>{

        if(ans === answerArr[0][index % 5]){
            score[0]++;
        }
        if(ans === answerArr[1][index % 8]){
            score[1]++;
        }
        if(ans === answerArr[2][index % 10]){
            score[2]++;
        }
    })
    console.log(score);
    for(let i=0; i<score.length; i++){
        if(score[i] > max) max =score[i]
    }
    for(let i=0; i<score.length; i++){
        if(max === score[i]){
            answer.push(i+1);
        }
    }

    return answer;
    
       
}