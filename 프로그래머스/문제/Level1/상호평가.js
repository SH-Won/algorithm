let scores =[[100,90,98,88,65],[50,45,99,85,77],[47,88,95,80,67],[61,57,100,80,65],[24,90,94,75,65]];

console.log(solution(scores));

function solution(scores) {
    let answer = '';

    let student =Array.from({length:scores.length},(_,i)=>{
      return scores.reduce((acc,cur,index)=>{
          if(index === i) return acc;
          
          return [...acc,...cur.slice(i,i+1)]
      },[])
    })
   
    let studentScore = [];
    
  
    for(let i=0; i<student.length; i++){
        
        let sum = student[i].reduce((acc,cur)=>acc+=cur,0);
        if(student[i].indexOf(scores[i][i]) ===-1 && ( Math.max(...student[i],scores[i][i]) === scores[i][i] || Math.min(...student[i],scores[i][i]) ===scores[i][i] )){
            
            studentScore.push(grade(sum / (student.length -1)));
        }
        else{
            
            sum +=  scores[i][i];
            studentScore.push(grade(sum / student.length));
            
        }
       
    }

    function grade(score){
        
        
        if(score >= 90) return 'A'
        if(score>=80 && score <90) return 'B'
        if(score>=70 && score <80) return 'C'
        if(score>=50 && score <70) return 'D'
        
        return 'F'
    }

  
    answer = studentScore.join('');
    return answer;
}