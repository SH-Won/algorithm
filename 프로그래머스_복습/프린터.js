const solution = (priorities,location) =>{
    let answer = 0;
    while(true){
        const importance = priorities[0];
        if(Math.max(...priorities) === importance){
            priorities.splice(0,1);
            answer++;
            if(location === 0) return answer;
            
        }
        else{
            priorities.push(priorities.shift());
        }
        location = location === 0 ? priorities.length-1 : location-1;
    }
}
// console.log(solution([2,1,3,2],2)); 
console.log(solution([1,1,9,1,1,1],0))