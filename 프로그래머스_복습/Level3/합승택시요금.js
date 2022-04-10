class PriorityQueue{
    constructor(){
        this.queue = [];
    }
    push = (to,cost) =>{
        this.queue.push({to,cost});
        this.up();
    }
    up = () =>{
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
        const first = this.queue[0];
        if(this.queue.length <=0 ) return undefined;
        if(this.queue.length === 1) this.queue = [];
        else{
            this.queue[0] = this.queue.pop();
            this.down();
        }
        return first;
    }
    down = () =>{
        let i = 0;
        const first = this.queue[i];
        while((i*2 + 1) < this.queue.length){
            const leftChild = i*2 + 1;
            const rightChild = i*2 + 2;
            const smallerChild = this.queue[rightChild] && this.queue[rightChild].cost < this.queue[leftChild].cost
            ? rightChild : leftChild;
            if(this.queue[smallerChild].cost <= first.cost){
                this.queue[i] = this.queue[smallerChild];
                i = smallerChild;
            }else break;
        }
        this.queue[i] = first;
    }
    isEmpty = () => this.queue.length <= 0;
}
const dijkstra = (start,edge) =>{
    const costs = Array(edge.length).fill(Infinity);
    const pq = new PriorityQueue();
    pq.push(start,0);
    costs[start] = 0;
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined || cur.cost > costs[cur.to]) continue;
        for(let i=0; i<edge[cur.to].length; i++){
            const next = edge[cur.to][i];
            const nd = next.cost + cur.cost;
            if(costs[next.to] > nd){
                costs[next.to] = nd;
                pq.push(next.to, nd);
            }
        }
    }
    return costs;
}
const solution = (n,s,a,b,fares) =>{
    const edge = fares.reduce((acc,[from,to,cost])=>{
        acc[from].push({to,cost});
        acc[to].push({to:from,cost});
        return acc;
    },Array.from({length:n+1},()=>[]))
    
    const [sDist,aDist,bDist] = [dijkstra(s,edge),dijkstra(a,edge),dijkstra(b,edge)];
    let minCost = sDist[a] + sDist[b];
    for(let i=1; i<=n; i++){
        if(i === s) continue;
        minCost = Math.min(minCost, sDist[i]+aDist[i]+bDist[i])
    }
    return minCost;
}