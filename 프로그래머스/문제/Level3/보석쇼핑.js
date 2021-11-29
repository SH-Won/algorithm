
const solution = (gems) => {
    const length = new Set(gems).size;
    let gemMap = new Map();
    let answer = [1,gems.length];
    
    gems.forEach((gem,index) => {
        gemMap.delete(gem);
        gemMap.set(gem,index);
        if(gemMap.size === length){
            const result = [gemMap.values().next().value+1,index+1];
           
            answer = answer[1] - answer[0] > result[1] - result[0] ? result : answer;
        }
    })
    return answer;
}
console.log(solution(["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"]));
// let map = new Map();

