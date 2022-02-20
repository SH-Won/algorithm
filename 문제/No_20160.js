// const input = ['5 5','1 2 1','1 4 1','2 3 1','2 3 1','3 4 1','1 2 3 4 5 1 2 3 4 5','5']
// const input = ['6 5','1 2 1','2 3 10','3 4 100','4 5 1000','5 6 10000','1 2 1 2 1 2 6 5 4 3','6']
// const input = ['11 15','6 1 76','4 3 715','7 6 89','11 5 55','7 9 847','8 5 663','3 4 961','2 8 638','1 9 839','3 7 723','6 1 398','3 2 84','8 1 159','10 3 943','6 4 556','1 2 3 4 5 6 7 8 9 10','10']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

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
const dijkstra = (start,end,edge,startTime) =>{
    const times = Array(edge.length).fill(Infinity);
    const pq = new PriorityQueue();
    times[start] = startTime;
    pq.push(start,startTime);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined || cur.time > times[cur.to]) continue;
        for(let i=0; i<edge[cur.to].length; i++){
            const next = edge[cur.to][i];
            const nt = next.time + cur.time;
            if(times[next.to] > nt) {
                times[next.to] = nt;
                pq.push(next.to, nt);
            }
        }
    } 
    if(end) return times[end];
    return times;
}
const solution = input =>{
    const [V,E] = input[0].split(' ').map(Number);
    const edge = Array.from({length:V+1},()=>[]);
    const yogurt = input[1+E].split(' ').map(Number);
    const me = +input[2+E];
    for(let i=1; i<1+E; i++){
        const [from,to,time] = input[i].split(' ').map(Number);
        edge[from].push({to,time});
        edge[to].push({to:from, time});
    }
    const myTime = dijkstra(me,0,edge,0);
    let answer =Infinity;
    let time = 0 , yogurtMom = yogurt[0];
    if(yogurt[0] === me) answer = yogurtMom;
    for(let i=1; i<yogurt.length; i++){
        const curTime = dijkstra(yogurtMom,yogurt[i],edge,time);
        if(curTime === Infinity) continue;
        if(curTime >= myTime[yogurt[i]] && answer > yogurt[i]) answer = yogurt[i];
        time = curTime;
        yogurtMom = yogurt[i];
    }
    answer === Infinity ? console.log(-1) : console.log(answer);
}
solution(input);