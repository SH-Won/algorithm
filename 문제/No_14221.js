const input = ['6 9','1 4 1','1 5 2','1 6 3','2 4 2','2 5 3','2 6 1','3 4 3','3 5 1','3 6 2','3 3','1 2 3','4 5 6']
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
const dijkstra = (store,edge) => {
    const dist = Array(edge.length).fill(Infinity);
    const pq = new PriorityQueue();
    store.forEach(vertex => (dist[vertex] = 0, pq.push(vertex,0)));
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined || cur.distance > dist[cur.to]) continue;
        for(let i=0; i<edge[cur.to].length; i++){
            const next = edge[cur.to][i];
            const nd = next.distance + cur.distance;
            if(dist[next.to] > nd){
                dist[next.to] = nd;
                pq.push(next.to ,nd);
            }
        }
    }
    return dist;
}
const solution = input => {
    const [n,m] = input[0].split(' ').map(Number);
    const [p,q] = input[m+1].split(' ').map(Number);
    const house = input[m+2].split(' ').map(Number);
    const store = input[m+3].split(' ').map(Number);
    const edge = Array.from({length:n+1},()=>[]);
    for(let i=1; i<m+1; i++){
        const [from,to,distance] = input[i].split(' ').map(Number);
        edge[from].push({to, distance});
        edge[to].push({to:from, distance});
    }
    const dist = dijkstra(store,edge);
    let answer , min = Infinity;
    for(let i=0; i<house.length; i++){
        const h = house[i];
        if(min > dist[h]){
            min = dist[h];
            answer = h;
        }
        else if(min === dist[h] && answer > h){
            answer = h;
        }
    }
    console.log(answer);
}
solution(input);