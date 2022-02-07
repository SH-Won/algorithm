const solution = (n,info) =>{
    let ryan = Array(11);
    let answer = Array(11);
    let diff = -1;
    const dfs = (count,arrow) =>{
        if(count === 10){
            ryan[10] = arrow;
            let r =0 ,a = 0;
            for(let i=0; i<11; i++){
                if(!info[i] && !ryan[i]) continue;
                if(info[i] >= ryan[i]) a += (10-i);
                else r += (10-i);
            }
            if(a >= r || r-a < diff) return;
            let flag = true;
            if(r-a === diff){
                for(let i=10; i>=0; i--){
                    if(answer[i] === ryan[i]) continue;
                    if(answer[i] > ryan[i]) flag = false;
                    break;
                }
            }
            if(flag){
                diff = r-a;
                for(let i=0; i<11; i++) answer[i] = ryan[i];
            }
            return;
        }
        for(let i=arrow; i>=0; i--){
            ryan[count] = i;
            dfs(count+1,arrow-i);
        }
    }
    dfs(0,n);
    return diff === -1 ? [-1] : answer;
}
// console.log(solution(5,[2,1,1,1,0,0,0,0,0,0,0]));
// console.log(solution(1,[1,0,0,0,0,0,0,0,0,0,0]))
// console.log(solution(9,[0,0,1,2,0,1,1,1,1,1,1]))
console.log(solution(10,[0,0,0,0,0,0,0,0,3,4,3]))