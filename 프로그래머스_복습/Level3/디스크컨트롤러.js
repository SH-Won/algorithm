class PriorityQueue{
    constructor(){
        this.queue = [];
    }
    push = (start,workTime) =>{
        this.queue.push({start,workTime});
        this.up();
    }
    up = () =>{
        let i = this.queue.length -1;
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
    pop = () =>{
        const first = this.queue[0];
        if(this.queue.length <=0 ) return undefined;
        if(this.queue.length === 1) this.queue = [];
        else{
            this.queue[0] = this.queue.pop();
            this.down();
        }
        return first;
    }
    down = () =>{
        let i = 0;
        const first = this.queue[i];
        while((i*2 + 1) < this.queue.length){
            const leftChild = i*2 + 1;
            const rightChild = i*2 + 2;
            const smallerChild = this.queue[rightChild] && this.queue[rightChild].workTime < this.queue[leftChild].workTime
            ? rightChild : leftChild;
            if(this.queue[smallerChild].workTime <= first.workTime){
                this.queue[i] = this.queue[smallerChild];
                i = smallerChild;
            }else break;
        }
        this.queue[i] = first;
    }
    isEmpty = () => this.queue.length <= 0;
}
const solution = jobs =>{
    jobs.sort((a,b) => a[0] - b[0]);
    let time = 0 , idx = 0;
    let answer = 0;
    const pq = new PriorityQueue();
    while(idx < jobs.length || !pq.isEmpty()){
        while(idx < jobs.length && jobs[idx][0] <= time){
            const [start,workTime] = jobs[idx++];
            pq.push(start,workTime);
        }
        if(pq.isEmpty()) time = jobs[idx][0];
        else{
            const {start,workTime} = pq.pop();
            time += workTime;
            answer += (time - start);
        }
    }
    return Math.floor(answer / jobs.length);
}
console.log(solution([[0, 3], [1, 9], [2, 6]]))