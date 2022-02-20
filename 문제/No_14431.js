// console.log(Math.sqrt((6000**2 + 6000**2)) >> 0)
// const input = ['1 2 5 4','2','4 1','6 2']
// const input = ['1 2 5 4','0']
const fs = require('fs');
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
const getPrime = () =>{
    const max = Math.sqrt(6000**2 + 6000**2) >> 0;
    let arr = Array(max+1).fill(true).fill(false,0,2);
    for(let i=2; i*i <= max; i++){
        if(arr[i]){
            for(let j=i*i; j<=max; j+=i){
                arr[j] = false;
            }
        }
    }
    return arr;
}
const dijkstra = (village,prime) =>{
    const [X1,Y1] = village[0];
    const dist = Array(village.length).fill(Infinity);
    const pq = new PriorityQueue();
    dist[0] = 0;
    pq.push([X1,Y1,0],0);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined) continue;
        const [X1,Y1,idx] = cur.to;
        if(cur.distance > dist[idx]) continue;
        for(let i=0; i<village.length; i++){
            const [X2,Y2,idx2] = village[i];
            const d = Math.sqrt(Math.abs(X1-X2)**2 + Math.abs(Y1-Y2)**2) >> 0;
            if(!prime[d]) continue;
            if(dist[idx2] > cur.distance + d){
                dist[idx2] = cur.distance + d;
                pq.push([X2,Y2,idx2],dist[idx2]);
            }
        }
    }
    return dist[dist.length-1];
}
const solution = input =>{
    const [X1,Y1,X2,Y2] = input[0].split(' ').map(Number);
    const N = +input[1];
    const village = Array.from({length:N+1},(_,i)=>{
        if(i === 0) return [X1,Y1,i];
        return [...input[i+1].split(' ').map(Number),i];
    });
    village.push([X2,Y2,N+1]);
    const prime = getPrime();
    const answer = dijkstra(village,prime);
    answer === Infinity ? console.log(-1) : console.log(answer);
}
solution(input);