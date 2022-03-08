class PriorityQueue{
    constructor(){
        this.queue = [];
    }
    push = (number) =>{
        this.queue.push(number);
        this.up();
    }
    up = () =>{
        let i = this.queue.length - 1;
        const last = this.queue[i];
        while(i > 0){
            const parent = Math.floor((i-1)/2);
            if(this.queue[parent] > last){
                this.queue[i] = this.queue[parent];
                i = parent;
            }else break;
        }
        this.queue[i] = last;
    }
    pop = (command) =>{
        if(command === -1){
            const first = this.queue[0];
            if(this.queue.length <=0) return undefined;
            if(this.queue.length === 1) this.queue = [];
            else{
                this.queue[0] = this.queue.pop();
                this.down();
            }
            return first;
        }
        else{
            if(this.queue.length <= 0) return undefined;
            if(this.queue.length === 1) return this.queue.pop();
            else{
                let temp = this.queue[this.queue.length-2];
                const last = this.queue[this.queue.length-1];
                if(temp > last){
                    this.queue[this.queue.length-1] = temp;
                    this.queue[this.queue.length-2] = last;
                }
                return this.queue.pop();
            }
        }
    }
    down = () =>{
        let i = 0;
        const first = this.queue[i];
        while((i*2+1) < this.queue.length){
            const leftChild = i*2 + 1;
            const rightChild = i*2 + 2;
            const smallerChild = this.queue[rightChild] && this.queue[rightChild] < this.queue[leftChild]
            ? rightChild : leftChild;
            if(this.queue[smallerChild] <= first){
                this.queue[i] = this.queue[smallerChild];
                i = smallerChild;
            }else break;
        }
        this.queue[i] = first;
    }
    size = () => this.queue.length;
}
const solution = operations =>{
    const pq = new PriorityQueue();
    for(let i=0; i<operations.length; i++){
        const [command,number] = operations[i].split(' ');
        if(command === 'I') pq.push(+number);
        else{
            if(pq.size() === 0) continue;
            pq.pop(+number);
        }
    }
    console.log(pq.queue);
    if(pq.size() === 0) return [0,0];
    if(pq.size() === 1) return [pq.queue[0],pq.queue[0]];
    return [pq.pop(1),pq.pop(-1)];
}
// console.log(solution(["I 16","D 1"]))
// console.log(solution(["I 7","I 5","I -5","D -1"]))
console.log(solution(["I 16", "I -5643", "D -1", "D 1", "D 1", "I 123", "D -1"]))