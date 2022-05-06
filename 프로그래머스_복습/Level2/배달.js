class PriorityQueue{
    constructor(){
        this.queue = [];
    }
    push = (to,distance) =>{
        this.queue.push({to,distance});
        this.up();
    }
    up = () =>{
        let idx = this.queue.length - 1;
        const inserted = this.queue[idx];
        while(idx > 0){
            const parentIndex = Math.floor((idx-1)/2);
            if(this.queue[parentIndex].distance < inserted.distance){
                this.queue[idx] = this.queue[parentIndex];
                idx = parentIndex;
            }else break;
        }
        this.queue[idx] = inserted;
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
        let idx = 0;
        const root = this.queue[0];
        while( (idx*2 + 1) < this.queue.length){
            const leftChildIndex = idx*2 + 1;
            const rightChildIndex = idx*2 + 1;
            const smallerChildIndex = this.queue[rightChildIndex] && this.queue[rightChildIndex].distance < this.queue[leftChildIndex].distance
            ? rightChildIndex : leftChildIndex;
            if(this.queue[smallerChildIndex].distance < root.distance){
                this.queue[idx] = this.queue[smallerChildIndex];
                idx = smallerChildIndex;
            }else break;
        }
        this.queue[idx] = root;
    }
    isEmpty = () => this.queue.length === 0;
}
const dijkstra = (edge) =>{
    const dist = Array(edge.length).fill(Infinity);
    const pq = new PriorityQueue();
    dist[1] = 0;
    pq.push(1,0);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined || cur.distance > dist[cur.to]) continue;
        for(let i=0; i<edge[cur.to].length; i++){
            const next = edge[cur.to][i];
            const nextDistance = next.distance + cur.distance;
            if(dist[next.to] > nextDistance){
                dist[next.to] = nextDistance;
                pq.push(next.to,nextDistance);
            }
        }
    }
    return dist;
}
const solution = (N,road,K) =>{
    const edge = road.reduce((acc,cur) => {
        const [from,to,distance] = cur;
        acc[from].push({to,distance}) , acc[to].push({to:from,distance});
        return acc;
    },Array.from({length:N+1},()=>[]))

    const dist = dijkstra(edge);
    return dist.filter(dist => dist <= K).length;
}