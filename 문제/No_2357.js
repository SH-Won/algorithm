const input = ['10 4','75','30','100','38','50','51','52','20','81','5','1 10','3 5','6 9','8 10']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

class Seg{
    constructor(N){
        this.N = N;
        this.minTree = Array(2*N);
        this.maxTree = Array(2*N);
    }
    init(){
        const {N,minTree,maxTree,arr} = this;
        for(let i=0; i<N; i++) minTree[i+N] = maxTree[i+N] = arr[i];
        for(let i=N-1; i>0; i--){
            minTree[i] = Math.min(minTree[i<<1],minTree[i<<1|1]);
            maxTree[i] = Math.max(maxTree[i<<1] , maxTree[i<<1|1]);
        }
    }
    query(left,right,state){
        const {N,minTree,maxTree} = this;
        let min = Infinity , max = 0;
        for(left+=N, right+=N+1; left<right; left>>=1 , right>>=1){
            if(left & 1){
               if(state ==='min') min = Math.min(minTree[left++],min);
               else max = Math.max(maxTree[left++],max);
            }
            if(right & 1){
                if(state === 'min') min = Math.min(minTree[--right],min);
                else max = Math.max(maxTree[--right],max);
            }
        }
        return state === 'min' ? min : max;
    }
}

const solution = input => {
    const [N,M] = input[0].split(' ').map(Number);
    const arr = Array.from({length:N},(_,i) => +input[i+1]);
    Seg.prototype.arr = arr;
    const seg = new Seg(N);
    seg.init();
    let answer = ''
    for(let i=N+1; i<N+M+1; i++){
        const [a,b] = input[i].split(' ').map(num => +num -1);
        answer += `${seg.query(a,b,'min')} ${seg.query(a,b,'max')}\n`
    }
    console.log(answer.trim());
}
solution(input);


// class Seg{
//     constructor(N){
//         this.N = N;
//         this.tree = Array(2*N);
//     }
//     init(){
//         const {N,tree,arr} = this;
//         for(let i=0; i<N; i++) tree[i+N] = {max:arr[i],min:arr[i]}
//         for(let i=N-1; i>0; i--) tree[i] = {max:Math.max(tree[i<<1].max, tree[i<<1|1].max) , min : Math.min(tree[i<<1].min, tree[i<<1|1].min)};
//     }
//     query(left,right){
//         const {N,tree} = this;
//         let max = Math.max(tree[left+N].max,tree[right+N].max) , min = Math.min(tree[left+N].min , tree[right+N].min);
//         for(left+=N, right+=N+1; left<right; left>>=1,right>>=1){
//             if(left & 1) max = Math.max(max,tree[left++].max) , min = Math.min(min,tree[left].min);
//             if(right & 1) max = Math.max(max,tree[--right].max) , min = Math.min(min , tree[right].min);
//         }
//         return `${min} ${max}`;
//     }
// }