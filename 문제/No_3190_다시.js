// const input = ['6','3','3 4','2 5','5 3','3','3 D','15 L','17 D'];
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
// D 오른쪽 L 왼쪽
 class Body {
    prev;
    next;
    position;
    constructor(y,x){
        this.position = [y,x];
    }
 }
const solution = (apple)=>{
    let snake = new Set();
    let head = new Body(0,0);
    let tail = head;
    let dir = 0;
    
    snake.add(`${head.position[0]},${head.position[1]}`)
    const moveSnake = () =>{
        const [y,x] = head.position;
        const [ny,nx] = [y+direction[dir][0],x+direction[dir][1]];
        //console.log(ny,nx);
        if(!isValidPos(ny,nx) || snake.has(`${ny},${nx}`)) return true;
        const newHead = new Body(ny,nx);
        snake.add(`${ny},${nx}`);
        head.next = newHead;
        head = newHead;
        const appleIdx = apple.findIndex(([y,x])=> y===ny && x===nx);
        if(appleIdx ===-1){
            const [ty,tx] = tail.position;
            snake.delete(`${ty},${tx}`);
            tail = tail.next; 
        }
        else{
            apple.splice(appleIdx,1);
        }
        return false;
    }
    let gameTime = 0;
    let end = false;
    let i = 0;
    while(!end){
        if(info[i] && parseInt(info[i][0]) === gameTime){
            dir = info[i][1] === 'D' ? ((dir+1)+4) % 4 : ((dir-1)+4) % 4; 
            i++;
        }
        gameTime++;
        end = moveSnake();
    }
    console.log(gameTime);
}
solution(apple);