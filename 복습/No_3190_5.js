//const input = ['6','3','3 4','2 5','5 3','3','3 D','15 L','17 D'];
//const input = ['10','4','1 2','1 3','1 4','1 5','4','8 D','10 D','11 D','13 L'];
//const input = ['10','5','1 5','1 3','1 2','1 6','1 7','4','8 D','10 D','11 D','13 L'];

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const K = +input[1];
const apple = Array.from({length:K},(_,i)=>input[i+2].split(' ').map(num => +num -1));
const L = +input[K+2];
const command = Array.from({length:L},(_,i)=>input[K+3+i].split(' '));
const [dy,dx] = [[0,1,0,-1],[1,0,-1,0]];
// 동 남 서 북;
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
const moveSnake = (dir,head,snake,apple) =>{
      const [y,x] = head;
      const [ny,nx] = [y+dy[dir],x+dx[dir]];
      if(!isValidPos(ny,nx) || snake.has(`${ny},${nx}`)) return true;
      snake.add(`${ny},${nx}`);
      head[0] = ny , head[1] = nx;
      const appleIndex = apple.findIndex(([y,x]) => y===ny && x===nx);
      if(appleIndex !==-1){
         apple.splice(appleIndex,1);
      }
      else{
          const tail = snake.values().next().value;
          snake.delete(tail);
      }
      return false;
}
const solution = (apple,command) =>{
    let [y,x,d] = [0,0,0];
    let snake = new Set();
    let head = [y,x];
    snake.add(head.join(','));
    let time = 0 , i = 0;
    while(true){
        if(command[i]){
            const [t,dir] = command[i];
            if(parseInt(t) === time){
                d = dir === 'L' ? d-1 < 0 ? 3 : d-1 : d+1 > 3 ? 0 : d+1;
                i++;
            }
        }
        const isFinish = moveSnake(d,head,snake,apple);
        time++;
        if(isFinish) return console.log(time);
    }
    
}
solution(apple,command);