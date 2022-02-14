// const input = ['5 2 2','1','2','3','4','5','1 3 0','2 2 5','1 3 6','2 2 5'];
// const input = ['5 2 2','1','2','3','4','5','1 3 6','2 2 5','1 5 2','2 3 5']
// const input = ['4 1 2','1000000','1000000','1000000','1000000','2 1 4','1 2 1','2 1 4']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

class Seg{
    constructor(N){
        this.N = N;
        this.tree = Array(2*N);
    }
    init(){
        const {N,tree,arr,MOD} = this;
        for(let i=0; i<N; i++) tree[i+N] = arr[i];
        for(let i=N-1; i>0; i--) tree[i] = (tree[i<<1] * tree[i<<1|1]) % MOD ;
    }
    update(idx,value){
        const {N,tree,MOD} = this;
        tree[N+idx] = value;
        for(idx+=N; idx>1; idx>>=1) tree[idx>>1] = (tree[idx] * tree[idx^1]) % MOD ;
    }
    query(left,right){
        const {N,tree,MOD} = this;
        let sum = BigInt(1);
        for(left+=N, right+=N+1; left < right; left>>=1, right>>=1){
            if(left & 1) sum = (sum*tree[left++]) % MOD;
            if(right & 1) sum = (sum*tree[--right]) % MOD;
            if(sum === BigInt(0)) return sum;
        }
        return sum % MOD;
    }
}
const solution = input =>{
    const [N,M,K] = input[0].split(' ').map(Number);
    const numbers = Array.from({length:N},(_,i) => BigInt(input[i+1]));
    const MOD = BigInt(1000000007);
    Seg.prototype.arr = numbers;
    Seg.prototype.MOD = MOD;
    const seg = new Seg(N);
    seg.init();
    let answer = '';
    for(let i=N+1; i<N+M+K+1; i++){
        const [a,b,c] = input[i].split(' ').map(Number);
        if(a === 1) seg.update(b-1,BigInt(c));
        else answer +=`${seg.query(b-1,c-1)}\n`
    }
    console.log(answer.trim());
}
solution(input);
