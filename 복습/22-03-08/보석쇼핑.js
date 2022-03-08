const solution = gems =>{
    const len = new Set(gems).size;
    const gemMap = new Map();
    let answer = [1,gems.length];
    gems.forEach((gem,idx) =>{
        gemMap.delete(gem);
        gemMap.set(gem,idx+1);
        if(gemMap.size === len){
            const [start,end] = [gemMap.values().next().value,idx+1];
            answer[1] - answer[0] > end - start ?
            answer = [start,end] : answer;
        }
    })
    return answer;
}
console.log(solution(["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"]))