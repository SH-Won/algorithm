class Seg{
    constructor(matrix){
        this.N = matrix.length;
        this.M = matrix[0].length;
        this.matrix = matrix;
        this.tree = Array.from({length:this.N*2},()=>Array(this.M*2));
    } 
    init(){
        for(let y=0; y<this.N; y++){
            for(let x=0; x<this.M; x++){
                this.tree[y+this.N][x+this.M] = this.matrix[y][x];
            }
        }
        for(let y=this.N; y<this.tree.length; y++){
            for(let x=this.M-1; x > 0; x--){
                this.tree[y][x] = this.tree[y][x<<1] + this.tree[y][x<<1|1];
            }
        }
        for(let y=this.N-1; y>0; y--){
            for(let x=1; x<this.M*2; x++){
                this.tree[y][x] = this.tree[y<<1][x] + this.tree[y<<1|1][x];
            }
        }
    }
    update(y,x,value){
        const {N,M} = this;
        this.tree[y+N][x+M] =value;
        for(let i=x+M; i>1; i>>=1) this.tree[y+N][i>>1] = this.tree[y+N][i] + this.tree[y+M][i^1];
        for(y+=N; y>1; y>>=1){
            
            for(let i=x+M ; i>0; i>>=1){
                this.tree[y>>1][i] = this.tree[y][i] + this.tree[y^1][i];
            }
        }
    }
    queryX(y,x1,x2){
        const {M} = this;
        let sum = 0;
        for(x1+=M , x2+=M+1; x1<x2; x1>>=1 , x2>>=1){
            if(x1 & 1) sum+= this.tree[y][x1++];
            if(x2 & 1) sum+= this.tree[y][--x2];
        }
        return sum;
    }
    query(y1,x1,y2,x2){
         const {N} = this;
         let sum = 0;
         for(y1+=N, y2+=N+1; y1<y2; y1>>=1, y2>>=1){
             if(y1 & 1) sum+= this.queryX(y1++,x1,x2);
             if(y2 & 1) sum+= this.queryX(--y2,x1,x2);
         }
         return sum;
    }
}

const seg = new Seg([[1,2,1,3],[1,2,4,3],[4,1,6,2],[2,6,1,7]]);
seg.init();
const sum = seg.query(0,0,2,2);
console.log(sum);