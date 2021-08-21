console.log(solution([1,1,9,1,1,1],0))
function solution(priorities, location) {
    let answer = 0;

    while(priorities.length){
        let prior = priorities.shift();
        let isPrior = priorities.some(p => p > prior)

        if(isPrior){ 
            priorities.push(prior);
            
        }
        else{
            answer++;
            if(location ===0) return answer;

        }
        location --;
        if(location ===-1) location = priorities.length -1
        

    }
    
}