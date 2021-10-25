const solution = (gems) =>{
    const length = new Set(gems).size;
    let gemMap = new Map();
    let answer = [1,gems.length];
    for(let i=0; i<gems.length; i++){
        const gem = gems[i];
        gemMap.delete(gem);
        gemMap.set(gem,i);
        if(gemMap.size === length){
           const result = [gemMap.values().next().value+1,i+1];
           answer = answer[1] - answer[0] > result[1] - result[0] ? result : answer;
        }
    }
   return answer;
}