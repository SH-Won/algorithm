const input = ['8 13 4 9','1 4 7 3 10 2 15 1','1 2 3','3 4 2','5 6 6','7 8 2','2 3 4','6 7 2','3 6 1','4 8 3','5 1 6','8 3 5','2 5 4','4 6 3','5 3 8']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

class PriorityQueue{
    constructor(){
        this.queue = [];
    }
    push = (to,distance) =>{
        this.queue.push({to,distance});
        this.up();
    }
    up = () =>{
        let index = this.queue.length -1;
        const inserted = this.queue[index];
        while(index > 0){
            const parent = Math.floor((index-1) /2);
            if(this.queue[parent].distance > inserted.distance){
                this.queue[index] = this.queue[parent];
                index = parent;
            }else break;
        }
        this.queue[index] = inserted;
    }
    pop = () =>{
        const root = this.queue[0];
        if(this.queue.length <= 0) return undefined;
        if(this.queue.length === 1) this.queue = [];
        else{
            this.queue[0] = this.queue.pop();
            this.down();
        }
        return root;
    }
    down = () =>{
        let index = 0;
        const root = this.queue[index];
        while((index*2 + 1) <this.queue.length){
            const leftChild = index*2 + 1;
            const rightChild = index*2 + 2;
            const smallerChild = this.queue[rightChild] && this.queue[rightChild].distance < this.queue[leftChild].distance
             ?  rightChild : leftChild;
            if(this.queue[smallerChild].distance <= root.distance){
                this.queue[index] = this.queue[smallerChild];
                index = smallerChild;
            }else break;
        }
        this.queue[index] = root;
    }
    isEmpty = () => this.queue.length <=0;
}
const dijkstra = (start,height,edge) =>{
    const dist = Array(edge.length).fill(Infinity);
    const pq = new PriorityQueue();
    pq.push(start,0);
    dist[start] = 0;
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined || cur.distance > dist[cur.to]) continue;
        for(let i=0; i<edge[cur.to].length; i++){
            const next = edge[cur.to][i];
            if(height[next.to-1] <= height[cur.to-1]) continue;
            const nd = cur.distance + next.distance;
            if(dist[next.to] > nd){
                dist[next.to] = nd;
                pq.push(next.to, nd);
            }
        }
    }
    return dist;
}

const solution = input =>{
    const [N,M,D,E] = input[0].split(' ').map(Number);
    const h = input[1].split(' ').map(Number);
    const edge = Array.from({length:N+1},()=>[]);
    for(let i=2; i<2+M; i++){
        const [from,to,distance] = input[i].split(' ').map(Number);
        edge[from].push({to,distance});
        edge[to].push({to:from,distance});
    }
    const start = dijkstra(1,h,edge);
    const end = dijkstra(N,h,edge);
    let max = -Infinity;
    for(let i=2; i<N; i++){
        if(start[i] === Infinity || end[i] === Infinity) continue;
        const acheivement = h[i-1] * E;
        const hp = (start[i] + end[i]) *D;
        max = Math.max(max,acheivement - hp);
    }
    // console.log(start);
    // console.log(end);
    max === -Infinity ? console.log('Impossible') : console.log(max);
}
solution(input);