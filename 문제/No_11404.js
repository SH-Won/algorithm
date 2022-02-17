const input = ['5','14','1 2 2','1 3 3','1 4 1','1 5 10','2 4 2','3 4 1','3 5 1','4 5 3','3 5 10','3 1 8','1 4 2','5 1 7','3 4 2','5 2 4']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class PriorityQueue{
    constructor(){
        this.queue = [];
    }
    push = (to,cost) =>{
        this.queue.push({to,cost});
        this.up();
    }
    up = () =>{
        let i = this.queue.length - 1;
        const inserted = this.queue[i];
        while(i > 0){
            const parent = Math.floor((i-1)/2);
            if(this.queue[parent].cost > inserted.cost){
                this.queue[i] = this.queue[parent];
                i = parent;
            }else break;
        }
        this.queue[i] = inserted;
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
        let i = 0;
        const root = this.queue[i];
        while( (i*2+1) < this.queue.length){
            const leftChild = i*2 + 1;
            const rightChild = i*2 + 2;
            const smallerChild = this.queue[rightChild] && this.queue[rightChild].cost < this.queue[leftChild].cost
             ? rightChild : leftChild;
            if(this.queue[smallerChild].cost <= root.cost){
                this.queue[i] = this.queue[smallerChild];
                i = smallerChild;
            }else break;
        }
        this.queue[i] = root;
    }
    isEmpty = () => this.queue.length <= 0;
}
const dijkstra = (start,edge) =>{
    const costs = Array(edge.length).fill(Infinity);
    costs[start] = 0;
    const pq = new PriorityQueue();
    pq.push(start,0);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined || cur.cost > costs[cur.to]) continue;
        for(let i=0; i<edge[cur.to].length; i++){
            const next = edge[cur.to][i];
            const nc = cur.cost + next.cost;
            if(costs[next.to] > nc){
                costs[next.to] = nc;
                pq.push(next.to , nc);
            }
        }
    }
    return costs.slice(1).map(el =>{
        if(el === Infinity) return 0;
        return el;
    })
}
const solution = input =>{
    const n = +input[0];
    const m = +input[1];
    const edge =Array.from({length:n+1},()=>[]);
    for(let i=2; i<2+m; i++){
        const [from,to,cost] = input[i].split(' ').map(Number);
        edge[from].push({to,cost});
    }
    let answer = '';
    for(let i=1; i<=n; i++){
        answer += `${dijkstra(i,edge).join(' ')}\n`;
    }
    console.log(answer.trim());
}
solution(input);

