// const input = [
// '6 4 1',
// '0100',
// '1110',
// '1000',
// '0000',
// '0111',
// '0000',
// ]
// const input = [
// '6 4 2',
// '0100',
// '1110',
// '1000',
// '0000',
// '0111',
// '0000'
// ]
// const input = [
// '4 4 3',
// '0111',
// '1111',
// '1111',
// '1110'
// ]
// const input = [
//     '4 4 2',
//     '0111',
//     '1000',
//     '0001',
//     '0010'
// ]
// const input = [
//     '4 4 5',
//     '0111',
//     '1111',
//     '1111',
//     '1110'
// ]
// const input = [
//     '6 4 10',
//     '0111',
//     '1011',
//     '1001',
//     '0000',
//     '0011',
//     '0010'
// ]
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class PriorityQueue{
    constructor(){
        this.queue = [];
    }
    push = (pos,time,k) =>{
        this.queue.push({pos,time,k});
        this.up();
    }
    up = () =>{
        let i = this.queue.length - 1;
        const inserted = this.queue[i];
        while(i > 0){
            const parent = Math.floor((i-1)/2);
            if(this.queue[parent].time > inserted.time){
                this.queue[i] = this.queue[parent];
                i = parent
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
        while((i*2 + 1) < this.queue.length){
            const leftChild = i*2 + 1;
            const rightChild = i*2 + 2;
            const smallerChild = this.queue[rightChild] && this.queue[rightChild].time < this.queue[leftChild].time
            ? rightChild : leftChild;
            if(this.queue[smallerChild].time <= root.time){
                this.queue[i] = this.queue[smallerChild];
                i = smallerChild;
            }else break;
        }
        this.queue[i] = root;
    }
    isEmpty = () => this.queue.length <= 0;
}
const dijkstra = (map,k) =>{
    const [N,M] = [map.length, map[0].length];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const times = Array.from({length:N},()=>Array(M).fill(Infinity));
    times[0][0] = 1;
    const pq = new PriorityQueue();
    pq.push([0,0],1,k);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined ) continue;
        const [y,x] = cur.pos;
        // if(cur.time > times[y][x]) continue;
        if(y === N-1 && x === M-1){
            return times[y][x]
        }
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx)) continue;
            if(times[ny][nx] > cur.time + 1){
                if(map[ny][nx] === '0'){
                    times[ny][nx] = cur.time +1 ;
                    pq.push([ny,nx],cur.time+1,cur.k);
                }
                else if(cur.k && map[ny][nx] === '1'){
                    times[ny][nx] = cur.time + 1;
                    pq.push([ny,nx],cur.time+1,cur.k-1);
                }
            }
        }
    }
    return -1;
}
const solution = input =>{
    const [N,M,K] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i)=>input[i+1]);

    const answer= dijkstra(map,K);
    console.log(answer);
}
solution(input);