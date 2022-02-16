// const input = ['6 8','4 5 3','2 4 0','4 1 4','2 1 1','5 6 1','3 6 2','3 2 6','3 4 4']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class Heap{
    constructor(){
        this.heap = [];
    }
    insert = (to,stover) =>{
        this.heap.push({to,stover});
        this.heapifyUp();
    }
    heapifyUp = () =>{
        let index = this.heap.length - 1;
        const lastNode = this.heap[index];
        while(index > 0){
            const parentIdx = Math.floor((index-1) / 2);
            if(this.heap[parentIdx].stover > lastNode.stover){
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
             const smallerChildIdx = this.heap[rightChildIdx] && this.heap[rightChildIdx].stover < this.heap[leftChildIdx].stover
               ? rightChildIdx : leftChildIdx;
            if(this.heap[smallerChildIdx].stover <= rootNode.stover){
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
    push = (to,stover) => this.insert(to,stover);
    pop = () => this.remove();
    isEmpty = () => this.heap.length <= 0;
}

const dijkstra = (edge) =>{
    const end = edge.length - 1;
    const totalStover = Array(edge.length).fill(Infinity);
    totalStover[1] = 0;
    const pq = new PriorityQueue();
    pq.push(1,0);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined || cur.distance > totalStover[cur.to]) continue;
        for(let i=0; i<edge[cur.to].length; i++){
            const next = edge[cur.to][i];
            const ns = next.stover + cur.stover;
            if(totalStover[next.to] > ns){
                totalStover[next.to] = ns;
                pq.push(next.to, ns);
            }
        }
    }
    console.log(totalStover[end]);
}

const solution = input =>{
    const [N,M] = input[0].split(' ').map(Number);
    const edge = Array.from({length:N+1},()=>[]);
    for(let i=1; i<1+M; i++){
        const [from,to,stover] = input[i].split(' ').map(Number);
        edge[from].push({to,stover});
        edge[to].push({to:from, stover});
    }
    return dijkstra(edge);
}
solution(input);