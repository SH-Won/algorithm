const input = ['5','20 50','10 100','30 120','60 110','80 90']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

class PriorityQueue{
    constructor(){
        this.queue = [];
    }
    push = (pos,time = null) =>{
        if(time === null) this.queue.push({pos});
        else this.queue.push({pos,time});
        this.up();
    }
    pop = () =>{
        const first = this.queue[0];
        if(this.queue.length <= 0) return undefined;
        if(this.queue.length === 1) this.queue = [];
        else{
            this.queue[0] = this.queue.pop();
            this.down();
        }
        return first;
    }
    peek = () => this.queue[0];
    isEmpty = () => this.queue.length <=0;
}
class Occupied extends PriorityQueue{
    up = () =>{
        let i = this.queue.length - 1;
        const inserted = this.queue[i];
        while(i > 0){
            const parent = Math.floor((i-1)/2);
            if(this.queue[parent].time > inserted.time){
                this.queue[i] = this.queue[parent];
                i = parent;
            }else break;
        }
        this.queue[i] = inserted;
    }
    down = () =>{
        let i = 0;
        const first = this.queue[i];
        while((i*2+1) < this.queue.length){
            const leftChild = i*2 +1;
            const rightChild = i*2 + 2;
            const smallerChild = this.queue[rightChild] && this.queue[rightChild].time < this.queue[leftChild].time
            ? rightChild : leftChild;
            if(this.queue[smallerChild].time <= first.time){
                this.queue[i] = this.queue[smallerChild];
                i = smallerChild
            }else break;
        }
        this.queue[i] = first;
    }
}
class Vacant extends PriorityQueue{
    up = () =>{
        let i = this.queue.length - 1;
        const inserted = this.queue[i];
        while(i > 0){
            const parent = Math.floor((i-1)/2);
            if(this.queue[parent].pos > inserted.pos){
                this.queue[i] = this.queue[parent];
                i = parent;
            }else break;
        }
        this.queue[i] = inserted;
    }
    down = () =>{
        let i = 0;
        const first = this.queue[i];
        while((i*2+1) < this.queue.length){
            const leftChild = i*2 +1;
            const rightChild = i*2 + 2;
            const smallerChild = this.queue[rightChild] && this.queue[rightChild].pos < this.queue[leftChild].pos
            ? rightChild : leftChild;
            if(this.queue[smallerChild].pos <= first.pos){
                this.queue[i] = this.queue[smallerChild];
                i = smallerChild
            }else break;
        }
        this.queue[i] = first;
    }
}
const solution = input =>{
    const N = +input[0];
    const timeTable = Array.from({length:N},(_,i) => input[i+1].split(' ').map(Number)).sort((a,b) => a[0] - b[0]);
    const occupied = new Occupied();
    const vacant = new Vacant();
    const chairs = Array(N+1).fill(0);
    let pos = 1;
    for(let i=0; i<timeTable.length; i++){
        const [start,end] = timeTable[i];
        while(!occupied.isEmpty() && occupied.peek().time <= start){
            vacant.push(occupied.pop().pos);
        }
        if(vacant.isEmpty()){
            chairs[pos]++;
            occupied.push(pos++,end);
        }
        else{
            const {pos : emptyPos} = vacant.pop();
            chairs[emptyPos]++;
            occupied.push(emptyPos,end); 
        }
    }

    const answer = chairs.filter(el => el > 0 );
    console.log(`${answer.length}\n${answer.join(' ')}`);
}
solution(input);