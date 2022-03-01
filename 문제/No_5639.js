const input = ['50','30','24','5','28','45','98','52','60'];
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class BinaryTree{
    constructor(key){
        this.key = key;
        this.left = null;
        this.right = null;
    }
    insert = key =>{
        this.key > key ?
        this._left(key) :
        this._right(key);
    }
    _left = key =>{
        this.left ?
        this.left.insert(key) :
        this.left = new BinaryTree(key);
    }
    _right = key =>{
        this.right ?
        this.right.insert(key) :
        this.right = new BinaryTree(key);
    }
    getPostOrder = arr => {
        if(this.left) this.left.getPostOrder(arr);
        if(this.right) this.right.getPostOrder(arr);
        arr.push(this.key);
        return arr;
    }
}
const solution = input =>{
    const binaryTree = new BinaryTree(+input[0]);
    for(let i=1; i<input.length; i++){
        binaryTree.insert(+input[i]);
    }
    console.log(binaryTree.getPostOrder([]).join('\n'));
}
solution(input);