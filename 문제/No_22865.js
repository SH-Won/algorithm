const input = ['6','1 2 5','8','1 2 1','2 3 4','1 4 2','2 5 3','1 6 5','5 6 2','3 4 2','4 5 6']
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
const dijkstra = (friends,edge) =>{
    const dist = Array(edge.length).fill(Infinity);
    const pq = new PriorityQueue();
    friends.forEach(f => (dist[f] = 0, pq.push(f,0)));
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined || cur.distance > dist[cur.to]) continue;
        for(let i=0; i<edge[cur.to].length; i++){
            const next = edge[cur.to][i];
            const nd = next.distance + cur.distance;
            if(dist[next.to] > nd){
                dist[next.to] = nd;
                pq.push(next.to, nd);
            }
        }
    }
    return dist;
}
const solution = input =>{
    const N = +input[0];
    const friends = input[1].split(' ').map(Number);
    const M = +input[2];
    const edge = Array.from({length:N+1},()=>[]);
    for(let i=3; i<3+M; i++){
        const [from,to,distance] = input[i].split(' ').map(Number);
        edge[from].push({to,distance});
        edge[to].push({to:from,distance});
    }
    const dist = dijkstra(friends,edge);
    let answer , max = 0;
    for(let i=1; i<dist.length; i++){
        if(dist[i] > max){
            max = dist[i];
            answer = i;
        }
    }
    console.log(answer);
}
solution(input);
console.log(1-Math.pow(0.995,274))