
const solution = (info,edges) =>{
    const child = edges.reduce((acc,info) => {
       const [from,to] = info;
       acc[from].push(to);
       return acc;
    }, Array.from({length:info.length} , () => []));
    
    let answer = 0;
    const dfs = (state,nextNodes) =>{
        let [curNode,sheep,wolves] = state;
        sheep += !info[curNode];
        wolves += info[curNode];
        if(sheep === wolves) return;
        const newNextNodes = [...nextNodes];
        const idx = newNextNodes.indexOf(curNode);
        answer = Math.max(answer,sheep);
        newNextNodes.splice(idx,1);
        newNextNodes.push(...child[curNode]);
        newNextNodes.forEach(nextNode =>{
            const nextState= [nextNode,sheep,wolves];
            dfs(nextState,newNextNodes);
        })
    }
    dfs([0,0,0],[0]);
    return answer;
}

// console.log(solution([0,0,1,1,1,0,1,0,1,0,1,1],	[[0,1],[1,2],[1,4],[0,8],[8,7],[9,10],[9,11],[4,3],[6,5],[4,6],[8,9]]))
console.log(solution([0,1,0,1,1,0,1,0,0,1,0],[[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[3,7],[4,8],[6,9],[9,10]]))