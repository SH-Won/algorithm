console.log(solution(5,[2,4],[1,3,5]))

function solution(n, lost, reserve) {
    let answer = 0;
    let outfit = Array(n).fill(1);

    lost.forEach(num => outfit[num-1]-- );
    reserve.forEach(num => outfit[num-1]++);

    outfit.forEach((count,index)=>{
        if(count === 1 || count ===2) return;
        
        if(count === 0){
            
            if(outfit[index-1] ===2){
                outfit[index]++;
                outfit[index-1]--;
                return;

            }
            if(outfit[index+1] === 2){
                outfit[index+1]--;
                outfit[index]++;
                return;
            }
        }
    })
    

   
   answer = outfit.filter(num => num >=1).length;
    return answer;
}