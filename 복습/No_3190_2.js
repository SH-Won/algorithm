//const input = ['6','3','3 4','2 5','5 3','3','3 D','15 L','17 D'];
//const input = ['10','4','1 2','1 3','1 4','1 5','4','8 D','10 D','11 D','13 L'];
//const input = ['10','5','1 5','1 3','1 2','1 6','1 7','4','8 D','10 D','11 D','13 L'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = () =>{
    let index = 0;
    const N = +input[index++];
    const K = +input[index++];
    let apple = Array.from({length:K},()=>input[index++].split(' ').map(num => +num-1));
    const L = +input[index++];
    const command = Array.from({length:L},()=>input[index++].split(' '));
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
    const dy=[0,1,0,-1];
    const dx=[1,0,-1,0];
    let snake = new Set();
    let dir = 0;
    let head = {y:0,x:0};
    let tail = head;
    snake.add(`${head.y},${head.x}`);
    const move = () =>{
        const {y,x} = head;
        const [ny,nx] = [y+dy[dir],x+dx[dir]];
        if(!isValidPos(ny,nx) || snake.has(`${ny},${nx}`)) return true;
        head = {y:ny,x:nx};
        snake.add(`${ny},${nx}`);
        const appleIndex = apple.findIndex(([y,x])=> y===ny && x===nx);
        if(appleIndex === -1){
            const {y,x} = tail;
            snake.delete(`${y},${x}`);
            const [ty,tx] = [...snake][0].split(',');
            tail.y = ty; 
            tail.x = tx;
        }
        else{
            apple.splice(appleIndex,1);
        }
        return false;
    }
    let gameTime = 0;
    let i = 0;
    let isEnd = false;
    while(!isEnd){
        if(command[i] && parseInt(command[i][0]) === gameTime){
            const direction = command[i][1];
            dir = direction ==='D' ? ((dir+1)+4) % 4 : ((dir-1)+4) % 4;
            i++;
        }
        gameTime++;
        isEnd = move();
    }
    console.log(gameTime);
}
solution();