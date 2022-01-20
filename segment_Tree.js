let array = [3,5,6,7,2,9,4,5,2,8,1,5];
const h = Math.ceil(Math.sqrt(array.length));
const size = 1 << (h+1);
let tree = Array(size);

const makeTree = (arr,tree,node,start,end) =>{
    if(start === end){
        return tree[node] = arr[start];
    }
    const mid = (start+end) / 2 >>0;
    return tree[node] = makeTree(arr,tree,node*2,start,mid) + makeTree(arr,tree,node*2+1,mid+1,end);
}
makeTree(array,tree,1,0,array.length-1);

const update = (tree,node,start,end,index,diff) =>{
    if(index < start || index > end) return;
    tree[node] +=diff;
    if(start !== end){
        const mid = (start+end) / 2 >> 0;
        update(tree,node*2,start,mid,index,diff);
        update(tree,node*2+1,mid+1,end,index,diff);
    }
}
// update(tree,1,0,array.length-1,4,10-array[4]);

const sum = (tree,node,left,right,start,end) =>{
    if(left > end || right < start) return 0;
    if(left <=start && end <=right) return tree[node];
    const mid = (start+end) / 2 >>0;
    return sum(tree,node*2,left,right,start,mid) + sum(tree,node*2+1,left,right,mid+1,end);
    
}
// console.log(sum(tree,1,8,11,0,array.length-1))

class Seg{
    constructor(tree){
        this.n = tree.length;
        this.tree = Array(tree.length).concat(tree);
    }
    init(){
        for(let i=this.n-1; i > 0; i--){
            this.tree[i] = this.tree[i << 1] + this.tree[i<<1|1]
        }
    }
    update(index,value){
        for(this.tree[index+=this.n]+=value; index > 1; index >>=1){
            this.tree[index>>1] = this.tree[index] + this.tree[index^1];
        }
    }
    query(left,right){
        let result = 0;
        for(left+=this.n, right+=this.n+1; left < right; left >>=1, right >>=1 ){
             if(left & 1) result+= this.tree[left++];
             if(right & 1) result += this.tree[--right];
        }
        return result;
    }
}
const seg = new Seg([5,4,3,2,1,0]);
seg.init();
const rangeSum = seg.query(3,5);
console.log(rangeSum);
