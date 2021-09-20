//const input = ['100 100 0'];
//const input = ['4 6 8','4 1 3 3 8','1 3 5 2 9','2 4 8 4 1','4 5 0 1 4','3 3 1 2 7','1 5 8 4 3','3 6 2 1 2','2 2 2 3 5'];
//const input = ['4 5 4','4 1 3 3 8','1 3 5 2 9','2 4 8 4 1','4 5 0 1 4'];
//const input = ['2 2 4','1 1 1 1 1','2 2 2 2 2','1 2 1 2 3','2 1 2 1 4']

// JS 의 class 문법을 써보자
// 이 코드는 어떤분의 코드를 보고 작성했습니다.
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [R,C,M] = input[0].split(' ').map(Number);
const [R_M,C_M] = [2*(R-1),2*(C-1)] 

class Shark {
    constructor(r,c,s,d,z){
        this.row = r-1;
        this.column = c-1;
        this.speed = d<=2 ? s % R_M : s % C_M;
        this.direction = d;
        this.size = z;
    }
    static getPos(from,to,pos){
        let convertCount = 0;
        while(true){
            if(pos < from){
                pos = pos * (-1);
                convertCount++;
            } else if(pos>=to){
                pos = (to-1) *2 - pos;
                convertCount++;
            } else{
                break;
            }
        }
       return [pos,convertCount];
    }
    move(){
        if(this.direction === 1){
            const pos = this.row- this.speed;
            const [row,convertCount] = Shark.getPos(0,R,pos);
            if(convertCount % 2 ===1) this.direction = 2;
            this.row = row;
        }else if(this.direction ===2){
            const pos = this.row + this.speed;
            const [row,convertCount] = Shark.getPos(0,R,pos);
            if(convertCount % 2 ===1) this.direction = 1;
            this.row = row;
        }else if(this.direction ===3){
            const pos = this.column + this.speed;
            const [column,convertCount] = Shark.getPos(0,C,pos);
            if(convertCount % 2 ===1) this.direction = 4;
            this.column =column
        }else if(this.direction ===4){
            const pos = this.column - this.speed;
            const [column,convertCount] = Shark.getPos(0,C,pos);
            if(convertCount % 2 === 1) this.direction = 3;
            this.column =column
        }
    }
}
let field = Array.from({length:R},()=>Array(C).fill(null));
let sum = 0;
const sharks = input.slice(1).map(string => new Shark(...string.split(' ').map(Number)));

const setField = (shark) =>{
    const {row,column,size} = shark;
    if(!field[row][column]){
        field[row][column] = shark;
    }
    else{
        const prevSize = field[row][column].size;
        if(prevSize < size) field[row][column] =shark;
    }
}
 
const fishing = (targetIndex) =>{
    for(let row=0; row<R; row++){
        if(field[row][targetIndex]){
            sum += field[row][targetIndex].size;
            field[row][targetIndex] = null;
            break;
        }
    }
}
const clearField = () =>{
    const prevField = field;
    field = Array.from({length:R},()=>Array(C).fill(null));
    return prevField;
}
sharks.forEach(shark => setField(shark))

for(let fisher=0; fisher<C; fisher++){
    fishing(fisher);
    const prevField = clearField();
    for(let row =0; row<R; row++){
        for(let column =0; column<C; column++){
            const shark = prevField[row][column];
            if(shark){
                shark.move();
                setField(shark);
            }
        }
    }
}
console.log(sum)


