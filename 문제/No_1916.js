// const input = ['5','8','1 2 2','1 3 3','1 4 1','1 5 10','2 4 2','3 4 1','3 5 1','4 5 3','1 5']
// const input = [
// '7',
// '12',
// '1 2 7',
// '1 5 3',
// '1 6 10',
// '5 2 2',
// '2 6 6',
// '2 3 4',
// '2 4 10',
// '5 7 5',
// '5 4 11',
// '3 4 2',
// '6 4 9',
// '7 4 4',
// '1 2'
// ]   // '1 4' ans 11 '1 2' ans 5 '1 3' ans 9
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

class Heap{
    constructor(){
        this.heap = [];
    }
    insert = (end,cost) =>{
        const node = {end,cost};
        this.heap.push(node);
        this.heapifyUp();
    }
    heapifyUp = () =>{
        let index = this.heap.length -1;
        const insertedNode = this.heap[index]; 
        while(index > 0){
            const parentIndex = Math.floor( (index-1) / 2);
            if(this.heap[parentIndex].cost > insertedNode.cost){
                this.heap[index] = this.heap[parentIndex];
                index = parentIndex;
            }else break;
        }
        this.heap[index] = insertedNode;
    }
    remove = () =>{
        const length = this.heap.length;
        const rootNode = this.heap[0];
        if(length <=0 ) return undefined;
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
        while( (index*2 + 1) < this.heap.length){
            const leftChildIndex = index*2 + 1;
            const rightChildIndex = index*2 + 2;
            const smallerChildIndex = this.heap[rightChildIndex] && this.heap[rightChildIndex].cost > this.heap[leftChildIndex].cost
            ? rightChildIndex : leftChildIndex;
            if(this.heap[smallerChildIndex].cost <= rootNode.cost){
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
    push = (end,cost) => this.insert(end,cost);
    pop = () => this.remove();
    isEmpty = () => this.heap.length <= 0;
}
const dijkstra = (start,end,edge) =>{
    const dist = Array(edge.length).fill(Infinity);
    dist[start] = 0;
    const pq = new PriorityQueue();
    pq.push(start,0);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined) continue;
        if(cur.cost > dist[cur.end]) continue;
        for(let i=0; i<edge[cur.end].length; i++){
            const next = edge[cur.end][i];
            if(dist[next.end] > next.cost + cur.cost){
                dist[next.end] = next.cost + cur.cost;
                pq.push(next.end,dist[next.end]);
            }
        }
    }
    return dist[end];
}
const solution = input =>{
    const N = +input[0];
    const M = +input[1];
    const [start,end] = input[2+M].split(' ').map(Number);
    const edge = Array.from({length:N+1},()=>[]);
    for(let i=2; i<2+M; i++){
        const [start,end,cost] = input[i].split(' ').map(Number);
        edge[start].push({end,cost});
    }
    const answer = dijkstra(start,end,edge);
    console.log(answer);
}
solution(input);