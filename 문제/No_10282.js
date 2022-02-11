// const input = ['2','3 2 2','2 1 5','3 2 5','3 3 1','2 1 2','3 1 8','3 2 4']
// // const fs = require('fs');
// // const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// class Heap{
//     constructor(){
//         this.heap = [];
//     }
//     insert = (to,time) =>{
//         this.heap.push({to,time});
//         this.heapifyUp();
//     }
//     heapifyUp = () =>{
//         let index = this.heap.length-1;
//         const insertedNode = this.heap[index];
//         while(index > 0){
//             const parentIndex = Math.floor((index-1) /2);
//             if(this.heap[parentIndex].time > insertedNode.time){
//                 this.heap[index] = this.heap[parentIndex];
//                 index = parentIndex;
//             }else break;
//         }
//         this.heap[index] = insertedNode;
//     }
//     remove = () =>{
//         const rootNode = this.heap[0];
//         if(this.heap.length <= 0) return undefined;
//         if(this.heap.length === 1) this.heap = [];
//         else{
//             this.heap[0] = this.heap.pop();
//             this.heapifyDown();
//         }
//         return rootNode;
//     }
//     heapifyDown = () =>{
//         let index = 0;
//         const rootNode = this.heap[index];
//         while( (index*2 +1) < this.heap.length){
//             const leftChildIndex = index*2 + 1;
//             const rightChildIndex = index*2 + 2;
//             const smallerChildIndex = this.heap[rightChildIndex] && this.heap[rightChildIndex].time < this.heap[leftChildIndex].time
//              ? rightChildIndex : leftChildIndex;
//             if(this.heap[smallerChildIndex].time <= rootNode.time){
//                 this.heap[index] = this.heap[smallerChildIndex];
//                 index = smallerChildIndex;
//             }else break;
//         }
//         this.heap[index] = rootNode;
//     }
// }
// class PriorityQueue extends Heap{
//     constructor(){
//         super();
//     }
//     push = (to,time) => this.insert(to,time);
//     pop = () => this.remove();
//     isEmpty = () => this.heap.length <= 0;
// }

// const solution = input => {
//      let answer = '';
//      let T = +input[0];
//      let idx = 1;
//      let [n,d,c] = [null,null,null];
//      const times = Array(10001).fill(Infinity);
//      const edge = Array.from({length:10001},()=>[]);
//     //  const visited = Array(edge.length).fill(false);
//      const dijkstra = () =>{
//         times[c] = 0;
//         const pq = new PriorityQueue();
//         pq.push(c,0);
//         // let count = 0 , minTime = 0;
//         while(!pq.isEmpty()){
//             const cur = pq.pop();
//             if(cur === undefined) continue;
//             if(cur.time > times[cur.to]) continue;
            
//             for(let i=0; i<edge[cur.to].length; i++){
//                 const next = edge[cur.to][i];
//                 const nt = cur.time + next.time;
//                 if(times[next.to] > nt){
//                     times[next.to] = nt;
//                     pq.push(next.to,nt);
//                 }
//             }
//         }
//         let count = 0 , maxTime = -1 ;
//         for(let i=1; i<=n; i++){
//             if(times[i] === Infinity) continue;
//             count++;
//             if(times[i] > maxTime) maxTime = times[i];
//             times[i] = Infinity;
//             edge[i] = [];
//             // visited[i] = false;
//         }
//         return `${count} ${maxTime}\n`
//     }

//      while(T--){
//          [n,d,c] = input[idx++].split(' ').map(Number);
         
//          while(d--){
//              const [a,b,s] = input[idx++].split(' ').map(Number);
//              edge[b].push({to:a,time:s});
//          }
//          answer += dijkstra(c,edge);
//      }
//      console.log(answer.trim())
// }
// solution(input);

const input = ['2','3 2 2','2 1 5','3 2 5','3 3 1','2 1 2','3 1 8','3 2 4']

// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class Heap{
    constructor(){
        this.heap = [];
    }
    insert = (to,time) =>{
        this.heap.push({to,time});
        this.heapifyUp();
    }
    heapifyUp = () =>{
        let index = this.heap.length-1;
        const insertedNode = this.heap[index];
        while(index > 0){
            const parentIndex = Math.floor((index-1) /2);
            if(this.heap[parentIndex].time > insertedNode.time){
                this.heap[index] = this.heap[parentIndex];
                index = parentIndex;
            }else break;
        }
        this.heap[index] = insertedNode;
    }
    remove = () =>{
        const rootNode = this.heap[0];
        if(this.heap.length <= 0) return undefined;
        if(this.heap.length === 1) this.heap = [];
        else{
            this.heap[0] = this.heap.pop();
            this.heapifyDown();
        }
        return rootNode;
    }
    heapifyDown = () =>{
        let index = 0;
        const rootNode = this.heap[index];
        while( (index*2 +1) < this.heap.length){
            const leftChildIndex = index*2 + 1;
            const rightChildIndex = index*2 + 2;
            const smallerChildIndex = this.heap[rightChildIndex] && this.heap[rightChildIndex].time < this.heap[leftChildIndex].time
             ? rightChildIndex : leftChildIndex;
            if(this.heap[smallerChildIndex].time <= rootNode.time){
                this.heap[index] = this.heap[smallerChildIndex];
                index = smallerChildIndex;
            }else break;
        }
        this.heap[index] = rootNode;
    }
}
class PriorityQueue extends Heap{
    constructor(){
        super();
    }
    push = (to,time) => this.insert(to,time);
    pop = () => this.remove();
    isEmpty = () => this.heap.length <= 0;
}
const dijkstra = (start,edge) =>{
    const times = Array(edge.length).fill(Infinity);
    times[start] = 0;
    const pq = new PriorityQueue();
    pq.push(start,0);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined) continue;
        if(cur.time > times[cur.to]) continue;
        for(let i=0; i<edge[cur.to].length; i++){
            const next = edge[cur.to][i];
            const nt = cur.time + next.time;
            if(times[next.to] > nt){
                times[next.to] = nt;
                pq.push(next.to,nt);
            }
        }
    }
    let count = 0 , maxTime = -1 ;
    for(let i=1; i<times.length; i++){
        if(times[i] === Infinity) continue;
        count++;
        if(times[i] > maxTime) maxTime = times[i];
    }
    return `${count} ${maxTime}\n`
}
const solution = input => {
     let answer = '';
     let T = +input[0];
     let idx = 1;
     while(T--){
         let [n,d,c] = input[idx++].split(' ').map(Number);
         const edge = Array.from({length:n+1},()=>[]);
         while(d--){
             const [a,b,s] = input[idx++].split(' ').map(Number);
             edge[b].push({to:a,time:s});
         }
         answer += dijkstra(c,edge);
     }
     console.log(answer.trim())
}
solution(input);