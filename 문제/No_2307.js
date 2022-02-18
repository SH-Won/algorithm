// const input = ['6 7','1 2 1','1 4 3','3 6 1','4 5 1','2 3 2','3 4 1','5 6 2'];
// const input = ['8 11','1 2 1','1 5 8','1 7 9','2 5 2','3 4 4','3 6 3','3 8 5','4 6 10','4 8 11','5 6 6','5 7 7']
const fs =require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

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
const dijkstra = (edge,checkPath=null) =>{
    const dist = Array(edge.length).fill(Infinity);
    let path ;
    if(checkPath === null) path = Array(edge.length);
    const pq = new PriorityQueue();
    dist[1] = 0;
    pq.push(1,0);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined || cur.distance > dist[cur.to]) continue;
        for(let i=0; i<edge[cur.to].length; i++){
            const next = edge[cur.to][i];
            const nd = next.distance + cur.distance;
            if(checkPath !==null && ( (cur.to === checkPath[0] && next.to === checkPath[1]) || (cur.to === checkPath[1] && next.to === checkPath[0]) )) continue;
            if(dist[next.to] > nd){
                dist[next.to] = nd;
                pq.push(next.to, nd);
                if(checkPath === null) path[next.to] = cur.to;
            }
        }
    }
    if(checkPath === null){
        let pathArr = [dist.length-1];
        let pre = pathArr[pathArr.length-1];
        while(path[pre] !== 1){
            pathArr.push(path[pre]);
            pre = pathArr[pathArr.length-1];
        }
        pathArr.push(1);
        return [dist[dist.length-1],pathArr];
    }
    return dist[dist.length-1];
}

const solution = input =>{
    const [N,M] = input[0].split(' ').map(Number);
    const edge = Array.from({length:N+1},()=>[]);
    for(let i=1; i<1+M; i++){
        const [from,to,distance] = input[i].split(' ').map(Number);
        edge[from].push({to,distance});
        edge[to].push({to:from, distance});
    }
    const [minDist,path] = dijkstra(edge);
    let max = 0;
    for(let i=0; i<path.length-1; i++){
        const checkPath = [path[i],path[i+1]];
        const dist = dijkstra(edge,checkPath);
        if(dist === Infinity) return console.log(-1);
        if(dist-minDist > max){
            max = dist-minDist;
        }
    }
    console.log(max);
}
solution(input);