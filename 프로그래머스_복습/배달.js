const getDeliveryCount = (N,edge,K) =>{
    let dist = Array(N).fill(Infinity);
    dist[0] = 0;
    let queue = [[0,0]] ;
    while(queue.length){
        const [current,distance] = queue.shift();
        for(let i=0; i<edge[current].length; i++){
            const [next,nextDistance] = edge[current][i];
            if(dist[next] > distance+nextDistance){
                dist[next] = distance+nextDistance;
                queue.push([next,distance+nextDistance]);
            }
        }
    }
    const count = dist.filter(vilage => vilage <= K).length;
    return count
}
const solution = (N,road,K) =>{
    const edge = road.reduce((acc,cur)=>{
        const [from,to,distance] = cur;
        acc[from-1].push([to-1,distance]);
        acc[to-1].push([from-1,distance]);
        return acc;
    },Array.from({length:N},()=>[]));

    const answer  = getDeliveryCount(N,edge,K);
    return answer;
}
console.log(solution(5,[[1,2,1],[2,3,3],[5,2,2],[1,4,2],[5,3,1],[5,4,2]],3))