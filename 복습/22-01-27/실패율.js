const solution = (N,stages) =>{
     let arr = [] , notClear = 0;
     for(let stage=1; stage<=N; stage++){
          const currentStage = stages.filter(el => el === stage).length;
          const failureRate = currentStage / (stages.length - notClear);
          arr.push({failureRate,stage});
          notClear+=currentStage;
     }
     arr.sort((a,b) => {
          if(a.failureRate === b.failureRate) return a.stage - b.stage;
          return b.failureRate - a.failureRate;
     })
     return arr.map(el => el.stage);
}
// console.log(solution(5,[2,1,2,6,2,4,3,3]))
console.log(solution(4,[4,4,4,4,4]))
