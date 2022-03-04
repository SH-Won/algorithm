// const input = ['4','30','40','50','100'] // 410
// const input = ['3','10','20','40']; // 100
// const input = ['1','30']; // 0
// const input = ['4','30','40','50','60']; // 360
// const input = ['8','30','40','50','20','10','100','60','120'] // 1160;
// const input = ['8','30','40','50','20','10','100','60','10']; // 860
const input = ['4','120','40','100','20'] // 500
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class PriorityQueue{
    constructor(){ // minHeap;
        this.queue = [];
    }
    push = (number) =>{
        this.queue.push(number);
        this.up();
    }
    up = () =>{
        let i = this.queue.length - 1;
        const inserted = this.queue[i];
        while( i > 0){
            const parent = Math.floor((i-1)/2);
            if(this.queue[parent] > inserted){
                this.queue[i] = this.queue[parent];
                i = parent;
            }else break;
        }
        this.queue[i] = inserted;
    }
    pop = () =>{
        const root = this.queue[0];
        if(this.queue.length === 0) return undefined;
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
            const smallerChild = this.queue[rightChild] && this.queue[rightChild] < this.queue[leftChild]
            ? rightChild : leftChild;
            if(this.queue[smallerChild] <= root){
                this.queue[i] = this.queue[smallerChild];
                i = smallerChild;
            }else break;
        }
        this.queue[i] = root;
    }
    getLength = () => this.queue.length;
    peek = () => this.queue[0];
}
const solution = input =>{
    const N = +input[0];
    const cardNumbers = Array.from({length:N},(_,i) => +input[i+1]).sort((a,b)=> a-b);
    const pq = new PriorityQueue();
    let count = 0;
    let idx = 0;
    while(idx < N || pq.getLength() > 1){
        if(idx < N && (pq.getLength() < 2 || count >= cardNumbers[idx])){
            pq.push(cardNumbers[idx++]);
        }
        else{
            const number1 = pq.pop();
            const number2 = pq.pop();
            count += (number1+number2);
            pq.push(number1+number2);
        }
    }
    console.log(count);
}
solution(input);