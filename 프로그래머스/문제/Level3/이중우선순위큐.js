class Heap{
    constructor(){
        this.queue =[];
    }
    push = (value) =>{
        this.queue.push(value);
        this.up();
    }
    isEmpty = () => this.queue.length <= 0;
}
class MinHeap extends Heap{
    pop = (number) =>{
        if(number === -1){
            const root = this.queue[0];
            if(this.queue.length <= 0) return undefined;
            if(this.queue.length === 1) this.queue = [];
            else{
                this.queue[0] = this.queue.pop();
                this.down();
            }
            return root;
        }
        else{
            let last = this.queue[this.queue.length-1];
            if(this.queue.length === 0) return undefined;
            if(this.queue.length === 1) this.queue = [];
            else{
                let temp = this.queue[this.queue.length-2];
                if(temp > last){
                    this.queue[this.queue.length-1] = temp;
                    this.queue[this.queue.length-2] = last;
                }
                last = this.queue.pop();
            }
            return last;
        }
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
    down = () =>{
        let i = 0;
        const root = this.queue[i];
        while((i*2+1) < this.queue.length){
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
}
const solution = operations =>{
    const minHeap = new MinHeap();
    for(let i=0; i<operations.length; i++){
        const [alphabet,number] = operations[i].split(' ');
        if(alphabet === 'I') minHeap.push(+number);
        else{
           if(minHeap.isEmpty()) continue;
           minHeap.pop(+number);
        }
    }
    if(minHeap.queue.length === 0) return [0,0];
    if(minHeap.queue.length === 1){
        const number = minHeap.pop(-1);
        return [number,number];
    }
    else{
        const max = minHeap.pop(1);
        const min = minHeap.pop(-1);
        return [max,min];
    }
}
// console.log(solution(["I 16","D 1"]))
// console.log(solution(["I 7","I 5","I -5","D -1"]))
// console.log(solution(['I 6','I 5','I 2','I 3','I 1','D 1','D -1']));