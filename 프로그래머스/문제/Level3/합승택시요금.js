//const [n,s,a,b,fares] =[6,4,6,2,[[4, 1, 10], [3, 5, 24], [5, 6, 2], [3, 1, 41], [5, 1, 24], [4, 6, 50], [2, 4, 66], [2, 3, 22], [1, 6, 25]]];
//const [n,s,a,b,fares] =[7,3,4,1,[[5, 7, 9], [4, 6, 4], [3, 6, 1], [3, 2, 3], [2, 1, 6]]];
const [n,s,a,b,fares] =[6,4,5,6,[[2,6,6], [6,3,7], [4,6,7], [6,5,11], [2,5,12], [5,3,20], [2,4,8], [4,3,9]]]
console.log(solution(n,s,a,b,fares));
//solution(n,s,a,b,fares);
function solution(n, s, a, b, fares) {
    let cost = Array.from({length:n+1},()=>Array(n+1).fill(Infinity));
    let edge = Array.from({length:n+1},()=>[]);

    for(let i=0; i<fares.length; i++){
        const [from,to,far] = fares[i];
        edge[from].push({to,far});
        edge[to].push({to:from,far});
    }
    for(let i=0; i<n+1; i++){
        cost[i][i] = 0;
    }
   
    const calcMinCost = (start) =>{
        let queue = [{from:start,curFar:0}];
        while(queue.length){
            const {from,curFar} = queue.shift();
            for(let i=0; i<edge[from].length; i++){
                const {to,far} = edge[from][i];
                const nextCost = curFar+far;
                if(cost[start][to] > nextCost){
                    cost[start][to] = nextCost;
                    cost[to][start] = nextCost;
                    queue.push({from:to,curFar:nextCost});
                }
            }
        }
        
    }
    calcMinCost(s);
    calcMinCost(a);
    calcMinCost(b);
    let minCost = cost[s][a] + cost[s][b];
    for(let i=1; i<=n; i++){
        if(i === s) continue;
        minCost = Math.min(minCost,cost[s][i]+cost[i][a]+cost[i][b])
    }
    return minCost;
}
