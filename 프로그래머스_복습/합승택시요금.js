const getMinCost = (start,vertex,cost) =>{
    let queue =[[start,0]];
    while(queue.length){
        const [from,curFar] = queue.shift();
        for(let i=0; i<vertex[from].length; i++){
            const {to,far} = vertex[from][i];
            if(cost[start][to] > curFar+far){
                cost[start][to] = curFar+far;
                cost[to][start] = curFar+far;
                queue.push([to,curFar+far]);
            }
        }
    }
}
const getData = (n,fares) =>{
    let vertex = Array.from({length:n+1},()=>[]);
    let cost = Array.from({length:n+1},()=>Array(n+1).fill(Infinity));
    for(let i=0; i<fares.length; i++){
        const [from,to,far] = fares[i];
        vertex[from].push({to,far});
        vertex[to].push({to:from,far});
    }
    for(let i=1; i<=n; i++){
        cost[i][i] = 0;
    }
    return [vertex,cost];
}
const solution = (n,s,a,b,fares) =>{
    let [vertex,cost] = getData(n,fares);
    getMinCost(s,vertex,cost);
    getMinCost(a,vertex,cost);
    getMinCost(b,vertex,cost);
    let min = cost[s][a] + cost[s][b];
    for(let i=1; i<=n; i++){
        let cMin = cost[s][i] + cost[i][a] + cost[i][b];
        cMin < min ? min=cMin : min;
    }
    return min;
}

const [n,s,a,b,fares] =[6,4,6,2,[[4, 1, 10], [3, 5, 24], [5, 6, 2], [3, 1, 41], [5, 1, 24], [4, 6, 50], [2, 4, 66], [2, 3, 22], [1, 6, 25]]];
//const [n,s,a,b,fares] =[7,3,4,1,[[5, 7, 9], [4, 6, 4], [3, 6, 1], [3, 2, 3], [2, 1, 6]]];
//const [n,s,a,b,fares] =[6,4,5,6,[[2,6,6], [6,3,7], [4,6,7], [6,5,11], [2,5,12], [5,3,20], [2,4,8], [4,3,9]]]
console.log(solution(n,s,a,b,fares));