// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

//const input = ['6','0 0 0 0 0 0','0 1 0 0 0 0','0 0 0 0 0 0','0 0 0 0 0 0','0 0 0 0 0 0','0 0 0 0 0 0']
//const input = ['3','0 0 0','0 0 0','0 0 0'];
const input =['4','0 0 0 0','0 0 0 0','0 0 0 0','0 0 0 0'];
const N = +input[0];
const house = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(num =>+num));
const [HORIZON,VERTICAL,CROSS]=[0,1,2];
const mx = [1,0,1];
const my = [0,1,1];
// const movePos =[
//     [[0,1,horizon],[1,1,cross]],
//     [[1,0,vertical],[1,1,cross]],
//     [[1,0,vertical],[0,1,horizon],[1,1,cross]]
// ]
const isValidPos = (y,x) => (y >=0 && x>=0 && y<N && x<N);
const isValidCross =(y,x) =>(house[y][x+1]===0 && house[y+1][x+1]===0 && house[y+1][x] ===0)
//let answer =bfs([0,1,horizon]);
let answer = 0;
dfs(0,1,HORIZON)
console.log(answer);
function dfs(y,x,direction){
    if(y ===N-1 && x===N-1){
        answer++;
        return;
    }

    for(let i=0; i<3; i++){
        if(direction === HORIZON && i === VERTICAL) continue;
        if(direction === VERTICAL && i=== HORIZON) continue;
        
        const [nextY,nextX] = [y+my[i],x+mx[i]];
        if(!isValidPos(nextY,nextX) || house[nextY][nextX] ) continue;
        if(i===CROSS && !isValidCross(y,x)) continue;
        
        dfs(nextY,nextX,i);

    }

}



// function bfs(start){
//     let queue = [start];
//     let count = 0;
//     let startIndex=0 ;
//     let endIndex ;
   
//     while(startIndex !== queue.length){
//         endIndex = queue.length;
//         for(let i=startIndex; i<endIndex; i++){
//         const [curY,curX,direction] =queue[i];
//         if(curY===N-1 && curX ===N-1){
//             count++;
//             continue;
//         }
        
        
//         movePos[direction].forEach(([my,mx,nd])=>{
//             const [nextY,nextX] = [curY+my,curX+mx];

//             if(!isValidPos(nextY,nextX) || house[nextY][nextX] ) return;
            
//             if(nd===cross && !isValidCross(curY,curX)) return; 

//             queue.push([nextY,nextX,nd]);

//         })
//       }
//       startIndex = endIndex;

//     }
//     return count;


// }