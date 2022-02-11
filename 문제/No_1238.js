const input = ['4 8 2','1 2 4','1 3 2','1 4 7','2 1 1','2 3 5','3 1 2','3 4 4','4 2 3']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

class Heap{
    constructor(){
        this.heap = [];
    }
    insert = (end,time) =>{
        this.heap.push({end,time});
        this.heapifyUp();
    }
    heapifyUp = () =>{
        let index = this.heap.length -1;
        const insertedNode = this.heap[index];
        while(index > 0){
            const parentIndex = Math.floor((index-1)/2);
            if(this.heap[parentIndex].time > insertedNode.time){
                this.heap[index] = this.heap[parentIndex];
                index = parentIndex;
            }else break;
        }
        this.heap[index] = insertedNode;
    }
    remove = () =>{
        const rootNode = this.heap[0];
        if(this.heap.length <=0) return undefined;
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
            const smallerChildIndex = this.heap[rightChildIndex] && this.heap[rightChildIndex].time < this.heap[leftChildIndex].time
            ? rightChildIndex : leftChildIndex;
            if(this.heap[smallerChildIndex].time <= rootNode.time){
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
    push = (end,time) => this.insert(end,time);
    pop = () => this.remove();
    isEmpty = () => this.heap.length <= 0;
}
const dijkstra = (start,X,edge) =>{
    const dist = Array(edge.length).fill(Infinity);
    dist[start] = 0;
    const pq = new PriorityQueue();
    pq.push(start,0);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined) continue;
        if(cur.time > dist[cur.end]) continue;
        for(let i=0; i<edge[cur.end].length; i++){
            const next = edge[cur.end][i];
            if(dist[next.end] > next.time + cur.time){
                dist[next.end] = next.time + cur.time;
                pq.push(next.end,dist[next.end]);
            }
        }
    }
    if(start === X) return dist;
    else return dist[X];
}
const solution = input =>{
    const [N,M,X] = input[0].split(' ').map(Number);
    const edge = Array.from({length:N+1},()=>[]);
    for(let i=1; i<1+M; i++){
        const [start,end,time] = input[i].split(' ').map(Number);
        edge[start].push({end,time});
    }
    const studentDist = Array(N+1);
    const partyDist = dijkstra(X,X,edge);
    for(let i=1; i<=N; i++){
        if(i === X) continue;
        studentDist[i] = dijkstra(i,X,edge);
    }
    let answer = 0;
    for(let i=1; i<=N; i++){
        if(i === X) continue;
        answer = Math.max(answer, studentDist[i]+partyDist[i]);
    }
    console.log(answer);
}
solution(input);
// N * logM