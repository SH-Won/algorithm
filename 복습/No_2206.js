// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// const input =[
//     '6 4','0000','1110','1000','0000','0111','0000'
// ]
const input =[
    '4 4','0111','1111','1111','1110'
]
const [row,column] = input[0].split(' ').map(num => +num);

let visited = Array.from({length:row},()=>Array.from({length:column},()=>Array(2).fill(0)));
let maze = Array.from({length:row},(_,i)=>input[i+1].split('').map(num => +num));
console.log(bfs(0,0));

function bfs(y,x){
    
    let queue = [[y,x,1]];
    visited[y][x][1] =1;

    while(queue.length){
        const [curY,curX,block] = queue.shift();
        
       
        if(curY === row-1 && curX === column -1){
            return visited[row-1][column-1][block];
        }

        [[curY+1,curX],[curY-1,curX],[curY,curX+1],[curY,curX-1]]
        .forEach(([y,x])=>{
            if(y<0 || x<0 || y>=row || x>=column) return;

            if(!visited[y][x][block]){

                if(maze[y][x] === 1 && block){
                    queue.push([y,x,block-1]);
                    visited[y][x][block-1] = visited[curY][curX][block] +1;
                }
                if(maze[y][x] === 0){
                   
                    queue.push([y,x,block]);
                    visited[y][x][block] = visited[curY][curX][block] +1 
                }

            }
        })
    }
    return -1;
}