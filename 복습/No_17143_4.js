//const input = ['100 100 0'];
//const input = ['4 6 8','4 1 3 3 8','1 3 5 2 9','2 4 8 4 1','4 5 0 1 4','3 3 1 2 7','1 5 8 4 3','3 6 2 1 2','2 2 2 3 5'];
//const input = ['4 5 4','4 1 3 3 8','1 3 5 2 9','2 4 8 4 1','4 5 0 1 4'];
const input = ['2 2 4','1 1 1 1 1','2 2 2 2 2','1 2 1 2 3','2 1 2 1 4']


//const fs = require('fs');
//const input= fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [R,C,M] = input[0].split(' ').map(Number);

class Shark{
    constructor(r,c,s,d,z){
        this.row = r-1;
        this.column = c-1;
        this.speed = d<=2 ? s % (2*(R-1)) : s % (2*(C-1));
        this.direction = d;
        this.size = z;
    }
    static movePos = (from,to,position) =>{
        let convertCount = 0;
        while(true){
            if(position < from){
                convertCount++;
                position = (-1) * position;
            }else if(position >=to){
                convertCount++;
                position = 2*(to-1) - position;
            }
            else break;
        }
        return [position,convertCount];
    }
    move(){
        if(this.direction === 1){
            const pos = this.row - this.speed;
            const [row,convertCount] = Shark.movePos(0,R,pos);
            if(convertCount % 2) this.direction =2;
            this.row = row;
        }
        else if(this.direction ===2){
            const pos = this.row + this.speed;
            const [row,convertCount] = Shark.movePos(0,R,pos);
            if(convertCount % 2) this.direction =1;
            this.row = row;
        }
        else if(this.direction ===3){
            const pos = this.column + this.speed;
            const [column,convertCount] = Shark.movePos(0,C,pos);
            if(convertCount % 2) this.direction =4;
            this.column = column;
        }
        else if(this.direction ===4){
            const pos = this.column - this.speed;
            const [column,convertCount] = Shark.movePos(0,C,pos);
            if(convertCount % 2) this.direction =3;
            this.column = column;
        }
    }
}
let sum = 0;
let space = Array.from({length:R},()=>Array(C).fill(null));
let sharks = Array.from({length:M},(_,i)=> new Shark(...input[i+1].split(' ').map(Number)));

const fishing = (fisher) =>{
    for(let y=0; y<R; y++){
        if(space[y][fisher]){
            sum+=space[y][fisher].size;
            space[y][fisher] = null
            break;
        }
    }
}
const putShark = (shark) =>{
    const {row,column,size} = shark;
    if(!space[row][column]) space[row][column] = shark;
    else {
    if(size > space[row][column].size ) space[row][column] = shark;
    }
}
const clearSpace = () =>{
    const next = space;
    space = Array.from({length:R},()=>Array(C).fill(null));
    return next;
}
sharks.forEach(shark => putShark(shark));
for(let fisher=0; fisher<C; fisher++){
    fishing(fisher);
    const space = clearSpace();
    for(let y=0; y<R; y++){
        for(let x=0; x<C; x++){
            const shark = space[y][x];
            if(shark){
                 shark.move();
                 putShark(shark);
            }
        }
    }
}
console.log(sum);
