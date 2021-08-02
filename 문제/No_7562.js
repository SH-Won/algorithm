const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const input =[
//     '3','8','0 0','7 0','100','0 0','30 50','10','1 1','1 1'
// ]

let inputIndex = 0;
let T = +input[inputIndex++];

while(T--){
    const L = +input[inputIndex++];
    let chessBoard = Array.from({length:L},()=>Array(L).fill(0));
    const [startY,startX] = input[inputIndex++].split(' ').map(num => +num);
    const [endY,endX] = input[inputIndex++].split(' ').map(num => +num);
    const distance = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];

    bfs(startY,startX);

    function bfs(startY,startX){
        let t = 0;
        let queue = [[startY,startX,t]]
        chessBoard[startY][startX] = 1;

        while(queue.length){
            const [curY,curX,curT] =queue.shift();

            if(curY === endY && curX ===endX){
                console.log(curT);
                break;
            }
            
            distance.forEach(([y,x])=>{
                const [nextY,nextX,nextT] = [curY+y,curX+x,curT+1];
                if(nextY < 0 || nextX <0 || nextY >=L || nextX>=L){
                    return;
                }
                if(!chessBoard[nextY][nextX]){
                    chessBoard[nextY][nextX] = 1;
                    queue.push([nextY,nextX,nextT])
                }
            })
           

        }
    }

}