// const input = ['5 4','2 2','1 1 E','5 4 W','1 F 7','2 F 7']
const input = ['5 5','2 3','3 3 E','4 5 N','2 L 3','2 R 8','2 F 3']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class Robot{
    constructor(y,x,d,number){
        this.y = y;
        this.x = x;
        this.d = d;
        this.number = number;
    }
    move = (command,count) =>{
        const {y,x,d,dy,dx,map} = this;
        if(command ==='F'){
            let [ny,nx] = [y+dy[d],x+dx[d]];
            while(count && this.isValidPos(ny,nx) && !map[ny][nx]){
                ny+=dy[d] , nx+=dx[d], count--;
            }
            if(count === 0){
                this.y = ny-dy[d] , this.x = nx-dx[d] , map[this.y][this.x] = this;
                map[y][x] = null;
                return 'OK';
            }
            else{
                if(this.isValidPos(ny,nx)){
                    return `Robot ${this.number} crashes into robot ${map[ny][nx].number}`
                }
                return `Robot ${this.number} crashes into the wall`
            }
        }
        else{
            count %= 4;
            this.d = command === 'L' ? (d+count+4) % 4 : (d-count+4) % 4;
            return 'OK';
        }
    }
}
const solution = input =>{
    const dir = {'E':0,'N':1,'W':2,'S':3};
    const [dy,dx] = [[0,1,0,-1],[1,0,-1,0]];
    const [A,B] = input[0].split(' ').map(Number);
    // A 가로
    const [N,M] = input[1].split(' ').map(Number);
    const robots = Array.from({length:N},(_,i)=>{
        const [x,y,d] = input[i+2].split(' ');
        return new Robot(+y-1,+x-1,dir[d],i+1);
    })
    const map = Array.from({length:B},()=>Array(A).fill(null));
    Robot.prototype.dy = dy; Robot.prototype.dx = dx;
    Robot.prototype.map = map; Robot.prototype.isValidPos = function(y,x){ return y>=0 && x>=0 && y<B && x<A};
    robots.forEach(robot => map[robot.y][robot.x] = robot);
    for(let i=2+N; i<2+N+M; i++){
        const [num,command,count] = input[i].split(' ');
        const message = robots[+num -1].move(command,+count);
        if(message !== 'OK') return console.log(message);
    }
    console.log('OK');
}
solution(input);