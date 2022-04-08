const solution = (info,edges) =>{
    const child = Array.from({length:info.length},()=>[]);
    edges.forEach(([p,c])=> child[p].push(c));
    const initialState = {
        curNode: 0,
        nodes : [0],
        sheep : 0,
        wolves : 0
    }
    const getMaxSheep = (state) =>{
        let {curNode,sheep,nodes,wolves} = state;
        sheep += !info[curNode];
        wolves += info[curNode];
        if(sheep <= wolves) return 0;
        let sheepCount = sheep;
        const nextNodes = [...nodes];
        const idx = nextNodes.indexOf(curNode);
        nextNodes.splice(idx,1);
        nextNodes.push(...child[curNode]);
        nextNodes.forEach(node =>{
            const nextState = {
                curNode: node,
                sheep : sheep,
                wolves : wolves,
                nodes : nextNodes,
            }
            sheepCount = Math.max(sheepCount,getMaxSheep(nextState));
        })
        return sheepCount;
    }
    return getMaxSheep(initialState);
}
console.log(solution([0,0,1,1,1,0,1,0,1,0,1,1],[[0,1],[1,2],[1,4],[0,8],[8,7],[9,10],[9,11],[4,3],[6,5],[4,6],[8,9]]))