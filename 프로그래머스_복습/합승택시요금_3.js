const makeMinCost = (start,costs,edge) =>{
    let queue = [[start,0]];
    while(queue.length){
        const [current,curFar] = queue.shift();
        for(let i=0; i<edge[current].length; i++){
            const {to,far} = edge[current][i];
            const nextCost = curFar+far;
            if(costs[start][to] > nextCost){
                costs[start][to] = nextCost;
                costs[to][start] = nextCost;
                queue.push([to,nextCost]);
            }
        }
    }
}
const solution = (n,s,a,b,fares) =>{
    // n 지점갯수 
    let costs = Array.from({length:n+1},()=>Array(n+1).fill(Infinity));
    const edge = fares.reduce((acc,cur)=>{
        const [from,to,far] = cur;
        acc[from].push({to,far});
        acc[to].push({to:from,far});
        return acc;
    },Array.from({length:n+1},()=>[]))
    for(let i=1; i<=n; i++){
        costs[i][i] = 0;
    }
    makeMinCost(s,costs,edge);
    makeMinCost(a,costs,edge);
    makeMinCost(b,costs,edge);
    
    let minCost = costs[s][a] + costs[s][b];
    for(let i=1; i<=n; i++){
        const cost = costs[s][i] + costs[i][a] + costs[i][b];
        minCost = Math.min(cost,minCost);
    }
    return minCost;
}
//const [n,s,a,b,fares] =[6,4,6,2,[[4, 1, 10], [3, 5, 24], [5, 6, 2], [3, 1, 41], [5, 1, 24], [4, 6, 50], [2, 4, 66], [2, 3, 22], [1, 6, 25]]];
//const [n,s,a,b,fares] =[7,3,4,1,[[5, 7, 9], [4, 6, 4], [3, 6, 1], [3, 2, 3], [2, 1, 6]]];
 const [n,s,a,b,fares] =[6,4,5,6,[[2,6,6], [6,3,7], [4,6,7], [6,5,11], [2,5,12], [5,3,20], [2,4,8], [4,3,9]]]
console.log(solution(n,s,a,b,fares));