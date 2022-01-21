const input = ['5 2 2','1','2','3','4','5','1 3 6','2 2 5','1 5 2','2 3 5']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

class Seg{
    constructor(n){
        this.n = n;
        this.tree = Array(2*n);
    }
    init(){
         const {n} = this;
         for(let i=0; i<n; i++) this.tree[i+n] = this.array[i];
         for(let i=n-1; i>0; i--) this.tree[i] = this.tree[i<<1] + this.tree[i<<1|1];
    }
    update(index,value){
        const {n} = this;
        this.tree[index+n] = value;
        for(index+=n; index>1; index>>=1) this.tree[index>>1] = this.tree[index] + this.tree[index^1];

    }
    query(left,right){
        const {n} = this;
        let sum = BigInt(0);
        for(left+=n, right+=n+1; left<right; left>>=1, right>>=1){
            if(left & 1) sum+= this.tree[left++];
            if(right & 1) sum+= this.tree[--right];
        }
        return sum;
    }
}
const solution = (input) =>{
    const [N,M,K] = input[0].split(' ').map(Number);
    const array = Array.from({length:N},(_,i)=>BigInt(input[i+1]));
    Seg.prototype.array = array;
    const seg = new Seg(N);
    seg.init();
    let answer = '';
    for(let i=1+N; i<N+M+K+1; i++){
        const [a,b,c] = input[i].split(' ').map(Number);
        if(a === 1) seg.update(b-1,BigInt(c));
        else answer += `${parseInt(seg.query(b-1,c-1))}\n`;
    }
    console.log(answer.trim());
}
solution(input);
