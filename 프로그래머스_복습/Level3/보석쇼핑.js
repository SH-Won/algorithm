const solution = gems =>{
    const len = new Set(gems).size;
    const list = new Map();
    let answer = [1,gems.length];
    gems.forEach((gem,idx) =>{
        list.delete(gem);
        list.set(gem,idx+1);
        if(list.size === len){
            const [start,end] = [list.values().next().value, idx+1];
            if(answer[1] - answer[0] > end - start) answer = [start,end];
        }
    })
    return answer;
}
// console.log(solution(["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"]))
// console.log(solution(["AA", "AB", "AC", "AA", "AC"]))
// console.log(solution(["XYZ", "XYZ", "XYZ"]))
// console.log(solution(["ZZZ", "YYY", "NNNN", "YYY", "BBB"]))