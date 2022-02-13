const input = ['2','6 7','1 2 4','1 3 1','1 5 2','2 3 2','3 4 3','4 5 2','6 5 1','2','3 5','4 5','1 2 2','1 3 1','2 3 2','2 4 3','3 4 6','2','3 4']
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
            const parentIndex = Math.floor((index-1)/2);
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
const dijkstra = (start,friends,edge) =>{
    let totalDistance = 0;
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
    friends.forEach(friend => totalDistance+=dist[friend]);
    return totalDistance
}
const solution = input =>{
    let idx = 0;
    let T = +input[idx++];
    let answer = '';
    while(T--){
        let [N,M] = input[idx++].split(' ').map(Number);
        const edge = Array.from({length:N+1},()=>[]);
        while(M--){
            const [from,to,distance] = input[idx++].split(' ').map(Number);
            edge[from].push({to,distance});
            edge[to].push({to:from,distance});
        }
        const K = input[idx++];
        const friends = input[idx++].split(' ').map(Number);
        let room = {number:null,distance:Infinity};
        for(let i=1; i<=N; i++){
            const totalDistance = dijkstra(i,friends,edge);
            if(room.distance > totalDistance){
                room.distance = totalDistance;
                room.number = i;
            }
        }
        answer +=`${room.number}\n`;
    }
    console.log(answer.trim());
}
solution(input);