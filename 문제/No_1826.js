// const input = ['4','4 4','5 2','11 5','15 10','25 10']
// const input = ['5','1 5','5 7','6 1','7 10','8 3','20 10']  // 1 
// const input = ['6','5 6','7 8','6 10','11 5','13 2','18 5','30 10'] //3
// const input = ['4','1 2','3 4','7 10','15 2','20 12'] //1
// const input = ['5','3 5','6 4','7 8','11 3','18 5','20 5'] // 3
const input = ['3','10 10','15 20','19 20','30 9'];
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class PriorityQueue{ // max Heap;
    constructor(){
        this.queue = [];
    }
    push = (pos,oil) =>{
        this.queue.push({pos,oil});
        this.up();
    }
    up = () =>{
        let i = this.queue.length - 1;
        const inserted = this.queue[i];
        while( i > 0){
            const parent = Math.floor((i-1)/2);
            if(this.queue[parent].oil < inserted.oil){
                this.queue[i] = this.queue[parent];
                i = parent;
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
        while( (i*2 + 1) < this.queue.length){
            const leftChild = i*2 + 1;
            const rightChild = i*2 + 2;
            const biggerChild = this.queue[rightChild] && this.queue[rightChild].oil > this.queue[leftChild].oil
            ? rightChild : leftChild;
            if(this.queue[biggerChild].oil >= root.oil){
                this.queue[i] = this.queue[biggerChild];
                i = biggerChild;
            }else break;
        }
        this.queue[i] = root;
    }
    isEmpty = () => this.queue.length <= 0;
}
const solution = input =>{
    const N = +input[0];
    const stations = Array.from({length:N},(_,i) => input[i+1].split(' ').map(Number)).sort((a,b) => a[0] - b[0]);
    const [end,oil] = input[N+1].split(' ').map(Number);
    const pq = new PriorityQueue();
    let curPos = 0;
    let remainOil = oil;
    let count = 0;
    let idx = 0;
    while(!pq.isEmpty() || idx < stations.length){
        if(curPos + remainOil >= end) return console.log(count);
        if(idx < stations.length && curPos+remainOil >= stations[idx][0]){
            const [sPos,sOil] = stations[idx];
            pq.push(sPos,sOil);
            idx++;
            continue;
        }
        if(pq.isEmpty()) return console.log(-1);
        else{
            const {pos:station, oil} = pq.pop();
            count++;
            remainOil = remainOil - (station - curPos) + oil 
            curPos = station;
        }
    }
    
    console.log(-1);
}
solution(input);