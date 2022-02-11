const input = ['4 6','1 2 3','2 3 3','3 4 1','1 3 5','2 4 5','1 4 4','2 3']
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
            if(this.heap[parentIndex].distance > insertedNode.distance) {
                this.heap[index] = this.heap[parentIndex];
                index = parentIndex;
            } else break;
        }
        this.heap[index] = insertedNode;
    }
    remove = () =>{
        const rootNode = this.heap[0];
        if(this.heap.length <= 0 ) return undefined;
        if(this.heap.length === 1) this.heap =[];
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
            const leftChildIndex = index*2 +1;
            const rightChildIndex = index*2 +2;
            const smallerChildIndex = this.heap[rightChildIndex] && this.heap[rightChildIndex].distance < this.heap[leftChildIndex].distance 
               ? rightChildIndex : leftChildIndex;
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
const dijkstra = (start,end,edge) =>{
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
            const nd = next.distance + cur.distance;
            if(dist[next.to] > nd){
                dist[next.to] = nd;
                pq.push(next.to,nd);
            }
        }
    }
    return dist[end];
}
const solution = input =>{
    const [N,E] = input[0].split(' ').map(Number);
    const [v1,v2] = input[E+1].split(' ').map(Number);
    const edge = Array.from({length:N+1},()=>[]);
    for(let i=1; i<1+E; i++){
        const [a,b,c] = input[i].split(' ').map(Number);
        edge[a].push({to:b,distance:c});
        edge[b].push({to:a,distance:c});
    }
    const path1 = [1,v1,v2,N];
    const path2 = [1,v2,v1,N];
    let answer1 = 0, answer2 = 0;
    for(let i=0; i<path1.length-1; i++){
        const dist1 = dijkstra(path1[i],path1[i+1],edge);
        const dist2 = dijkstra(path2[i],path2[i+1],edge);
        answer1 += dist1 , answer2 += dist2;
    }
    answer1 === Infinity && answer2 ===Infinity ? console.log(-1) : console.log(Math.min(answer1,answer2));
}
solution(input);
