const input = ['3 4','1 2 1','3 2 1','1 3 5','2 3 2']
// const fs =require('fs');
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
        let i = this.queue.length - 1;
        const inserted = this.queue[i];
        while(i > 0){
            const parent = Math.floor((i-1)/2);
            if(this.queue[parent].distance > inserted.distance){
                this.queue[i] = this.queue[parent];
                i = parent;
            }else break;
        }
        this.queue[i] = inserted;
    }
    pop = () =>{
        const root = this.queue[0];
        if(this.queue.length <=0) return undefined;
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
        while((i*2 + 1) < this.queue.length){
            const leftChild = i*2 + 1;
            const rightChild = i*2 + 2;
            const smallerChild = this.queue[rightChild] && this.queue[rightChild].distance < this.queue[leftChild].distance 
            ? rightChild : leftChild;
            if(this.queue[smallerChild].distance <= root.distance){
                this.queue[i] = this.queue[smallerChild];
                i = smallerChild;
            }else break;
        }
        this.queue[i] = root;
    }
    isEmpty = () => this.queue.length <= 0;
}
const dijkstra = (start,edge,dist) =>{
    const pq = new PriorityQueue();
    dist[start][start] = 0;
    pq.push(start,0);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined || cur.distance > dist[start][cur.to]) continue;
        for(let i=0; i<edge[cur.to].length; i++){
            const next = edge[cur.to][i];
            const nd = next.distance + cur.distance;
            if(dist[start][next.to] > nd){
                dist[start][next.to] = nd;
                pq.push(next.to , nd);
            }
        }
    }
}
const solution = input =>{
    const [V,E] = input[0].split(' ').map(Number);
    const edge = Array.from({length:V+1},()=>[]);
    const dist = Array.from({length:V+1},()=>Array(V+1).fill(Infinity));
    for(let i=1; i<1+E; i++){
        const [from,to,distance] = input[i].split(' ').map(Number);
        edge[from].push({to,distance});
    }
    for(let start=1; start<=V; start++){
        dijkstra(start,edge,dist);
    }
    let minDistance = Infinity;
    for(let i=1; i<=V; i++){
        for(let j=1; j<=V; j++){
            if(j === i) continue;
            const curDist = dist[i][j] + dist[j][i];
            if(curDist !==Infinity && curDist < minDistance) minDistance = curDist;
        }
    }
    minDistance === Infinity ? console.log(-1) : console.log(minDistance);
}
solution(input);