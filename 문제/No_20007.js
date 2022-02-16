const input = ['5 6 21 0','0 1 6','0 2 3','0 3 10','1 2 2','2 4 7','3 4 8']
// const input = ['6 5 10 4','0 4 6','0 5 2','1 3 1','1 5 8','2 3 1'];
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
            const parentIdx = Math.floor((index - 1) / 2);
            if(this.heap[parentIdx].distance > lastNode.distance){
                this.heap[index] = this.heap[parentIdx];
                index = parentIdx;
            }else break;
        }
        this.heap[index] = lastNode;
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
        while((index*2+1) < this.heap.length){
            const leftChildIdx = index*2 + 1;
            const rightChildIdx = index*2 + 2;
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
const dijkstra = (X,Y,edge) =>{
    const dist = Array(edge.length).fill(Infinity);
    dist[Y] = 0;
    const pq = new PriorityQueue();
    pq.push(Y,0);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined || cur.distance > dist[cur.to]) continue;
        for(let i=0; i<edge[cur.to].length; i++){
            const next = edge[cur.to][i];
            const nd = next.distance + cur.distance;
            if(dist[next.to] > nd){
                dist[next.to] = nd;
                pq.push(next.to , nd);
            }
        }
    }
    let sum = X;
    let days = 1;
    dist.sort((a,b) => a-b);
    if(dist[dist.length-1]*2 > X) return -1;
    for(let i=0; i<dist.length; i++){
        if(dist[i]*2 <= sum){
            sum -=(dist[i]*2);
        }
        else{
            sum = X;
            sum -= (dist[i]*2);
            days++;
        }
    }
    return days;
}
const solution = input =>{
    const [N,M,X,Y] = input[0].split(' ').map(Number);
    const edge = Array.from({length:N},()=>[]);
    for(let i=1; i<1+M; i++){
        const [from,to,distance] = input[i].split(' ').map(Number);
        edge[from].push({to,distance});
        edge[to].push({to:from,distance});
    }
    const answer = dijkstra(X,Y,edge);
    console.log(answer);
}
solution(input);