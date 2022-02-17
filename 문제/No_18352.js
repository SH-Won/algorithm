// const input = ['4 4 2 1','1 2','1 3','2 3','2 4']
// const input = ['4 3 2 1','1 2','3 4','1 4']
// const input = ['4 4 1 1','1 2','1 3','2 3','2 4']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
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
const dijkstra = (start,edge) =>{
    const dist = Array(edge.length).fill(Infinity);
    dist[start] = 0;
    const pq = new PriorityQueue();
    pq.push(start,0);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined || cur.distance > dist[cur.to]) continue;
        for(let i=0; i<edge[cur.to].length; i++){
            const next = edge[cur.to][i];
            const nd = next.distance + cur.distance;
            if(dist[next.to] > nd){
                dist[next.to] = nd;
                pq.push(next.to, nd);
            }
        }
    }
    return dist;
}
const solution = input =>{
    const [N,M,K,X] = input[0].split(' ').map(Number);
    const edge = Array.from({length:N+1},()=>[]);
    for(let i=1; i<1+M; i++){
        const [from,to] = input[i].split(' ').map(Number);
        edge[from].push({to,distance:1});
    }
    const dist = dijkstra(X,edge);
    let answer = '';
    for(let i=1; i<=N; i++){
        if(dist[i] === K) answer+=`${i}\n`
    }
    answer.length === 0 ? console.log(-1) : console.log(answer.trim())
}
solution(input);