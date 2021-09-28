//const input = ['6','3','3 4','2 5','5 3','3','3 D','15 L','17 D'];
//const input = ['10','4','1 2','1 3','1 4','1 5','4','8 D','10 D','11 D','13 L'];
const input = ['10','5','1 5','1 3','1 2','1 6','1 7','4','8 D','10 D','11 D','13 L'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let index = 0;
const N = +input[index++];
const K = +input[index++];
const apple = Array.from({length:K},()=>input[index++].split(' ').map(num => +num-1));
const L = +input[index++];
const info = Array.from({length:L},()=>input[index++].split(' '));
const direction = [[0,1],[1,0],[0,-1],[-1,0]];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);

const solution = (apple) =>{
    let snake = new Set();
    let head = [0,0];
    let tail = [0,0];
    snake.add('0,0');
    let dir = 0;
    
    let isFinish = false;
    const moveSnake = () =>{
        const [y,x] = head;
        const [ny,nx] = [y+direction[dir][0],x+direction[dir][1]];
        if(!isValidPos(ny,nx) || snake.has(`${ny},${nx}`) ) return true;
        head = [ny,nx];
        snake.add(`${ny},${nx}`);
        const appleIdx = apple.findIndex(([y,x])=> y===ny && x===nx);
        if(appleIdx === -1){
            const [ty,tx] = tail;
            snake.delete(`${ty},${tx}`);
            tail = [...snake][0].split(',');
        }
        else{
            apple.splice(appleIdx,1);
        }
        return false;
    }
    
    const gameStart = () =>{
        let i = 0;
        let gameTime = 0;
        while(!isFinish){
            if(info[i] && parseInt(info[i][0]) === gameTime){
                const direction = info[i][1];
                dir = direction ==='D' ? ((dir+1)+4) % 4 : ((dir-1)+4) % 4
                i++;
            }
            gameTime++;
            isFinish = moveSnake();
        }
        return gameTime;
    }
    const playTime = gameStart();
    console.log(playTime);
}
solution(apple);