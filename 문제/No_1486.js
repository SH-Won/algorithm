// const input = ['6 6 6 36','AABCDE','GJIHGF','MKLMNO','STSRQP','YUVWXY','edcbaZ']
// const input = ['2 2 3 10000','AD','JG']
// const input = ['2 2 3 29','AD','JG']
// const input = ['7 4 5 14','BCDE','AJKF','AIHG','AAAA','AOMK','AQSI','ACEG']
// const input = ['7 4 5 57','BCDE','AJKF','AIHG','AAAA','AOMK','AQSI','ACEG']
// const input = ['1 7 3 1000','ABCDEFK']
const input = ['8 9 4 50','TRRVUXefk','bSNMOWcff','bRPNNQZip','XSRUTVcfj','WbZQPXZbV','XdYSRWVOP','feedVVcZR','XhfdZZefg']
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
const dijkstra = (start,times,map,T,D) =>{
    const [sy,sx] = start;
    const [n,m] = [map.length, map[0].length];
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<n && x<m);
    const pq = new PriorityQueue();
    times[sy][sx][sy][sx] = 0;
    pq.push([sy,sx],0);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined ) continue;
        const [y,x] = cur.to;
        if(cur.time > times[sy][sx][y][x]) continue;
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx)) continue;
            const diff = Math.abs(map[y][x] - map[ny][nx]);
            if(diff > T) continue;
            const nt = map[ny][nx] <= map[y][x] ? 1+cur.time : diff**2 + cur.time;
            if(nt <= D && times[sy][sx][ny][nx] > nt){
                times[sy][sx][ny][nx]= nt;
                pq.push([ny,nx],nt);
            }
        }
    }
}
const solution = input =>{
    const [N,M,T,D] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i)=> input[i+1].split('').map(el => el < 'a' ? el.charCodeAt()-65 : el.charCodeAt()-71));
    const times = Array.from({length:N},()=>Array.from({length:M},()=>Array.from({length:N},()=>Array(M).fill(Infinity))))
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++) dijkstra([y,x],times,map,T,D);
    }
    let maxHeight = 0;
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            if(times[0][0][y][x] + times[y][x][0][0] <= D && map[y][x] > maxHeight){
                maxHeight = map[y][x];
            }
        }
    }
    
    console.log(maxHeight);
}
solution(input);