
function solution(numbers) {
    let answer = [];
    
    dfs(0,0,0);
   
    answer.sort((a,b)=>a-b);
    
    return answer;
    
    function dfs(count,curNumber,idx){
        if(count === 2){
            if(answer.indexOf(curNumber) === -1){
                answer.push(curNumber);
            }
            return;
        }
        
        for(let i=idx; i<numbers.length; i++){
            let nextNumber = curNumber+numbers[i];
            dfs(count+1,nextNumber,i+1);
        }
    }
}