const input = ['2','5 4 2','1 2 3','1 2 6','2 3 2','3 4 4','3 5 3','5','4','6 9 2','2 3 1','1 2 1','1 3 3','2 4 4','2 5 5','3 4 3','3 6 2','4 5 4','4 6 3','5 6 7','5','6']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class Heap{
    constructor(){
        this.heap = [];
    }
    insert = (to,distance) =>{
        this.heap.push({to,distance});
        this.heapifyUp();
    }
    heapifyUp = () =>{
        let index = this.heap.length - 1;
        const lastNode = this.heap[index];
        while(index > 0){
            const parentIdx = Math.floor((index - 1) / 2);
            if(this.heap[parentIdx].distance > lastNode.distance){
                this.heap[index] = this.heap[parentIdx];
                index = parentIdx;
            }else break;
        }
        this.heap[index] = lastNode;
    }
    remove = () =>{
        const rootNode = this.heap[0];
        if(this.heap.length <=0) return undefined;
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
        while((index*2+1) < this.heap.length){
            const leftChildIdx = index*2 + 1;
            const rightChildIdx = index*2 + 2;
            const smallerChildIdx = this.heap[rightChildIdx] && this.heap[rightChildIdx].distance < this.heap[leftChildIdx].distance
            ? rightChildIdx : leftChildIdx;
            if(this.heap[smallerChildIdx].distance <= rootNode.distance){
                this.heap[index] = this.heap[smallerChildIdx];
                index = smallerChildIdx;
            }else break;
        }
        this.heap[index] = rootNode;
    }
}
class PriorityQueue extends Heap{
    constructor(){
        super();
    }
    push = (to,distance) => this.insert(to,distance);
    pop = () => this.remove();
    isEmpty = () => this.heap.length <= 0;
}
const dijkstra = (start,edge) =>{
    const dist = Array(edge.length).fill(Infinity);
    dist[start] = 0;
    const pq = new PriorityQueue();
    pq.push(start,0);
    while(!pq.isEmpty()){
        const cur = pq.pop();
        if(cur === undefined || cur.distance > dist[cur.to]) continue;
        for(let i=0; i<edge[cur.to].length; i++){
            const next = edge[cur.to][i];
            const nd = next.distance + cur.distance;
            if(dist[next.to] > nd){
                dist[next.to] = nd;
                pq.push(next.to , nd);
            }
        }
    }
    return dist
}
const solution = input =>{
    let idx = 0;
    let T = +input[idx++];
    let answer = '';
    while(T--){
        let [n,m,t] = input[idx++].split(' ').map(Number);
        const [s,g,h] =input[idx++].split(' ').map(Number);
        const edge = Array.from({length:n+1},()=> []);
        const candidate = [];
        // let gh ;
        while(m--){
            const [from,to,distance] = input[idx++].split(' ').map(Number);
            edge[from].push({to,distance});
            edge[to].push({to:from,distance});
            // if((from === g && to === h) || (from === h && to === g )) gh = distance;
        }
        while(t--) candidate.push(+input[idx++]);
        const minS = dijkstra(s,edge);
        const minG = dijkstra(g,edge);
        const minH = dijkstra(h,edge);
        let destination = [];
        let min = Infinity;
        for(let i=0; i<candidate.length; i++){
            const end = candidate[i];
            if(minS[end] === Infinity) continue;
            if(minS[end] === minS[g]+minG[h]+minH[end] || minS[end] === minS[h]+minH[g]+minG[end]){
                destination.push(end);
            }
        }
        destination.sort((a,b) => a-b);
        answer += `${destination.join(' ')}\n`
    }
    console.log(answer.trim());
}
solution(input);