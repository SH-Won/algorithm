//const input = ['5 6','1','5 1 1','1 2 2','2 4 5','2 3 4','3 4 6','1 3 3']
// const input = ['5 8','2','1 2 3','2 1 5','4 3 4','2 3 10','1 3 10','2 4 1','3 1 1','1 2 2']
// const input = ['12 20','1','1 2 1','1 3 1','1 4 2','1 5 2','1 6 2','1 7 2','1 8 2','1 9 3','1 10 4','1 11 5','2 11 5','3 11 4','4 11 3','5 11 2','6 11 1','7 10 1','8 10 2','9 10 3','10 11 4','1 11 10']; // 0 1 1 2 2 2 2 2 3 3 3 INF;
// Min Heap 구현

class Heap{
    constructor(){
        this.heap = [];
    }
    getLeftChildIndex = (parentIndex) => parentIndex*2 +1;
    getRightChildIndex = (parentIndex) => parentIndex*2 + 2;
    getParentIndex = (childIndex) => Math.floor((childIndex-1) /2);
    peek =() => this.heap[0];

    insert = (vertex,value) =>{
        const node = {vertex,value};
        this.heap.push(node);
        this.heapifyUp();
    }
    heapifyUp = () =>{
        let index = this.heap.length -1;
        const lastInsertedNode = this.heap[index];
        while(index > 0){
            const parentIndex =this.getParentIndex(index);
            if(this.heap[parentIndex].value > lastInsertedNode.value){
                this.heap[index] = this.heap[parentIndex];
                index = parentIndex;
            }else break;
        }
        this.heap[index] = lastInsertedNode;
    }
    remove = () =>{
        const count = this.heap.length;
        const rootNode = this.heap[0];
        if(count <= 0) return undefined;
        if(count === 1) this.heap = [];
        else{
            this.heap[0] = this.heap.pop();
            this.heapifyDown();
        }
        return rootNode;
    }
    heapifyDown = () =>{
        let index = 0;
        const count = this.heap.length;
        const rootNode = this.heap[index];
        while(this.getLeftChildIndex(index) < count){
            const leftChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);
            const smallerChildIndex = rightChildIndex < count && this.heap[rightChildIndex].value < this.heap[leftChildIndex].value
              ? rightChildIndex : leftChildIndex;
            if(this.heap[smallerChildIndex].value <= rootNode.value){
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
    enqueue = (vertex,value) => this.insert(vertex,value);
    dequeue = () => this.remove();
    isEmpty = () => this.heap.length <=0;
}

const dijkstra = (edge,start) =>{
    let distance = new Array(edge.length).fill(Infinity);
    const priorityQueue = new PriorityQueue();
    distance[start] = 0;
    priorityQueue.insert(start,0)
    while(!priorityQueue.isEmpty()){
        const cur = priorityQueue.dequeue();
        if(edge[cur.vertex] === undefined) continue;
        if(distance[cur.vertex] < cur.value) continue;
        for(let i=0; i<edge[cur.vertex].length; i++){
            const next = edge[cur.vertex][i];
            if(distance[next.v] > cur.value + next.w){
                distance[next.v] = cur.value + next.w;
                priorityQueue.insert(next.v,distance[next.v])
            }
        }
    }
    return distance;
}

const solution = (input) =>{
    const [V,E] = input[0].split(' ').map(Number);
    const start = +input[1];
    const edge = Array.from({length:V+1},(_,i)=>[]);
    for(let i=2; i<2+E; i++){
        const [u,v,w] = input[i].split(' ').map(Number);
        edge[u].push({v,w});
    }
    let answer =''
    const dist = dijkstra(edge,start);
    for(let i=1; i<dist.length; i++){
        if(dist[i] === Infinity) answer+=`INF\n`;
        else answer+=`${dist[i]}\n`;
    }
    console.log(answer.trim())
}
// solution(input);


