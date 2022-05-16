const getMaxDistanceCount = (edge) =>{
    const dist = Array(edge.length).fill(Infinity);
    dist[1] = 0;
    const queue = [1];
    let maxDistance = 0;
    while(queue.length){
        const curNode = queue.shift();
        maxDistance = Math.max(dist[curNode],maxDistance);
        for(let i=0; i<edge[curNode].length; i++){
            const nextNode = edge[curNode][i];
            if(dist[nextNode] > dist[curNode] + 1){
                dist[nextNode] = dist[curNode] + 1
                queue.push(nextNode);
            }
        }
    }
    return dist.slice(1).filter(d => d === maxDistance).length;
}
const solution = (n,vertex) =>{
    const edge = vertex.reduce((acc,[from,to]) =>{
      acc[from].push(to);
      acc[to].push(from);
      return acc;
    },Array.from({length:n+1},()=> []));
    return getMaxDistanceCount(edge);
}
console.log(solution(6,[[3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2]]))