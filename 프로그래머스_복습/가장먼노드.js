const getMaxNodeCount = (edge) =>{
    let dist= Array(edge.length).fill(-1);
    dist[1] = 0;
    let queue = [1];
    let max = 0;
    while(queue.length){
        const node = queue.shift();
        for(let i=0; i<edge[node].length; i++){
            const nextNode = edge[node][i];
            if(dist[nextNode] !==-1) continue;
            dist[nextNode] = dist[node] + 1;
            queue.push(nextNode);
            if(dist[nextNode] > max) max = dist[nextNode];
        }
    }
    return dist.filter(d => d === max).length;
}
const solution = (n,vertex) =>{
    const edge = vertex.reduce((acc,cur)=>{
        const [from,to] = cur;
        acc[from].push(to);
        acc[to].push(from);
        return acc;
    },Array.from({length:n+1},()=>[]));
    
    return getMaxNodeCount(edge);
}
console.log(solution(6,[[3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2]]))