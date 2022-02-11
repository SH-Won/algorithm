const input = ['5 5 4','5 7 8 2 3','1 4 5','5 2 4','3 2 3','1 2 3']
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
        if(this.heap.length <= 0 ) return undefined;
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
        while( (index*2 + 1) < this.heap.length){
            const leftChildIndex = index*2 + 1;
            const rightChildIndex = index*2 + 2;
            const smallerChildIndex = this.heap[rightChildIndex] && this.heap[rightChildIndex].distance < this.heap[leftChildIndex].distance 
               ?  rightChildIndex : leftChildIndex;
            if(this.heap[smallerChildIndex].distance <= rootNode.distance){
                this.heap[index] = this.heap[smallerChildIndex];
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
    isEmpty = () => this.heap.length <= 0;
}
const dijkstra = (start,range,items,edge) =>{
    const dist = Array(edge.length).fill(Infinity);
    dist[start] = 0;
    const pq = new PriorityQueue();
    pq.push(start,0);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined) continue;
        if(cur.distance > dist[cur.to]) continue;
        for(let i=0; i<edge[cur.to].length; i++){
            const next = edge[cur.to][i];
            if(dist[next.to] > next.distance + cur.distance){
                dist[next.to] = next.distance + cur.distance;
                pq.push(next.to,dist[next.to]);
            }
        }
    }
    let farming  = 0;
    for(let i=1; i<dist.length; i++){
        if(dist[i] <= range) farming += items[i-1];
    }
    return farming;
}
const solution = input => {
    const [n,m,r] = input[0].split(' ').map(Number);
    const items = input[1].split(' ').map(Number);
    const edge = Array.from({length:n+1},()=>[]);
    for(let i=2; i<2+r; i++){
        const [from,to,distance] = input[i].split(' ').map(Number);
        edge[from].push({to,distance});
        edge[to].push({to:from,distance})
    }
    let answer = 0;
    for(let i=1; i<=n; i++){
        answer = Math.max(answer,dijkstra(i,m,items,edge));
    }
    console.log(answer);
}
solution(input);