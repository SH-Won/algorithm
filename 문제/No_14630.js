const input = ['3','11','33','55','1 3']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class PriorityQueue{
    constructor(){
        this.queue = [];
    }
    push = (state,cost) =>{
        this.queue.push({state,cost});
        this.up();
    }
    up = () =>{
        let i = this.queue.length -1;
        const last = this.queue[i];
        while( i > 0){
            const parent = Math.floor((i-1) / 2);
            if(this.queue[parent].cost > last.cost){
                this.queue[i] = this.queue[parent];
                i = parent;
            }else break;
        }
        this.queue[i] = last;
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
        while((i*2+1) < this.queue.length){
            const leftChild = i*2 +1;
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
const dijkstra = (start,end,state) =>{
    const costs = Array(state.length).fill(Infinity);
    const pq = new PriorityQueue();
    costs[start] = 0;
    pq.push(start,0);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined || cur.cost > costs[cur.state]) continue;
        for(let i=0; i<state.length; i++){
            if(i === cur.state) continue;
            const nextState = state[i];
            let nextCost = cur.cost;
            for(let j=0; j<nextState.length; j++){
                nextCost += Math.abs(nextState[j] - state[cur.state][j]) ** 2;
            }
            if(costs[i] > nextCost){
                costs[i] = nextCost;
                pq.push(i,nextCost);
            }
        }
    }
    return costs[end];
}
const solution = input =>{
    const N = +input[0];
    const state = Array.from({length:N},(_,i)=>input[i+1]);
    const [start,end] = input[N+1].split(' ').map(num => +num -1);
    const answer = dijkstra(start,end,state);
    console.log(answer);
}
solution(input);