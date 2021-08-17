
console.log(solution(5,[2,1,2,6,2,4,3,3]))
function solution(N, stages) {
    let answer ;
    let array = Array(N);
    let notYetClear = 0;
    for(let i=1; i<=N; i++){
        let currentStage =  stages.filter(stage => stage===i).length;
        
        let failureRate = currentStage / (stages.length - notYetClear)
        array[i-1] = [failureRate,i];
        notYetClear +=currentStage;
    }
    
    array.sort((a,b)=>{
        if(a[0]===b[0]){
            return a[1]-b[1];
        }
        return b[0]-a[0];
    })
    answer = array.map(result => result[1]);
   
    
    return answer;
}