const input = ['5 2','1 2 3 4 5','2 3 3 1','3 5 4 1'];
// const input = ['2 1','10000000000000 10000000000000','1 2 0 1'];
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

function Seg(N){
    this.N = N;
    this.tree = Array(2*N);
    this.init = () =>{
        const {N,tree,arr} = this;
        for(let i=0; i<N; i++) tree[i+N] = arr[i];
        for(let i=N-1; i>0; i--) tree[i] = tree[i<<1] + tree[i<<1|1];
    }
    this.update = (idx,value) =>{
        const {N,tree} = this;
        tree[idx+N] = value
        for(idx+=N; idx>1; idx>>=1) tree[idx>>1] = tree[idx] + tree[idx^1];
    }
    this.query = (left,right) =>{
        const {N,tree} = this;
        let sum = BigInt(0);
        for(left+=N, right+=N+1; left<right; left>>=1 ,right>>=1){
            if(left & 1) sum += tree[left++];
            if(right & 1) sum +=tree[--right];
        }
        return sum;
    }
}
const solution = input =>{
    const [N,Q] = input[0].split(' ').map(Number);
    const arr = input[1].split(' ').map(num => BigInt(num));
    Seg.prototype.arr = arr;
    const seg = new Seg(N);
    seg.init();
    let answer = '';
    for(let i=2; i<2+Q; i++){
        const [x,y,a,b] = input[i].split(' ');
        answer+= (+x < +y ? `${seg.query(+x-1,+y-1)}\n` : `${seg.query(+y-1,+x-1)}\n`)
        seg.update(+a-1,BigInt(b));
    }
    console.log(answer.trim());
}
solution(input);