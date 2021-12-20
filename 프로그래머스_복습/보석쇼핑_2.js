const solution = (gems) =>{
    const length = new Set(gems).size;
    let answer = [1,gems.length];
    let gemMap = new Map();

    gems.forEach((gem,index) => {
        gemMap.delete(gem);
        gemMap.set(gem,index);
        if(gemMap.size === length){
            const [start,end] = [gemMap.values().next().value+1,index+1];
            answer = answer[1] - answer[0] > end - start ? [start,end] : answer;
        }
    })
    return answer;
}