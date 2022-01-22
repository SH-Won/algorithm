const input = [
'4 5',
'1 2 3 4',
'2 3 4 5',
'3 4 5 6',
'4 5 6 7',
'1 2 2 3 4',
'0 2 3 7',
'1 2 2 3 4',
'0 3 4 5',
'1 3 4 3 4'
]
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

class SegmentTree{
    constructor(n){
        this.n = n;
        this.tree = Array.from({length:2*n},()=>Array(2*n));
    }
    init(){
       const {n,matrix,tree} = this;
       for(let y=0; y<n; y++){
           for(let x=0; x<n; x++) tree[y+n][x+n] = matrix[y][x];
       }
       for(let y=n; y<2*n; y++){
           for(let x=n-1; x>0; x--) tree[y][x] = tree[y][x<<1] + tree[y][x<<1|1];
       }
       for(let y=n-1; y>0; y--){
           for(let x=1; x<2*n; x++) tree[y][x] = tree[y<<1][x] + tree[y<<1|1][x];
       }
    }
    update(y,x,value){
        const {n,tree} = this;
        tree[y+n][x+n] = value;
        for(let i=x+n; i>1; i>>=1) tree[y+n][i>>1] = tree[y+n][i] + tree[y+n][i^1];
        for(y+=n; y>1; y>>=1){
            for(let i=x+n; i>0; i>>=1) tree[y>>1][i] = tree[y][i] + tree[y^1][i];
        } 
    }
    queryX(y,x1,x2){
        const {n,tree} = this;
        let sum = 0;
        for(x1+=n, x2+=n+1; x1<x2; x1>>=1,x2>>=1){
            if(x1 & 1) sum += tree[y][x1++];
            if(x2 & 1) sum += tree[y][--x2];
        }
        return sum;
    }
    query(y1,x1,y2,x2){
        const {n} = this;
        let sum = 0;
        for(y1+=n, y2+=n+1; y1<y2; y1>>=1,y2>>=1){
            if(y1 & 1) sum+= this.queryX(y1++,x1,x2);
            if(y2 & 1) sum+= this.queryX(--y2,x1,x2);
        }
        return sum;
    }
}
const solution = (input) =>{
    const [N,M] = input[0].split(' ').map(Number);
    const matrix = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    const command = Array.from({length:M},(_,i)=>input[i+N+1].split(' ').map(Number));
    SegmentTree.prototype.matrix = matrix;
    const segmentTree = new SegmentTree(N);
    segmentTree.init();
    let answer = '';
    for(let i=0; i<command.length; i++){
        if(command[i][0] === 0){
            const [y,x,value] = [command[i][1]-1,command[i][2]-1,command[i][3]];
            segmentTree.update(y,x,value);
        }
        else{
            const [w,...pos] = command[i].map(num => +num -1);
            answer +=`${segmentTree.query(...pos)}\n` 
        }
    }
    console.log(answer.trim());
}
solution(input);