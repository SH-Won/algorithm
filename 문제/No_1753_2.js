// const input = ['5 6','1','5 1 1','1 2 2','2 4 5','2 3 4','3 4 6','1 3 3']
// const input = ['2 2','1','1 2 2','1 2 3']
// const input = ['2 2','1','1 2 1','1 2 2']
// const input = ['4 1','1','4 2 3']
// const input = ['1 1','1','1 2 2']
// const input = ['2 1','1','1 2 2'];
// const input = ['2 4','2','1 2 1','1 2 2','1 2 3','1 2 4']
// const input = ['5 6','1','5 1 1','1 2 2','1 3 4','2 3 1','2 4 11','3 4 6'] // 0 2 3 9 INF;
// const input = ['4 5','1','1 3 2','3 2 4','1 4 2','4 2 1','1 3 5'] // 0 3 2 2

// const input = ['3 2','3','1 3 10','2 1 4'] // INF INF 0;
// const input = ['2 1','2','2 1 1']; // 1 0
// const input = ['4 8','1','1 2 3','2 1 5','4 3 4','2 3 10','1 3 10','2 4 1','3 1 1','1 2 2'] //0 2 7 3
// const input = ['2 4','1','1 2 1','1 2 2','1 2 5','1 2 10'] // 0 1
// const input = ['2 3','2','1 2 1','1 2 1','1 2 1']; //INF 0
// const input = ['3 3','2','2 1 4','2 1 4','2 1 4'] // 4 0 INF
// const input = ['5 8','2','1 2 3','2 1 5','4 3 4','2 3 10','1 3 10','2 4 1','3 1 1','1 2 2'] // 5 0 5 1 INF
// const input = ['4 6','2','3 1 2','1 4 2','4 3 2','3 4 2','2 3 2','2 4 2']; // 4 0 2 2
// const input = ['3 4','2','1 3 5','2 1 9','2 3 3','2 1 10'];  // 9 0 3
// const input = ['12 20','1','1 2 1','1 3 1','1 4 2','1 5 2','1 6 2','1 7 2','1 8 2','1 9 3','1 10 4','1 11 5','2 11 5','3 11 4','4 11 3','5 11 2','6 11 1','7 10 1','8 10 2','9 10 3','10 11 4','1 11 10']; // 0 1 1 2 2 2 2 2 3 3 3 INF;

const input = ['5 8','1','1 2 2','1 3 3','1 4 1','1 5 10','2 4 2','3 4 1','3 5 1','4 5 3'];
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

class Heap{
    constructor(){
        this.heap = [];
    }
    getLeftChildIndex = (parentIndex) => parentIndex*2+1;
    getRightChildIndex = (parentIndex) => parentIndex*2+2;
    getParentIndex = (childIndex) => Math.floor((childIndex-1) / 2);
    insert = (vertex,weight) =>{
         const node = {vertex,weight};
         this.heap.push(node);
         this.heapifyUp();
    }
    heapifyUp = () =>{
        let index = this.heap.length -1;
        const lastNode = this.heap[index];
        while(index > 0){
            const parentIndex = this.getParentIndex(index);
            if(this.heap[parentIndex].weight > lastNode.weight){
               this.heap[index] = this.heap[parentIndex];
               index = parentIndex;
            }else break;
        }
        this.heap[index] = lastNode;
    }
    remove = () =>{
        const length = this.heap.length;
        const rootNode = this.heap[0];
        if(length <= 0) return undefined;
        if(length === 1) this.heap = [];
        else{
            this.heap[0] = this.heap.pop();
            this.heapifyDown();
        }
        return rootNode;
    }
    heapifyDown = () =>{
        let index = 0;
        const rootNode = this.heap[index];
        while(this.getLeftChildIndex(index) < this.heap.length){
            const leftChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);
            const smallerChildIndex = this.heap[rightChildIndex] && this.heap[rightChildIndex].weight < this.heap[leftChildIndex].weight
               ? rightChildIndex : leftChildIndex;
            if(rootNode.weight >= this.heap[smallerChildIndex].weight){
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
    enqueue = (vertex,weight) => this.insert(vertex,weight);
    dequeue = () => this.remove();
    isEmpty = () => this.heap.length <= 0;
}
const dijkstra = (start,edge) =>{
    const dist = Array(edge.length).fill(Infinity);
    dist[start] = 0;
    const priorityQueue = new PriorityQueue();
    priorityQueue.enqueue(start,0);
    
    while(!priorityQueue.isEmpty()){
        const cur = priorityQueue.dequeue();
        if(cur === undefined) continue;
        if(cur.weight > dist[cur.vertex]) continue;
        for(let i=0; i<edge[cur.vertex].length; i++){
            const next = edge[cur.vertex][i];
            if(dist[next.v] > next.w + cur.weight){
                dist[next.v] = next.w +cur.weight;
                priorityQueue.enqueue(next.v,dist[next.v]);
            }
        }
    }
    return dist;
}
const solution = input =>{
    const [V,E] = input[0].split(' ').map(Number);
    const start = +input[1];
    const edge = Array.from({length:V+1},()=>[]);
    for(let i=2; i<2+E; i++){
        const [u,v,w] = input[i].split(' ').map(Number);
        edge[u].push({v,w});
    }
    const dist = dijkstra(start,edge);
    let answer = '';
    for(let i=1; i<dist.length; i++){
        if(dist[i] === Infinity) answer+='INF\n';
        else answer+=`${dist[i]}\n`;
    }
    console.log(answer.trim());
}
solution(input);