// const input = ['2','3 100 3','1 2 1 1','2 3 1 1','1 3 3 30','4 10 4','1 2 5 3','2 3 5 4','3 4 1 5','1 3 10 6']
// const input = ['1','6 149 8','1 2 60 20','2 3 30 70','1 3 100 80','1 3 20 180','3 4 20 100','3 5 150 20','5 6 50 40','4 6 30 50']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class PriorityQueue{
    constructor(){
        this.queue = [];
    }
    push = (to,distance,cost) =>{
        this.queue.push({to,distance,cost});
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
const dijkstra = (edge,M) =>{
    const dist = Array.from({length:edge.length},()=>Array(M+1).fill(Infinity));
    const pq = new PriorityQueue();
    dist[0].fill(0);
    pq.push(1,0,0);
    let min ;
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined || cur.distance > dist[cur.to][cur.cost] ) continue;
        if(cur.to === dist.length-1){
            min = cur.distance;
            break;
        }
        for(let i=0; i<edge[cur.to].length; i++){
            const next = edge[cur.to][i];
            const [nc,nd] = [cur.cost+next.cost , cur.distance+ next.distance];
            if(nc > M) continue;
            if(dist[next.to][nc] > nd){
                // 만약 비용이 30 일때 이미 next.to 에도달하는데 10초가 걸렸다면
                // 비용이 40일때 next.to 에 도달하더라도 9초 8초 와 같이 더 빨리 도달하지 않을경우는
                // queue 에 추가하지 않기위해 for 문을 사용
                for(let i=nc; i<=M; i++){
                    if(dist[next.to][i] > nd) dist[next.to][i] = nd;
                }
                pq.push(next.to,nd,nc);
            }
        }
    }
    return min;
}

const solution = input =>{
    let idx = 0;
    let T = +input[idx++];
    let answer = ''
    while(T--){
        let [N,M,K] = input[idx++].split(' ').map(Number);
        const edge = Array.from({length:N+1},()=>[]);
        while(K--){
            const [from,to,cost,distance] = input[idx++].split(' ').map(Number);
            edge[from].push({to,distance,cost});
        }
        const time = dijkstra(edge,M);
        time === undefined ? answer+='Poor KCM\n' : answer+=`${time}\n` 
    }
    console.log(answer.trim())
}
solution(input);