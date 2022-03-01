const input = ['7','A B C','B D .','C E F','E . .','F . G','D . .','G . .'];
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class BinaryTree{
     constructor(value){
         this.value = value;
         this.left = null;
         this.right = null;
     }
     getPreOrder = (arr) =>{
         arr.push(this.value);
         if(this.left)
         this.left.getPreOrder(arr);
         if(this.right)
         this.right.getPreOrder(arr);
         return arr;
     }
     getMidOrder = (arr) =>{
        if(this.left)
        this.left.getMidOrder(arr);
        arr.push(this.value);
        if(this.right)
        this.right.getMidOrder(arr);
        return arr;
     }
     getPostOrder = (arr) =>{
         if(this.left)
         this.left.getPostOrder(arr);
         if(this.right)
         this.right.getPostOrder(arr);
         arr.push(this.value);
         return arr;
     }
}
const solution = input =>{
    const N = +input[0];
    let nodes = {};
    for(let i=1; i<1+N; i++){
        const [parent,left,right] = input[i].split(' ')
        if(!nodes[parent]) nodes[parent] = new BinaryTree(parent);
        if(!nodes[left] && left !=='.'){
            nodes[left] = new BinaryTree(left);
            nodes[parent].left = nodes[left];
        }
        if(!nodes[right] && right !=='.'){
            nodes[right] = new BinaryTree(right);
            nodes[parent].right = nodes[right];
        }
    }
    const preOrder = nodes['A'].getPreOrder([]);
    const midOrder = nodes['A'].getMidOrder([]);
    const postOrder = nodes['A'].getPostOrder([]);
    console.log(preOrder.join('')+'\n'+midOrder.join('')+'\n'+postOrder.join(''));
}
solution(input);