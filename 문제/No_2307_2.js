// const input = ['6 7','1 2 1','1 4 3','3 6 1','4 5 1','2 3 2','3 4 1','5 6 2'];
// const input = ['8 11','1 2 1','1 5 8','1 7 9','2 5 2','3 4 4','3 6 3','3 8 5','4 6 10','4 8 11','5 6 6','5 7 7']

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class PriorityQueue{
    constructor(){ // min Heap;
        this.queue = [];
    }
    push = (to,time) =>{
        this.queue.push({to,time});
        this.up();
    }
    up = () =>{
        let i = this.queue.length -1;
        const inserted = this.queue[i];
        while( i > 0){
            const parent = Math.floor((i-1)/2);
            if(this.queue[parent].time > inserted.time){
                this.queue[i] = this.queue[parent];
                i = parent;
            }else break;
        }
        this.queue[i] = inserted;
    }
    pop = () =>{
        const first = this.queue[0];
        if(this.queue.length <= 0) return undefined;
        if(this.queue.length === 1) this.queue = [];
        else{
            this.queue[0] = this.queue.pop();
            this.down();
        }
        return first;
    }
    down = () =>{
        let i = 0;
        const first = this.queue[0];
        while( (i*2+1) < this.queue.length){
            const leftChild = i*2 + 1;
            const rightChild = i*2 + 2;
            const smallerChild = this.queue[rightChild] && this.queue[rightChild].time < this.queue[leftChild].time
             ? rightChild : leftChild;
            if(this.queue[smallerChild].time <= first.time){
                this.queue[i] = this.queue[smallerChild];
                i = smallerChild;
            }else break;
        }
        this.queue[i] = first;
    }
    isEmpty = () => this.queue.length <= 0;
}
const dijkstra = (edge,checkPath = null) => {
    const times = Array(edge.length).fill(Infinity);
    let path ;
    if(!checkPath) path = Array(edge.length);
    times[1] = 0;
    const pq = new PriorityQueue();
    pq.push(1,0);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined || times[cur.to] < cur.time) continue;
        for(let i=0; i<edge[cur.to].length; i++){
            const next = edge[cur.to][i];
            const nd = next.time + cur.time;
            if(checkPath && ( (cur.to === checkPath[0] && next.to === checkPath[1]) || (cur.to === checkPath[1] && next.to === checkPath[0]) ) ) continue;
            if(times[next.to] > nd){
                times[next.to] = nd;
                pq.push(next.to,nd);
                if(!checkPath) path[next.to] = cur.to;
            }
        }
    }
    if(!checkPath){
        const pathArr = [edge.length-1];
        let pre = path[edge.length-1];
        while(pre){
            pathArr.push(pre);
            pre = path[pre];
        }
        return [times[times.length-1],pathArr.reverse()];
    }
    return times[times.length-1];
}
const solution = input =>{
    const [N,M] = input[0].split(' ').map(Number);
    const edge = Array.from({length:N+1},()=>[]);
    for(let i=1; i<1+M; i++){
        const [from,to,time] = input[i].split(' ').map(Number);
        edge[from].push({to,time});
        edge[to].push({to:from,time});
    }
    const [escapeTime,checkPath] = dijkstra(edge);
    let maxDelayTime = 0;
    for(let i=0; i<checkPath.length-1; i++){
        const time = dijkstra(edge,[checkPath[i],checkPath[i+1]]);
        if(time === Infinity) return console.log(-1);
        const delayTime = time - escapeTime;
        maxDelayTime = Math.max(maxDelayTime,delayTime);
    }
    console.log(maxDelayTime);
}
solution(input);