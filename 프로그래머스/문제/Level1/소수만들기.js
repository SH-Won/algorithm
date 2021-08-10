console.log(solution([1,2,7,6,4]))
function solution(nums){

    let answer = 0;
    // let visited = Array(nums.length).fill(false);
    
    dfs(0,0,0)
    function dfs(count,cNum,idx){
        
        if(count === 3){
            isPrime(cNum) ? answer++ : answer;
            return;

        }

        for(let i=idx; i<nums.length; i++){
                let nextNum = nums[i]+cNum;
                dfs(count+1,nextNum,i+1);
            }
            
            
        }

    function isPrime(number){
        if(number < 2) return false;
        if(number ===2) return true;

        for(let i=2; i<=Math.sqrt(number); i++){
            if(number % i === 0){
                return false;
            }
        }
        return true;
    }
    return answer;

}