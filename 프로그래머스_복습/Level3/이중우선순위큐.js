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
        const inserted = this.queue[i];
        while(i > 0){
            const parentIndex = Math.floor((i-1)/2);
            if(this.queue[parentIndex] > inserted){
                this.queue[i] = this.queue[parentIndex];
                i = parentIndex;
            }else break;
        }
        this.queue[i] = inserted;
    }
    pop = (command) =>{
        if(command === -1){
            const root = this.queue[0];
            if(this.queue.length <= 0) return undefined;
            if(this.queue.length === 1) this.queue = [];
            else{
                this.queue[0] = this.queue.pop();
                this.down();
            }
            return root;
        }else{
            if(this.queue.length <= 0) return undefined;
            if(this.queue.length === 1) return this.queue.pop();
            else{
                const lastIndex = this.queue.length -1;
                const last = this.queue[lastIndex];
                if(this.queue[lastIndex-1] > last){
                    this.queue[lastIndex] = this.queue[lastIndex-1];
                    this.queue[lastIndex-1] = last;
                }
                return this.queue.pop();
            }
        }
    }
    down = () =>{
        let i = 0;
        const root = this.queue[0];
        while((i*2+1) < this.queue.length){
            const leftChildIndex = i*2 + 1;
            const rightChildIndex = i*2 + 2;
            const smallerChildIndex = this.queue[rightChildIndex] && this.queue[rightChildIndex] < this.queue[leftChildIndex]
            ? rightChildIndex : leftChildIndex;
            if(this.queue[smallerChildIndex] < root){
                this.queue[i] = this.queue[smallerChildIndex];
                i = smallerChildIndex; 
            }else break;
        }
        this.queue[i] = root;
    }
    getLength = () => this.queue.length;
}

const solution = operations =>{
    const pq = new PriorityQueue();
    operations.forEach(operation =>{
        const [alphabet,number] = operation.split(' ');
        if(alphabet === 'I') pq.push(+number);
        else{
            if(pq.getLength() === 0) return;
            pq.pop(+number);
        }
    });
    if(pq.getLength() === 0) return [0,0];
    if(pq.getLength() === 1) return Array(2).fill(pq.pop(1));
    return [pq.pop(1),pq.pop(-1)];
}
// console.log(solution(["I 16","D 1"]))
console.log(solution(["I 7","I 5","I -5","D -1"]))