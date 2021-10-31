//const input = ['6','3','3 4','2 5','5 3','3','3 D','15 L','17 D'];
//const input = ['10','4','1 2','1 3','1 4','1 5','4','8 D','10 D','11 D','13 L'];
const input = ['10','5','1 5','1 3','1 2','1 6','1 7','4','8 D','10 D','11 D','13 L'];

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = (input) =>{
    let index = 0;
    const N = +input[index++];
    const K = +input[index++];
    let apple = Array.from({length:K},()=>input[index++].split(' ').map(num => +num -1));
    const L = +input[index++];
    const command = Array.from({length:L},()=>input[index++].split(' '));
    const dy = [0,1,0,-1];
    const dx = [1,0,-1,0];
    const isValidPos = (y,x)=>(y>=0 && x>=0 && y<N && x<N);
    
    let head = {y:0,x:0} , tail = {y:0,x:0} , dir = 0;
    let snake = new Set();
    snake.add('0,0');
    const moveSnake = () =>{
         const [ny,nx] = [head.y + dy[dir] , head.x + dx[dir]];
         if(snake.has(`${ny},${nx}`) || !isValidPos(ny,nx)) return true;
         snake.add(`${ny},${nx}`);
         head.y = ny , head.x = nx;
         const appleIndex = apple.findIndex(([y,x]) => y === ny && x===nx);
         if(appleIndex === -1){
             snake.delete(`${tail.y},${tail.x}`);
             const [y,x] = snake.values().next().value.split(',');
             tail.y = y , tail.x = x;
         }
         else{
             apple.splice(appleIndex,1);
         }
         return false;
    }
    
    let i = 0 , time =0 , isEnd = false;
    while(!isEnd){
        if(command[i] && time === parseInt(command[i][0])){
           dir = command[i][1] === 'D' ? dir+1 > 3 ? 0 : dir+1 : dir-1 < 0 ? 3 : dir-1
           i++;
        }
        time++;
        isEnd = moveSnake();
    }
    console.log(time);
}
solution(input);