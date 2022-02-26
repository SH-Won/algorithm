class PriorityQueue{
    constructor(){
        this.queue = [];
    }
    push = (to,cost) =>{
        this.queue.push({to,cost});
        this.up();
    }
    up = ()=>{
        let i = this.queue.length -1;
        const inserted = this.queue[i];
        while(i > 0){
            const parent = Math.floor((i-1)/2);
            if(this.queue[parent].cost > inserted.cost){
                this.queue[i] = this.queue[parent];
                i = parent;
            }else break;
        }
        this.queue[i] = inserted;
    }
    pop = () =>{
        const root = this.queue[0];
        if(this.queue.length <= 0) return undefined;
        if(this.queue.length === 1) this.queue = [];
        else{
            this.queue[0] = this.queue.pop();
            this.down();
        }
        return root;
    }
    down = () =>{
        let i = 0;
        const root = this.queue[i];
        while((i*2 + 1) < this.queue.length){
            const leftChild = i*2 +1;
            const rightChild = i*2 + 2;
            const smallerChild = this.queue[rightChild] && this.queue[rightChild].cost < this.queue[leftChild].cost
            ? rightChild : leftChild;
            if(this.queue[smallerChild].cost <= root.cost){
                this.queue[i] = this.queue[smallerChild];
                i = smallerChild;
            }else break;
        }
        this.queue[i] = root;
    }
    isEmpty = () => this.queue.length <= 0;
}
const dijkstra = (start,edge) =>{
    const costs = Array(edge.length).fill(Infinity);
    const pq = new PriorityQueue();
    costs[start] = 0;
    pq.push(start,0);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined || cur.cost > costs[cur.to]) continue;
        for(let i=0; i<edge[cur.to].length; i++){
            const next = edge[cur.to][i];
            const nc = next.cost + cur.cost;
            if(costs[next.to] > nc){
                costs[next.to] = nc;
                pq.push(next.to, nc);
            }
        }
    }
    return costs;
}
const solution = (n,s,a,b,fares) =>{
    const edge = Array.from({length:n+1},()=>[]);
    fares.forEach(([from,to,cost]) =>(
        edge[from].push({to,cost}),
        edge[to].push({to:from,cost})
    ));
    const sCost = dijkstra(s,edge);
    const aCost = dijkstra(a,edge);
    const bCost = dijkstra(b,edge);
    let minCost = sCost[a] + sCost[b];
    for(let i=1; i<=n; i++){
        if(i === s) continue;
        const cost = sCost[i] + aCost[i] + bCost[i];
        minCost = Math.min(cost , minCost);
    }
    return minCost;
}
// console.log(solution(6,4,6,2,[[4, 1, 10], [3, 5, 24], [5, 6, 2], [3, 1, 41], [5, 1, 24], [4, 6, 50], [2, 4, 66], [2, 3, 22], [1, 6, 25]]))
// console.log(solution(7,3,4,1,[[5, 7, 9], [4, 6, 4], [3, 6, 1], [3, 2, 3], [2, 1, 6]]))
console.log(solution(6,4,5,6,[[2,6,6], [6,3,7], [4,6,7], [6,5,11], [2,5,12], [5,3,20], [2,4,8], [4,3,9]]))