class BinaryTree{
    constructor(x,number){
        this.number = number;
        this.x = x;
        this.left = null;
        this.right = null;
    }
    insert = (x,number) =>{
        this.x > x ?
        this._left(x,number) :
        this._right(x,number) ;
    }
    _left = (x,number) =>{
        this.left ? 
        this.left.insert(x,number) :
        this.left = new BinaryTree(x,number);
    }
    _right = (x,number) =>{
        this.right ?
        this.right.insert(x,number) :
        this.right = new BinaryTree(x,number);
    }
    getPreOrder = (arr) =>{
        arr.push(this.number);
        if(this.left) this.left.getPreOrder(arr);
        if(this.right) this.right.getPreOrder(arr);
        return arr;
    }
    getPostOrder = (arr) =>{
        if(this.left) this.left.getPostOrder(arr);
        if(this.right) this.right.getPostOrder(arr);
        arr.push(this.number);
        return arr;
    }
}
const solution = nodeinfo =>{
    nodeinfo = nodeinfo.map(([x,y],idx) => [x,y,idx+1]).sort((a,b) => b[1]-a[1]);
    const binaryTree = new BinaryTree(nodeinfo[0][0],nodeinfo[0][2]);
    for(let i=1; i<nodeinfo.length; i++) binaryTree.insert(nodeinfo[i][0],nodeinfo[i][2]);
    return [binaryTree.getPreOrder([]),binaryTree.getPostOrder([])];
}
console.log(solution([[5,3],[11,5],[13,3],[3,5],[6,1],[1,3],[8,6],[7,2],[2,2]]))