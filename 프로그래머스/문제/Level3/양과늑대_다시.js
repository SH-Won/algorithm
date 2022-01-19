const dfs = (info,child,sNodes,wNodes,sheep,wolves) =>{
    if((sheep || wolves) && wolves >=sheep) return -1;
    while(sNodes.length){
        const node = sNodes.shift();
        sheep++;
        for(let i=0; i<child[node].length; i++){
            const childNode = child[node][i];
            info[childNode] === 0 ? sNodes.push(childNode) : wNodes.push(childNode);
        }
    }
    let sheepCount = sheep;
    for(let i=0; i<wNodes.length; i++){
        const nwNodes = [...wNodes];
        nwNodes.splice(i,1);
        const nsNodes = [];
        for(let j=0; j<child[wNodes[i]].length; j++){
            const childNode = child[wNodes[i]][j];
            info[childNode] === 0 ? nsNodes.push(childNode) : nwNodes.push(childNode);
        }
        // console.log(nwNodes,nsNodes);
        sheepCount = Math.max(sheepCount,dfs(info,child,nsNodes,nwNodes,sheep,wolves+1));
    }
    return sheepCount;
}
const solution = (info,edges) =>{
    const child = edges.reduce((acc,cur)=>{    
      acc[cur[0]].push(cur[1]);
      return acc;
    },Array.from({length:info.length},()=>[]))
    const sNodes = [0] , wNodes = [];
    return ans = dfs(info,child,sNodes,wNodes,0,0);
}
console.log(solution([0,0,1,1,1,0,1,0,1,0,1,1],[[0,1],[1,2],[1,4],[0,8],[8,7],[9,10],[9,11],[4,3],[6,5],[4,6],[8,9]]))