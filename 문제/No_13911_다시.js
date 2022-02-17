const input = ['8 11','1 2 2','1 4 1','2 4 2','2 3 1','2 7 8','3 7 3','4 5 2','4 6 1','6 7 6','6 8 4','7 8 2','2 6','1 5','1 4','8']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class Heap{
    constructor(){
        this.heap = [];
    }
    insert = (to,distance) =>{
        this.heap.push({to,distance});
        this.heapifyUp();
    }
    heapifyUp = () =>{
        let index = this.heap.length - 1;
        const lastNode = this.heap[index];
        while(index > 0){
            const parentIdx = Math.floor((index-1) / 2);
            if(this.heap[parentIdx].distance > lastNode.distance){
                this.heap[index] = this.heap[parentIdx];
                index = parentIdx;
            }else break;
        }
        this.heap[index] = lastNode;
    }
    remove = () =>{
        const rootNode = this.heap[0];
        if(this.heap.length <= 0) return undefined;
        if(this.heap.length === 1) this.heap = [];
        else{
            this.heap[0] = this.heap.pop();
            this.heapifyDown();
        }
        return rootNode;
    }
    heapifyDown = () =>{
        let index = 0;
        const rootNode = this.heap[index];
        while( (index*2+1) < this.heap.length){
             const leftChildIdx = index*2 +1;
             const rightChildIdx = index*2 +2;
             const smallerChildIdx = this.heap[rightChildIdx] && this.heap[rightChildIdx].distance < this.heap[leftChildIdx].distance
               ? rightChildIdx : leftChildIdx;
            if(this.heap[smallerChildIdx].distance <= rootNode.distance){
                this.heap[index] = this.heap[smallerChildIdx];
                index = smallerChildIdx;
            }else break;
        }
        this.heap[index] = rootNode;
    }
}
class PriorityQueue extends Heap{
    constructor(){
        super();
    }
    push = (to,distance) => this.insert(to,distance);
    pop = () => this.remove();
    isEmpty = () => this.heap.length <= 0;
}
const dijkstra = (list,edge,limit) =>{
    const dist = Array(edge.length).fill(Infinity);

    const pq = new PriorityQueue();
    list.forEach(el => (dist[el] = 0, pq.push(el,0)));
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined || cur.distance > dist[cur.to]) continue;
        for(let i=0; i<edge[cur.to].length; i++){
            const next = edge[cur.to][i];
            const nd = next.distance + cur.distance;
            if(dist[next.to] > nd && nd <= limit){
                dist[next.to] = nd;
                pq.push(next.to, nd);
            }
        }
    }
    return dist;
}
const solution = input =>{
    const [V,E] = input[0].split(' ').map(Number);
    const edge = Array.from({length:V+1},()=>[]);
    const [M,x] = input[E+1].split(' ').map(Number);
    const mac = input[E+2].split(' ').map(Number);
    const [S,y] = input[E+3].split(' ').map(Number);
    const star = input[E+4].split(' ').map(Number);
    for(let i=1; i<1+E; i++){
        const [from,to,distance] = input[i].split(' ').map(Number);
        edge[from].push({to,distance});
        edge[to].push({to:from, distance});
    }
    const mDist = dijkstra(mac,edge,x);
    const sDist = dijkstra(star,edge,y);

    let min = Infinity;
    for(let i=1; i<=V; i++){
        if(!mDist[i] || !sDist[i] || mDist[i] ===Infinity || sDist[i] === Infinity) continue;
        min = Math.min(min, mDist[i] + sDist[i]);
    }
     min === Infinity ? console.log(-1) : console.log(min);
}
solution(input);
