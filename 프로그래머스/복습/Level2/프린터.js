console.log(solution([1,1,9,1,1,1],0))
function solution(priorities,location){
    let answer =0;
    while(true){
        let current = priorities.shift();
        if(priorities.some(prior => prior > current))
            priorities.push(current);
         
        else{
            answer++;
           if(location === 0) return answer;
        }

        location--;
        if(location === -1) location = priorities.length-1;
        
    }
    
}
