//const input = ['100 100 0'];
//const input = ['4 6 8','4 1 3 3 8','1 3 5 2 9','2 4 8 4 1','4 5 0 1 4','3 3 1 2 7','1 5 8 4 3','3 6 2 1 2','2 2 2 3 5'];
//const input = ['4 5 4','4 1 3 3 8','1 3 5 2 9','2 4 8 4 1','4 5 0 1 4'];
const input = ['2 2 4','1 1 1 1 1','2 2 2 2 2','1 2 1 2 3','2 1 2 1 4']

//const fs = require('fs')
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [UP,DOWN,RIGHT,LEFT] = [0,1,2,3];
function move(){
   let {r,c,s,d,R,C} = this;
   if(d === UP){
       const [row,rotateCount] = this.getPos(R,r-s);
       this.r = row;
       if(rotateCount % 2 === 1) this.d = DOWN;
   }
   else if(d === DOWN){
       const [row,rotateCount] = this.getPos(R,r+s);
       this.r = row;
       if(rotateCount % 2 === 1) this.d = UP;
   }
   else if(d === RIGHT){
       const [column,rotateCount] = this.getPos(C,c+s);
       this.c = column;
       if(rotateCount % 2 ===1) this.d = LEFT;
   }
   else if(d === LEFT){
       const [column,rotateCount] = this.getPos(C,c-s);
       this.c = column;
       if(rotateCount % 2 === 1) this.d = RIGHT;
   }
}
function getPos(to,pos){
    let rotateCount = 0;
    while(true){
        if(pos < 0){
            rotateCount++;
            pos = (-1) * pos;
        }
        else if(pos >= to){
            rotateCount++;
            pos = 2*(to-1) - pos;
        }
        else break;
    }
    return [pos,rotateCount]
}
const setShark = (shark,map) =>{
    const {r,c,z} = shark;
    if(!map[r][c]) map[r][c] = shark;
    else if(map[r][c].z < z) map[r][c] = shark;
}
const hunting = (fisher,map) =>{
    for(let r=0; r<map.length; r++){
        if(map[r][fisher]){
            const size = map[r][fisher].z;
            map[r][fisher] = null;
            return size;
        }
    }
    return 0;
}
const solution = (input) =>{
    const [R,C,M] = input[0].split(' ').map(Number);
    function Shark(r,c,s,d,z){
        this.r = r-1;
        this.c = c-1;
        this.s = d-1 < 2 ? s % (2*(R-1)) : s % (2*(C-1));
        this.d = d-1;
        this.z = z;
    }
    let map = Array.from({length:R},()=>Array(C).fill(null));
    Shark.prototype.move = move , Shark.prototype.getPos = getPos;
    Shark.prototype.R = R , Shark.prototype.C = C;
    let sharks = Array.from({length:M},(_,i)=> new Shark(...input[i+1].split(' ').map(Number)));
    sharks.forEach(shark => setShark(shark,map));
    let sum = 0;
    for(let fisher=0; fisher<C; fisher++){
        sum += hunting(fisher,map);
        const current = map;
        map = Array.from({length:R},()=>Array(C).fill(null))
        for(let r=0; r<R; r++){
            for(let c=0; c<C; c++){
                const shark = current[r][c];
                if(shark){
                    shark.move();
                    setShark(shark,map);
                }
            }
        }
    }
    console.log(sum);
}
solution(input);

