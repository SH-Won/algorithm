const solution = (info,edges) =>{
    const graph = edges.reduce((acc,[parent,child])=>{
         acc[parent].push(child);
         return acc;
    },Array.from({length:info.length},() => []));
    let answer = 0;

    const dfs = (state,nextNodes) =>{
        let [curNode,sheep,wolves] = state;
        info[curNode] === 0 ? sheep++ : wolves++;
        if(wolves >= sheep) return;
        answer = Math.max(answer,sheep);
        const newNextNodes = [...nextNodes];
        const idx = newNextNodes.indexOf(curNode);
        newNextNodes.splice(idx,1);
        newNextNodes.push(...graph[curNode])
        newNextNodes.forEach(nextNode =>{
            const nextState = [nextNode,sheep,wolves];
            dfs(nextState,newNextNodes);
        })
    }
    dfs([0,0,0],[0]);
    return answer;
}