console.log(solution([95,90,99,99,80,99],[1,1,1,1,1,1]))

function solution(progresses,speeds){
    let answer = [];
    let i = 0;
    while(progresses.length){
        let j =1;
        
        while(progresses.slice(i,i+j).every(num => num >=100) && i+j <= progresses.length){
            
            j++;
        }
        
        progresses.forEach((num,index)=> progresses[index]+=speeds[index]);

        if(j !==1){
            progresses.splice(i,j-1);
            speeds.splice(i,j-1);
            answer.push(j-1);
        }

        
    }
    return answer;
}