const input = ['4 5','1 2 3 4','2 3 4 5','3 4 5 6','4 5 6 7','1 2 2 3 4','0 2 3 7','1 2 2 3 4','0 3 4 5','1 3 4 3 4'];
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

function Seg(N){
    this.N = N;
    this.tree = Array.from({length:2*N},()=>Array(2*N).fill(0));
    this.init = () =>{
        const {N,tree,matrix} = this;
        for(let y=0; y<N; y++){
            for(let x=0; x<N; x++) tree[y+N][x+N] = matrix[y][x];
        }
        for(let y=N; y<2*N; y++){
            for(let x=N-1; x>0; x--) tree[y][x] = tree[y][x<<1] + tree[y][x<<1|1];
        }
        for(let y=N-1; y>0; y--){
            for(let x=1; x<2*N; x++) tree[y][x] = tree[y<<1][x] + tree[y<<1|1][x]
        }
    }
    this.update = (y,x,value) =>{
        const {N,tree} = this;
        tree[y+N][x+N] = value+1;
        for(let i=x+N; i>1; i>>=1) tree[y+N][i>>1] = tree[y+N][i] + tree[y+N][i^1];
        for(y+=N; y>1; y>>=1){
            for(let i=x+N; i>0; i>>=1) tree[y>>1][i] = tree[y][i] + tree[y^1][i];
        }
    }
    this.queryX = (y,x1,x2) =>{
        const {N,tree} = this;
        let sum = 0;
        for(x1+=N , x2+=N+1; x1<x2; x1>>=1 ,x2 >>=1){
            if(x1 & 1) sum+= tree[y][x1++];
            if(x2 & 1) sum+= tree[y][--x2];
        }
        return sum;
    }
    this.query = (y1,x1,y2,x2) =>{
        const {N} = this;
        let sum = 0;
        for(y1+=N ,y2+=N+1; y1<y2; y1>>=1, y2>>=1){
            if(y1 & 1) sum += this.queryX(y1++,x1,x2);
            if(y2 & 1) sum += this.queryX(--y2,x1,x2);
        }
        return sum;
    }
}

const solution = (input) =>{
    const [N,M] = input[0].split(' ').map(Number);
    const matrix = Array.from({length:N},(_,i) => input[i+1].split(' ').map(Number));
    Seg.prototype.matrix = matrix;
    const seg = new Seg(N);
    seg.init();
    let answer = '';
    for(let i=N+1; i<N+M+1; i++){
        const [w,...info] = input[i].split(' ').map(num => num -1);
        if(w === -1) seg.update(...info)
        else answer+=`${seg.query(...info)}\n`;
    }
    console.log(answer.trim());
}
solution(input);
// const matrix = [[1,2,3,4],[2,3,4,5],[3,4,5,6],[4,5,6,7]]
// const seg = new Seg(4);
// Seg.prototype.matrix = matrix;
// seg.init();
