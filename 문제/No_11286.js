const input = ['18','1','-1','0','0','0','1','1','-1','-1','2','-2','0','0','0','0','0','0','0']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class absHeap{
    constructor(){
        this.heap=[];
    }
    push = (info) =>{
        this.heap.push(info);
        this.heapifyUp();
    }
    heapifyUp = () =>{
        let index = this.heap.length -1;
        const insertNumber = this.heap[index];
        while(index > 0){
            const parentIndex = Math.floor((index-1) / 2);
            if(this.heap[parentIndex].abs === insertNumber.abs && this.heap[parentIndex].origin > insertNumber.origin){
                this.heap[index] = this.heap[parentIndex];
                index = parentIndex;
            }else if(this.heap[parentIndex].abs > insertNumber.abs){
                this.heap[index] = this.heap[parentIndex];
                index = parentIndex;
            }
            else break;
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
            let smallerChildIdx = leftChildIdx;
            if(this.heap[rightChildIdx] && this.heap[rightChildIdx].abs === this.heap[leftChildIdx].abs && this.heap[rightChildIdx].origin < this.heap[leftChildIdx].origin){
                smallerChildIdx = rightChildIdx;
            }
            if(this.heap[rightChildIdx] && this.heap[rightChildIdx].abs < this.heap[leftChildIdx].abs){
                smallerChildIdx = rightChildIdx;
            }

            if(this.heap[smallerChildIdx].abs === rootNumber.abs && this.heap[smallerChildIdx].origin < rootNumber.origin){
                this.heap[index] = this.heap[smallerChildIdx];
                index = smallerChildIdx;
            }else if(this.heap[smallerChildIdx].abs < rootNumber.abs) {
                this.heap[index] = this.heap[smallerChildIdx];
                index = smallerChildIdx;
            }
            else break;
        }
        this.heap[index] = rootNumber;
    }
}
const solution = input =>{
    const N = +input[0];
    const heap = new absHeap();
    let answer = '';
    for(let i=1; i<1+N; i++){
        const number = +input[i];
        if(number === 0){
            const smallestNumber = heap.pop();
            answer += `${smallestNumber === undefined ? 0 : smallestNumber.origin}\n`;
        }
        else heap.push({abs:Math.abs(number),origin:number});
    }
    console.log(answer.trim());
}
solution(input);