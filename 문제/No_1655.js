// const input = ['7','1','5','2','10','-99','7','5'];
// const input = ['5','1','2','3','4','5']
// const input = ['5','1','-1','1','-1','1']; // 1 -1 1 -1 1
// const input = ['5','1','0','2','-1','3'] // 1 0 1 0 1;
// const input = ['5','4','0','3','1','2']; // 4 0 3 1 2
// const input = ['1','100']; // 100;
// const input = ['6','5','4','4','4','3','3']; // 5 4 4 4 4 4
const input = ['4','1','0','0','1'];
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class Heap{
    constructor(){
        this.heap = [];
    }
    push = (number) =>{
        this.heap.push(number);
        this.heapifyUp();
    }
    poll = () =>{
        const number = this.heap[0];
        if(this.heap.length === 1) this.heap = [];
        else{
            this.heap[0] = this.heap.pop();
            this.heapifyDown();
        }
        return number;
    }
    size = () => this.heap.length;
    peek = () => this.heap[0];
}
class minHeap extends Heap{
    
    heapifyUp = () =>{
        let index = this.heap.length - 1;
        const lastNumber = this.heap[index];
        while(index > 0){
            const parentIndex = Math.floor((index-1) / 2);
            if(this.heap[parentIndex] > lastNumber){
                this.heap[index] = this.heap[parentIndex];
                index = parentIndex;
            }else break;
        }
        this.heap[index] = lastNumber;
    }
    heapifyDown = () =>{
        let index = 0;
        const rootNumber = this.heap[index];
        while((index*2 + 1 ) < this.heap.length ){
            const leftChildIdx = index*2 +1;
            const rightChildIdx = index*2 + 2;
            const smallerChildIdx = this.heap[rightChildIdx] !==undefined && this.heap[rightChildIdx] < this.heap[leftChildIdx]
             ? rightChildIdx : leftChildIdx;
            if(this.heap[smallerChildIdx] < rootNumber){
                this.heap[index] = this.heap[smallerChildIdx];
                index = smallerChildIdx;
            }else break;
        }
        this.heap[index] = rootNumber;
    }
}
class maxHeap extends minHeap{
    
    heapifyUp = () =>{
        let index = this.heap.length -1;
        const lastNumber = this.heap[index];
        while(index > 0){
            const parentIdx = Math.floor((index-1)/2);
            if(this.heap[parentIdx] < lastNumber){
                this.heap[index] = this.heap[parentIdx];
                index = parentIdx;
            }else break;
        }
        this.heap[index] = lastNumber;
    }
    heapifyDown = () =>{
        let index = 0;
        const rootNumber = this.heap[index];
        while((index*2 + 1) < this.heap.length){
            const leftChildIdx = index*2 + 1;
            const rightChildIdx = index*2 +2;
            const biggerChildIdx = this.heap[rightChildIdx] !==undefined && this.heap[rightChildIdx] > this.heap[leftChildIdx]
             ? rightChildIdx : leftChildIdx;
            if(this.heap[biggerChildIdx] > rootNumber){
                this.heap[index] = this.heap[biggerChildIdx];
                index = biggerChildIdx;
            }else break;
        }
        this.heap[index] = rootNumber;
    }
}
const solution = input =>{
    const N = +input[0];
    let answer = '';
    const min = new minHeap();
    const max = new maxHeap();
    for(let i=1; i<1+N; i++){
        const number = +input[i];
        if(max.size() > min.size()){
            min.push(number);
        }
        else max.push(number);
        if(min.size() === 0) answer +=`${max.peek()}\n`
        else{
            if(max.peek() > min.peek()){
                const temp = max.poll();
                max.push(min.poll());
                min.push(temp);
            }
            answer +=`${max.peek()}\n`
        }
    }
    
    console.log(answer.trim());
}
solution(input);
