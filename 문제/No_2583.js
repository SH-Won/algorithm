const input = ['5 7 3','0 2 4 4','1 1 2 5','4 0 6 2']

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [row,column,k] = input[0].split(' ').map(num =>+num);
const divRange = Array.from({length:k},(_,i)=>input[i+1].split(' ').map(num =>+num));
let map = Array.from({length:row},()=>Array(column).fill(false));
let divCount = 0;
let divSpace = []
const cutPaper = (x1,y1,x2,y2) =>{

    for(let i=y1; i<y2; i++){
        for(let j=x1; j<x2; j++){
            if(!map[i][j])  map[i][j] = true;
           
        }
    }
} 
const isValidPos = (y,x) => (y>=0 && x>=0 && y<row && x<column);
// StackSizeExceeded
// const dfs = (y,x) =>{

//     map[y][x] = true;

//     [[1,0],[-1,0],[0,1],[0,-1]]
//     .forEach(([my,mx])=>{
//         const [ny,nx] = [y+my,x+mx];
//         if(!isValidPos(ny,nx) || map[ny][nx]) return;
//         divNumber++;
//         dfs(ny,nx);
//     })
// }
const bfs = (y,x) =>{
    map[y][x] = true;
    let queue =[[y,x]];
    let count = 1;
    while(queue.length){
        const [cy,cx] = queue.shift();
        
        [[1,0],[-1,0],[0,1],[0,-1]]
        .forEach(([my,mx])=>{
            const [ny,nx] = [cy+my,cx+mx];
            if(!isValidPos(ny,nx)|| map[ny][nx] ) return;
            queue.push([ny,nx]);
            map[ny][nx] = true;
            count++;
        })
    }
    return count;
}
// solution
for(let i=0; i<k; i++){
    const [x1,y1,x2,y2] = divRange[i];
    cutPaper(x1,y1,x2,y2);
}

for(let i=0; i<row; i++){
    for(let j=0; j<column; j++){
        if(!map[i][j]){
          const divNumber = bfs(i,j);
          divCount++;
          divSpace.push(divNumber);
        }
    }
}

divSpace.sort((a,b)=>a-b);
console.log(`${divCount}\n${divSpace.join(' ')}`)