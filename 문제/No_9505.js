const input = ['2','6 3 3','A 1','B 2','C 3','D 4','F 5','G 6','ABC','FEC','DBG','2 6 3','A 100','B 1000','BBBBBB','AAAAEB','BBBBBB']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class PriorityQueue{
    constructor(){
        this.queue = [];
    }
    push = (to,time) =>{
        this.queue.push({to,time});
        this.up();
    }
    up = () =>{
        let index = this.queue.length -1;
        const inserted = this.queue[index];
        while(index > 0){
            const parent = Math.floor((index-1) /2);
            if(this.queue[parent].time > inserted.time){
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
            const smallerChild = this.queue[rightChild] && this.queue[rightChild].time < this.queue[leftChild].time
             ?  rightChild : leftChild;
            if(this.queue[smallerChild].time <= root.time){
                this.queue[index] = this.queue[smallerChild];
                index = smallerChild;
            }else break;
        }
        this.queue[index] = root;
    }
    isEmpty = () => this.queue.length <=0;
}
const dijkstra = (enterprise,timeMap,map) =>{
    const [h,w] = [map.length, map[0].length];
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<h && x<w);
    const times = Array.from({length:h},()=>Array(w).fill(Infinity));
    const [sy,sx] = enterprise;
    const pq = new PriorityQueue();
    times[sy][sx] = 0;
    pq.push([sy,sx],0);
    let min = Infinity;
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined) continue;
        const [y,x] = cur.to;
        if(cur.time > times[y][x]) continue;
        if(y === 0 || y === h-1 || x === 0 || x === w-1){
            min = Math.min(min , times[y][x]);
        }
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx)) continue;
            const enemy = map[ny][nx];
            const clearTime = timeMap.get(enemy);
            if(times[ny][nx] > cur.time + clearTime){
                times[ny][nx] = cur.time + clearTime;
                pq.push([ny,nx],times[ny][nx]);
            }
        }
    }
    return min;
}
const solution = input =>{
    let idx = 0;
    let T = +input[idx++];
    let answer = '';
    while(T--){
        let [K,W,H] = input[idx++].split(' ').map(Number);
        let timeMap = new Map();
        while(K--){
            const [clingOn,time] = input[idx++].split(' ');
            timeMap.set(clingOn,+time);
        }
        const map = Array.from({length:H},() => input[idx++]);
        let enterprise ;
        for(let y=0; y<H; y++){
            for(let x=0; x<W; x++){
                if(map[y][x] ==='E'){
                    enterprise =[y,x];
                    break;
                }
            }
        }
        const time = dijkstra(enterprise,timeMap,map);
        answer +=`${time}\n`;
    }
    console.log(answer.trim());
}
solution(input);
// console.log( (1 - Math.pow(0.995,281)) * 178)
// console.log('A'.charCodeAt() - 'B'.charCodeAt());
console.log('Z'.charCodeAt()-65);
console.log('z'.charCodeAt()-71)
