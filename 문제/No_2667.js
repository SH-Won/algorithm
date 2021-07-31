const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// const input =[
//     '7',
//     '0110100',
//     '0110101',
//     '1110101',
//     '0000111',
//     '0100000',
//     '0111110',
//     '0111000'
// ]
const N = +input[0]
const X = [1,-1,0,0];
const Y = [0,0,1,-1];
let graph = Array.from({length:N},(_,i)=>input[i+1].split('').map(num=>+num));


let homeGroup = [];
let homeCount = 0;

for(let i=0; i<N; i++){
    for(let j=0; j<N; j++){
        if(graph[i][j] ===1){
        dfs(i,j);
       
        homeGroup.push(homeCount);
        homeCount=0;
        }
 

   }
}
homeGroup.sort((a,b)=> a-b);
console.log(`${homeGroup.length}\n${homeGroup.join('\n')}`.trim())

function dfs(x,y){
    if(!range(x,y) || graph[x][y] ===0) return

    if(range(x,y) && graph[x][y] === 1){
         
         graph[x][y]=0;
         homeCount+=1;

         for(let i=0; i<4; i++){
             dfs(x+X[i],y+Y[i])
         }
    }
}
function range(x,y){

    if(x < 0 || y < 0 || x >=N || y >= N){
        return false;
    }
    return true;
    // if(x >= 0 && y >= 0 && x < N && y <N){
    //     return true;
    // }
    // return false;

}