class BinaryTree{
    constructor(number,x){
        this.number = number;
        this.x = x;
        this.left = null;
        this.right = null;
    }
    insert = (number,x) =>{
        this.x > x ?
        this._left(number,x) :
        this._right(number,x) ;
    }
    _left = (number,x) =>{
        this.left ? 
        this.left.insert(number,x) :
        this.left = new BinaryTree(number,x);
    }
    _right = (number,x) =>{
        this.right ? 
        this.right.insert(number,x) :
        this.right = new BinaryTree(number,x);
    }
    getPreOrder = (arr) =>{
        if(this !== null){
            arr.push(this.number);
            if(this.left)
            this.left.getPreOrder(arr);
            if(this.right)
            this.right.getPreOrder(arr);
        }
        return arr;
    }
    getPostOrder = (arr) =>{
        if(this !== null){
            if(this.left)
            this.left.getPostOrder(arr);
            if(this.right)
            this.right.getPostOrder(arr);
            arr.push(this.number);
        }
        return arr;
    }
}
const solution = nodeinfo =>{
    nodeinfo = nodeinfo.map(([x,y],idx)=> [idx+1,x,y]).sort((a,b) => b[2] - a[2]);
    const binaryTree = new BinaryTree(nodeinfo[0][0],nodeinfo[0][1]);
    for(let i=1; i<nodeinfo.length; i++){
        const [number,x,y] = nodeinfo[i];
        binaryTree.insert(number,x);
    }
    return [binaryTree.getPreOrder([]),binaryTree.getPostOrder([])];
}
console.log(solution([[5,3],[11,5],[13,3],[3,5],[6,1],[1,3],[8,6],[7,2],[2,2]]))