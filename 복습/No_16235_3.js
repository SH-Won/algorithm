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
// const input =[
//     '5 2 6',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 1 3',
// '3 2 3',
// ]
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

function Tree(y,x,age){
    this.y = y;
    this.x = x;
    this.age = age;  
}
function breed(){
    const {y,x,age,N} = this;
    if(age % 5 !== 0) return;
    for(let i=0; i<8; i++){
        const [ny,nx] = [y+this.dy[i],x+this.dx[i]];
        if(ny < 0 || nx <0 || ny >=N || nx >=N) continue;
        this.map[ny][nx].push(new Tree(ny,nx,1));
    }
}
const spring_summer = (map,nutrient) =>{
    for(let y=0; y<map.length; y++){
        for(let x=0; x<map.length; x++){
            const trees = map[y][x];
            if(trees.length){
                trees.sort((a,b) => a.age - b.age);
                let i;
                for(i=0; i<trees.length; i++){
                    const tree  = trees[i];
                    if(nutrient[y][x] >= tree.age){
                        nutrient[y][x]-=tree.age;
                        tree.age++;
                        continue;
                    }
                    else break;
                }
                let length = trees.length - i;
                while(length--){
                    const tree = trees.pop();
                    nutrient[y][x] += (tree.age / 2 >>0)
                }
            }
        }
    }
}
const fall_winter = (map,nutrient,A)=>{
    for(let y=0; y<map.length; y++){
        for(let x=0; x<map.length; x++){
            const trees = map[y][x];
            if(trees.length){
                trees.forEach(tree => tree.breed());
            }
            nutrient[y][x] += A[y][x];
        }
    }
} 
const solution = (input) =>{
    const [N,M,K] = input[0].split(' ').map(Number);
    const A = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    let map = Array.from({length:N},()=>Array.from({length:N},()=>[]));
    let nutrient = Array.from({length:N},()=>Array(N).fill(5)); 
    for(let i=N+1; i<N+M+1; i++){
        const [y,x,age] = input[i].split(' ').map(Number);
        map[y-1][x-1].push(new Tree(y-1,x-1,age));
    }
    Tree.prototype.map = map;
    Tree.prototype.dy = [-1,-1,-1,0,0,1,1,1] , Tree.prototype.dx = [-1,0,1,-1,1,-1,0,1];
    Tree.prototype.N = N , Tree.prototype.breed = breed ;
    let years = K;
    while(years--){
        spring_summer(map,nutrient);
        fall_winter(map,nutrient,A);
    }
    const answer = map.reduce((acc,cur)=> acc+=cur.reduce((acc,cur) => acc+=cur.length,0),0);
    console.log(answer);
}
solution(input);