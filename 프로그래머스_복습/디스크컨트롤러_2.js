class Heap{
    constructor(){
        this.queue = [];
    }
    push = (startTime,workTime) =>{
        this.queue.push({startTime,workTime});
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
    up = () =>{
        let i = this.queue.length - 1;
        const inserted = this.queue[i];
        while(i > 0){
            const parent = Math.floor((i-1)/2);
            if(this.queue[parent].workTime > inserted.workTime){
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
            const smallerChild = this.queue[rightChild] && this.queue[rightChild].workTime < this.queue[leftChild].workTime
            ? rightChild : leftChild;
            if(this.queue[smallerChild].workTime <= first.workTime){
                this.queue[i] = this.queue[smallerChild];
                i = smallerChild
            }else break;
        }
        this.queue[i] = first;
    }
    isEmpty = () => this.queue.length <= 0;
}
const solution = jobs =>{
    jobs.sort((a,b) => a[0]-b[0]);
    const minHeap = new Heap();
    let times = 0;
    let answer = 0;
    let i = 0;
    while(i < jobs.length || !minHeap.isEmpty()){
        if(i < jobs.length && jobs[i][0] <= times){
            minHeap.push(jobs[i][0],jobs[i][1]);
            i++;
            continue;
        }
        if(minHeap.isEmpty()) times = jobs[i][0];
        else{
            const {startTime,workTime} = minHeap.pop();
            times += workTime;
            answer += (times - startTime);
        }
    }
    return Math.floor(answer / jobs.length);
}
console.log(solution([[0, 3], [1, 9], [2, 6]]))