class MinHeap{
    constructor(){
        this.queue = [];
    }
    push = (start,time) =>{
        this.queue.push({start,time});
        this.up();
    }
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
    pop = () =>{
        const root = this.queue[0];
        if(this.queue.length === 0) return undefined;
        if(this.queue.length === 1) this.queue = [];
        else{
            this.queue[0] =this.queue.pop();
            this.down();
        }
        return root;
    }
    down = () =>{
        let i = 0;
        const root = this.queue[i];
        while((i*2+1) < this.queue.length){
            const leftChild = i*2 + 1;
            const rightChild = i*2 + 2;
            const smallerChild = this.queue[rightChild] && this.queue[rightChild].time < this.queue[leftChild].time
            ? rightChild : leftChild;
            if(this.queue[smallerChild].time <= root.time){
                this.queue[i] = this.queue[smallerChild];
                i = smallerChild;
            }else break;
        }
        this.queue[i] = root;
    }
    peek = () => this.queue[0];
    isEmpty = () => this.queue.length <=0;
}
const solution = jobs =>{
    jobs.sort((a,b)=> a[0] - b[0]);
    const minHeap = new MinHeap();
    let times = 0;
    let answer = 0;
    let idx = 0;
    while(idx < jobs.length || !minHeap.isEmpty()){
            if(idx < jobs.length && jobs[idx][0] <= times){
                minHeap.push(jobs[idx][0],jobs[idx][1]);
                idx++;
                continue;
            }
        if(minHeap.isEmpty()) times = jobs[idx][0];
        else{
            const {start,time} = minHeap.pop();
            answer += (times+time-start);
            times += time;
        }
    }
    return Math.floor(answer / jobs.length);
}
console.log(solution([[0, 3], [1, 9], [2, 6],[1,2],[2,5]]))
// console.log(solution([[0,3],[4,3],[8,3]]));