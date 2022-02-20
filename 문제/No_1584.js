// const input = ['1','500 0 0 500','1','0 0 0 0']
// const input = ['0','0'];
// const input = ['2','0 0 250 250','250 250 500 500','2','0 251 249 500','251 0 500 249'];
// const input = ['2','0 0 250 250','250 250 500 500','2','0 250 250 500','250 0 500 250']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class PriorityQueue{
    constructor(){
        this.queue = [];
    }
    push = (to,life) =>{
        this.queue.push({to,life});
        this.up();
    }
    up = () =>{
        let index = this.queue.length -1;
        const inserted = this.queue[index];
        while(index > 0){
            const parent = Math.floor((index-1) /2);
            if(this.queue[parent].life > inserted.life){
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
            const smallerChild = this.queue[rightChild] && this.queue[rightChild].life < this.queue[leftChild].life
             ?  rightChild : leftChild;
            if(this.queue[smallerChild].life <= root.life){
                this.queue[index] = this.queue[smallerChild];
                index = smallerChild;
            }else break;
        }
        this.queue[index] = root;
    }
    isEmpty = () => this.queue.length <=0;
}

const dijkstra = (area) =>{
    const lifeCount = Array.from({length:501},()=>Array(501).fill(Infinity));
    const pq = new PriorityQueue();
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<501 && x<501);
    lifeCount[0][0] = 0;
    pq.push([0,0],0);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        const [y,x] = cur.to;
        if(cur === undefined || cur.life > lifeCount[y][x]) continue;
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || area[ny][nx] === 2) continue;
            if(lifeCount[ny][nx] > cur.life + area[ny][nx]){
                lifeCount[ny][nx] = cur.life + area[ny][nx];
                pq.push([ny,nx], lifeCount[ny][nx]);
            }
        }
    }
    return lifeCount[500][500];
}


const solution = () =>{
    let index = 0;
    let map = Array.from({length:501},()=>Array(501).fill(0));
    const N = +input[index++];
    for(let i=0; i<N; i++){
        const [y1,x1,y2,x2] = input[index++].split(' ').map(Number);
        const [minY,minX,maxY,maxX] = [Math.min(y1,y2),Math.min(x1,x2),Math.max(y1,y2),Math.max(x1,x2)];
        for(let y=minY; y<=maxY; y++){
            for(let x=minX; x<=maxX; x++){
                map[y][x] = 1;
            }
        }
    }
    const M = +input[index++];
    for(let i=0; i<M; i++){
        const [y1,x1,y2,x2] = input[index++].split(' ').map(Number);
        const [minY,minX,maxY,maxX] = [Math.min(y1,y2),Math.min(x1,x2),Math.max(y1,y2),Math.max(x1,x2)];
        for(let y=minY; y<=maxY; y++){
            for(let x=minX; x<=maxX; x++){
                map[y][x] = 2;
            }
        }
    }
    const minLifeCount = dijkstra(map);
    minLifeCount === Infinity ? console.log(-1) : console.log(minLifeCount);
}
solution();
