
console.log(solution(24,27))
function solution(left, right) {
    let answer = 0;

    for(let i=left; i<=right; i++){
        if(measureCount(i) % 2 ===0){
            answer+=i;
        }
        else{
            answer-=i;
        }

    }
    function measureCount(number){
        if(number ===1) return 1;
        let count = 2;
        for(let i=2; i<=Math.floor(number/2); i++){
            if(number % i ===0){
                count++;
            }
        }
        return count;
    }
    return answer;
}