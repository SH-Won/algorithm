const input = ['5 7','0 0 0 1 1','0 1 7','0 2 2','1 2 4','1 3 3','1 4 6','2 3 2','3 4 1']
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
    heapifyUp =() =>{
        let index = this.heap.length - 1;
        const insertedNode = this.heap[index];
        while(index > 0){
            const parentIndex = Math.floor((index-1) / 2);
            if(this.heap[parentIndex].distance > insertedNode.distance){
                this.heap[index] = this.heap[parentIndex];
                index = parentIndex;
            }else break;
        }
        this.heap[index] = insertedNode;
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
        while((index*2+1) < this.heap.length){
            const leftChildIndex = index*2 +1;
            const rightChildIndex = index*2 +2;
            const smallerChildIndex = this.heap[rightChildIndex] && this.heap[rightChildIndex].distance < this.heap[leftChildIndex].distance
             ? rightChildIndex : leftChildIndex;
            if(this.heap[smallerChildIndex].distance <= rootNode.distance){
                this.heap[index]  = this.heap[smallerChildIndex];
                index = smallerChildIndex;
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
    isEmpty = () => this.heap.length <=0;
}
const dijkstra = (sight,edge) =>{
    const nexus = edge.length-1;
    const dist = Array(edge.length).fill(Infinity);
    dist[0] = 0;
    const pq = new PriorityQueue();
    pq.push(0,0);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined) continue;
        if(cur.distance > dist[cur.to]) continue;
        for(let i=0; i<edge[cur.to].length; i++){
            const next = edge[cur.to][i];
            if(sight[next.to] && next.to !== nexus) continue;
            const nd = next.distance + cur.distance;
            if(dist[next.to] > nd){
                dist[next.to] = nd;
                pq.push(next.to,nd);
            }
        }
    }
    dist[nexus] === Infinity ? console.log(-1) : console.log(dist[nexus])
}
const solution = input =>{
    const [N,M] = input[0].split(' ').map(Number);
    const sight = input[1].split(' ').map(Number);
    const edge = Array.from({length:N}, ()=>[]);
    for(let i=2; i<2+M; i++){
        const [from,to,distance] = input[i].split(' ').map(Number);
        edge[from].push({to,distance});
        edge[to].push({to:from,distance});
    }
    return dijkstra(sight,edge);
}
solution(input);