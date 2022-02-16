// const input = ['4','1 1 1 1','1 1 1 1','1 1 1 1','1 1 1 1'];
const input = ['3','3 4 3','2 5 2','5 2 2']
// const fs =require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class Heap{
    constructor(){
        this.heap = [];
    }
    insert = (to,slope) =>{
        this.heap.push({to,slope});
        this.heapifyUp();
    }
    heapifyUp = () =>{
        let index = this.heap.length - 1;
        const lastNode = this.heap[index];
        while(index > 0){
            const parentIdx = Math.floor((index-1) / 2);
            if(this.heap[parentIdx].slope > lastNode.slope){
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
             const smallerChildIdx = this.heap[rightChildIdx] && this.heap[rightChildIdx].slope < this.heap[leftChildIdx].slope
               ? rightChildIdx : leftChildIdx;
            if(this.heap[smallerChildIdx].slope <= rootNode.slope){
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
    push = (to,slope) => this.insert(to,slope);
    pop = () => this.remove();
    isEmpty = () => this.heap.length <= 0;
}
const dijkstra = map =>{
    const n = map.length;
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const slope = Array.from({length:n},()=>Array(n).fill(Infinity));
    const pq = new PriorityQueue();
    slope[0][0] = 0;
    pq.push([0,0],0);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined || cur.slope > slope[cur.to[0]][cur.to[1]]) continue;
        for(let i=0; i<4; i++){
            const [y,x] = cur.to;
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= n || nx >= n ) continue;
            const ns = Math.abs(map[y][x] - map[ny][nx]);
            if(slope[ny][nx] > cur.slope){
                slope[ny][nx] = Math.max(ns,cur.slope);
                pq.push([ny,nx],slope[ny][nx]);
            }
        }
    }
    return slope[n-1][n-1];
}
const solution = input =>{
    const N = +input[0];
    const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    const answer = dijkstra(map);
    console.log(answer);
}
solution(input);