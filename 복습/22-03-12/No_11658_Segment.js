const input = ['4 5','1 2 3 4','2 3 4 5','3 4 5 6','4 5 6 7','1 2 2 3 4','0 2 3 7','1 2 2 3 4','0 3 4 5','1 3 4 3 4'];
// 세그먼트 트리
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class SegmentTree{
    constructor(N){
        this.N = N;
        this.tree = Array.from({length:2*N},()=>Array(2*N).fill(null));
    }
    init = () =>{
        const {N,arr,tree} = this;
        for(let y=0; y<N; y++){
            for(let x=0; x<N; x++) tree[y+N][x+N] = arr[y][x];
        }
        for(let y=N; y<2*N; y++){
            for(let x=N-1; x>0; x--) tree[y][x] = tree[y][x<<1] + tree[y][x<<1|1];
        }
        for(let y=N-1; y>0; y--){
            for(let x=2*N-1; x>0; x--) tree[y][x] = tree[y<<1][x] + tree[y<<1|1][x];
        }
    }
    update = (y,x,value) =>{
        const {N,tree} = this;
        tree[y+N][x+N] = value;
        for(let i=x+N; i>1; i>>=1) tree[y+N][i>>1] = tree[y+N][i]+tree[y+N][i^1];
        for(y+=N; y>1; y>>=1){
            for(let i=x+N; i>0; i>>=1) tree[y>>1][i] = tree[y][i] + tree[y^1][i];
        }
    }
    queryX = (y,x1,x2) =>{
        const {N,tree} = this;
        let sum = 0;
        for(x1+=N , x2+=N+1; x1<x2; x1>>=1,x2>>=1){
            if(x1 & 1) sum+=tree[y][x1++];
            if(x2 & 1) sum+=tree[y][--x2];
        }
        return sum;
    }
    query = (y1,x1,y2,x2) =>{
        const {N} = this;
        let sum = 0;
        for(y1+=N, y2+=N+1; y1<y2; y1>>=1,y2>>=1){
            if(y1 & 1) sum+= this.queryX(y1++,x1,x2);
            if(y2 & 1) sum+= this.queryX(--y2,x1,x2);
        }
        return sum;
    }
}
const solution = input =>{
    const [N,M] = input[0].split(' ').map(Number);
    const arr = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number))
    SegmentTree.prototype.arr = arr;
    const segmentTree = new SegmentTree(N);
    segmentTree.init();
    let answer = ''
    for(let i=N+1; i<N+1+M; i++){
        const operation = input[i].split(' ').map(Number);
        if(operation.length === 5){
            const [w,y1,x1,y2,x2] = operation;
            answer += `${segmentTree.query(y1-1,x1-1,y2-1,x2-1)}\n`;

        }else{
            const [w,y,x,value] = operation;
            segmentTree.update(y-1,x-1,value);
        }
    }
    console.log(answer.trim());
}
solution(input);