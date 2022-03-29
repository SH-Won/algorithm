// const input =['1 1 1','1','1 1 1'];
// const input =['5 2 1','2 3 2 3 2','2 3 2 3 2','2 3 2 3 2','2 3 2 3 2','2 3 2 3 2','2 1 3','3 2 3']
// const input =[
//     '5 2 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 1 3',
// '3 2 3',
// ]
// const input =[
//     '5 2 3',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 1 3',
// '3 2 3',
// ]
// const input =[
//         '5 2 4',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 1 3',
// '3 2 3',
// ]
const input =[
    '5 2 6',
'2 3 2 3 2',
'2 3 2 3 2',
'2 3 2 3 2',
'2 3 2 3 2',
'2 3 2 3 2',
'2 1 3',
'3 2 3',
]
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

class Tree{
    constructor(y,x,age){
        this.y = y;
        this.x = x;
        this.age = age;
    }
}
function isGrow(){
    const {y,x,age} = this;
    if(age > this.nutrients[y][x]) return false;
    this.nutrients[y][x]-=age;
    this.age++;
    return true;
}
function spread(){
    const {y,x,age} = this;
    if(age % 5 !== 0) return;
    for(let i=0; i<8; i++){
        const [ny,nx] = [y+this.dy[i],x+this.dx[i]];
        if(ny < 0 || nx < 0 || ny >= this.map.length || nx >= this.map.length) continue;
        this.map[ny][nx].push(new Tree(ny,nx,1));
    }
}
const process = (map,nutrients,A) =>{
    map.forEach((row,y) =>
        row.forEach((trees,x) =>{
            if(!trees.length) return;
            trees.sort((a,b) => a.age - b.age);
            let i = 0;
            while(i < trees.length && trees[i].isGrow()) i++ ;
            let count = trees.length - i;
            while(count--) nutrients[y][x] += Math.floor(trees.pop().age / 2);
        })
    )
    map.forEach((row,y) => 
        row.forEach((trees,x) =>{
            nutrients[y][x] += A[y][x];
            if(!trees.length) return;
            trees.forEach(tree => tree.spread());
        })
    )
}
const solution = input =>{
    let [N,M,K] = input[0].split(' ').map(Number);
    const nutrients = Array.from({length:N},()=>Array(N).fill(5));
    const A = Array.from({length:N}, (_,i) => input[i+1].split(' ').map(Number));
    const map = Array.from({length:N},()=>Array.from({length:N},() => []));
    const [dy,dx] = [[-1,-1,-1,0,0,1,1,1],[-1,0,1,-1,1,-1,0,1]];
    Tree.prototype.nutrients = nutrients, Tree.prototype.map = map;
    Tree.prototype.isGrow = isGrow , Tree.prototype.spread = spread;
    Tree.prototype.dy = dy , Tree.prototype.dx = dx;
    for(let i=1+N; i<1+N+M; i++){
        const [y,x,age] = input[i].split(' ').map(Number);
        map[y-1][x-1].push(new Tree(y-1,x-1,age));
    }
    while(K--){
        process(map,nutrients,A);
    }
    const trees = map.reduce((acc,row) => acc+=row.reduce((acc,trees) => acc+=trees.length ,0),0);
    console.log(trees);
}
solution(input);
