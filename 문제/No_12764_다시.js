const input = ['5','20 50','10 100','30 120','60 110','80 90']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class PriorityQueue {
    constructor(){
        this.queue = [];
    }
    isEmpty = () => this.queue.length <= 0;
    peek = () => this.queue[0];
}
class Occupied extends PriorityQueue{
    
    push = (time,pos) =>{
        this.queue.push({time,pos});
        this.up();
    }
    up = () =>{
        let i = this.queue.length -1;
        const inserted = this.queue[i];
        while(i > 0){
            const parent = Math.floor((i-1) / 2);
            if(this.queue[parent].time >= inserted.time){
                if(this.queue[parent].time === inserted.time && this.queue[parent].pos < inserted.pos) break;
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
        while((i*2 + 1) < this.queue.length){
            const leftChild = i*2 + 1;
            const rightChild = i*2 + 2;
            let smallerChild = leftChild;
            if(this.queue[rightChild] && this.queue[rightChild].time < this.queue[leftChild].time){
                smallerChild = rightChild;
            }
            else if(this.queue[rightChild] && this.queue[rightChild].time === this.queue[leftChild].time && this.queue[rightChild].pos < this.queue[leftChild].pos){
            smallerChild = rightChild;
            }
            if(this.queue[smallerChild].time <= root.time){
                if(this.queue[smallerChild].time === root.time && this.queue[smallerChild].pos > root.pos){
                    break;
                }
                this.queue[i] = this.queue[smallerChild]; 
                i = smallerChild;
            }else break;
        }
        this.queue[i] = root;
    }
}
class Vacant extends PriorityQueue{
    push = (pos) =>{
        this.queue.push(pos);
        this.up();
    }
    up = () =>{
        let i = this.queue.length - 1;
        const inserted = this.queue[i];
        while(i > 0){
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
        if(this.queue.length <=0) return undefined;
        if(this.queue.length === 1) this.queue =[];
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
            const smallerChild = this.queue[rightChild] !== undefined && this.queue[rightChild] < this.queue[leftChild]
            ? rightChild : leftChild;
            if(this.queue[smallerChild] < root){
                this.queue[i] = this.queue[smallerChild];
                i = smallerChild;
            }else break;
        }
        this.queue[i] = root;
    }
    
}
const solution = input =>{
    const N = +input[0];
    const timeTable = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number)).sort((a,b) => a[0] - b[0]);
    const occupied = new Occupied();
    const vacant = new Vacant();
    let pos = 1;
    let count = Array(N+1).fill(0);
    for(let i=0; i<timeTable.length; i++){
        const [start,end] = timeTable[i];
        while(!occupied.isEmpty() && occupied.peek().time <= start){
            vacant.push(occupied.pop().pos);
        }
        if(vacant.isEmpty()){
            occupied.push(end,pos);
            count[pos]++;
            pos++;
        }
        else{
            const emptyPos = vacant.pop();
            occupied.push(end,emptyPos);
            count[emptyPos]++;
        }
    }
    let answer = {pos:'',count:0};
    for(let i=1; i<count.length; i++){
        if(count[i] === 0) break;
        answer.count++;
        answer.pos+=`${count[i]} `;
    }
    console.log(answer.count+'\n'+answer.pos.trim());
}
solution(input);