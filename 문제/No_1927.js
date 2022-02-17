const input = ['9','0','12345678','1','2','0','0','0','0','32'];
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class minHeap{
    constructor(){
        this.heap=[];
    }
    push = (number) =>{
        this.heap.push(number);
        this.heapifyUp();
    }
    heapifyUp = () =>{
        let index = this.heap.length -1;
        const insertNumber = this.heap[index];
        while(index > 0){
            const parentIndex = Math.floor((index-1) / 2);
            if(this.heap[parentIndex] > insertNumber){
                this.heap[index] = this.heap[parentIndex];
                index = parentIndex;
            }else break;
        }
        this.heap[index] = insertNumber;
    }
    pop = () =>{
        const rootNumber = this.heap[0];
        if(this.heap.length <= 0) return undefined;
        if(this.heap.length === 1) this.heap=[];
        else{
            this.heap[0] = this.heap.pop();
            this.heapifyDown();
        }
        return rootNumber;
    }
    heapifyDown = () =>{
        let index = 0;
        const rootNumber = this.heap[index];
        while((index*2 + 1) < this.heap.length){
            const leftChildIdx = index*2 + 1;
            const rightChildIdx = index*2 + 2;
            const biggerChildIdx = this.heap[rightChildIdx] && this.heap[rightChildIdx] < this.heap[leftChildIdx] 
             ? rightChildIdx : leftChildIdx;
            if(this.heap[biggerChildIdx] <= rootNumber){
                this.heap[index] = this.heap[biggerChildIdx];
                index = biggerChildIdx;
            }else break;
        }
        this.heap[index] = rootNumber;
    }
}
const solution = input =>{
    const N = +input[0];
    const heap = new minHeap();
    let answer = '';
    for(let i=1; i<1+N; i++){
        const number = +input[i];
        if(number === 0){
            const smallestNumber = heap.pop();
            answer += `${smallestNumber === undefined ? 0 : smallestNumber}\n`;
        }
        else heap.push(number);
    }
    console.log(answer.trim());
}
solution(input);