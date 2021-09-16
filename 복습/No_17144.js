//const input =['7 8 1','0 0 0 0 0 0 0 9','0 0 0 0 3 0 0 8','-1 0 5 0 0 0 22 0','-1 8 0 0 0 0 0 0','0 0 0 0 0 10 43 0','0 0 5 0 15 0 0 0','0 0 40 0 0 0 20 0',]
// const input =[
//     '7 8 2',
// '0 0 0 0 0 0 0 9',
// '0 0 0 0 3 0 0 8',
// '-1 0 5 0 0 0 22 0',
// '-1 8 0 0 0 0 0 0',
// '0 0 0 0 0 10 43 0',
// '0 0 5 0 15 0 0 0',
// '0 0 40 0 0 0 20 0',
// ]
// const input =[
//     '7 8 3',
// '0 0 0 0 0 0 0 9',
// '0 0 0 0 3 0 0 8',
// '-1 0 5 0 0 0 22 0',
// '-1 8 0 0 0 0 0 0',
// '0 0 0 0 0 10 43 0',
// '0 0 5 0 15 0 0 0',
// '0 0 40 0 0 0 20 0'
// ]
// const input =[
//    '7 8 4',
// '0 0 0 0 0 0 0 9',
// '0 0 0 0 3 0 0 8',
// '-1 0 5 0 0 0 22 0',
// '-1 8 0 0 0 0 0 0',
// '0 0 0 0 0 10 43 0',
// '0 0 5 0 15 0 0 0',
// '0 0 40 0 0 0 20 0',
// ]
// const input =[
//     '7 8 5',
// '0 0 0 0 0 0 0 9',
// '0 0 0 0 3 0 0 8',
// '-1 0 5 0 0 0 22 0',
// '-1 8 0 0 0 0 0 0',
// '0 0 0 0 0 10 43 0',
// '0 0 5 0 15 0 0 0',
// '0 0 40 0 0 0 20 0',
// ]
// const input =[
//     '7 8 20',
// '0 0 0 0 0 0 0 9',
// '0 0 0 0 3 0 0 8',
// '-1 0 5 0 0 0 22 0',
// '-1 8 0 0 0 0 0 0',
// '0 0 0 0 0 10 43 0',
// '0 0 5 0 15 0 0 0',
// '0 0 40 0 0 0 20 0'
// ]
// const input =[
//     '7 8 30',
// '0 0 0 0 0 0 0 9',
// '0 0 0 0 3 0 0 8',
// '-1 0 5 0 0 0 22 0',
// '-1 8 0 0 0 0 0 0',
// '0 0 0 0 0 10 43 0',
// '0 0 5 0 15 0 0 0',
// '0 0 40 0 0 0 20 0'
// ]
const input =[
    '7 8 50',
'0 0 0 0 0 0 0 9',
'0 0 0 0 3 0 0 8',
'-1 0 5 0 0 0 22 0',
'-1 8 0 0 0 0 0 0',
'0 0 0 0 0 10 43 0',
'0 0 5 0 15 0 0 0',
'0 0 40 0 0 0 20 0'
]


//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [R,C,T] = input[0].split(' ').map(Number);
const room = Array.from({length:R},(_,i)=>input[i+1].split(' ').map(Number));

const solution = (room,T) =>{
    let cleaner = {};
    let copyRoom = Array.from({length:R},()=>Array(C).fill(0));
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<R && x<C && !(x === 0 &&  y ===cleaner.up) && !(x===0 && y===cleaner.down));
    const [up,down,left,right] = [0,1,2,3];
    const distance =[[-1,0],[1,0],[0,-1],[0,1]];
    for(let i=0; i<R; i++){
        if(room[i][0] === -1){
            cleaner.up = i;
            cleaner.down = i+1;
            room[i][0] = 0;
            room[i+1][0] = 0;
            break;
        }
    }
    class Dust {
        constructor(y,x,quantity){
            this.y = y;
            this.x = x;
            this.quantity = quantity;
        }
    }
    Dust.prototype.move = function(dir){
         copyRoom[this.y][this.x] = 0;
         this.y +=distance[dir][0];
         this.x +=distance[dir][1];
         copyRoom[this.y][this.x] = this;
    }
    Dust.prototype.spread = function(){
        let count =0;
        distance.forEach(([my,mx])=>{
            const [ny,nx] = [this.y+my,this.x+mx];
            if(!isValidPos(ny,nx)) return;
            count++;
            if(Math.floor(this.quantity / 5) !== 0){
                if(!copyRoom[ny][nx]) copyRoom[ny][nx] = new Dust(ny,nx,Math.floor(this.quantity / 5));
                else copyRoom[ny][nx].quantity+= Math.floor(this.quantity / 5);
            }
            else return;
            
        })
        if(!copyRoom[this.y][this.x])
        copyRoom[this.y][this.x]= new Dust(this.y,this.x,this.quantity - Math.floor(this.quantity/5) * count)
        else{
            copyRoom[this.y][this.x].quantity += this.quantity - Math.floor(this.quantity/5) * count
        }
    }
    const clearRoom = () =>{
        const prev = copyRoom;
        copyRoom = Array.from({length:R},()=>Array(C).fill(0));

        return prev;
    }
    for(let i=0; i<R; i++){
        for(let j=0; j<C; j++){
            if(room[i][j]) room[i][j] = new Dust(i,j,room[i][j]);
        }
    }

    while(T--){
        for(let y=0; y<R; y++){
            for(let x=0; x<C; x++){
                const Dust = room[y][x];
                if(Dust){
                    Dust.spread();
                }
            }
        }
        

        for(let y=cleaner.up-1; y>=0; y--){
            copyRoom[y][0] && copyRoom[y][0].move(down);
        }
        copyRoom[cleaner.up][0] = 0;
        
        for(let x=1; x<C; x++){
            copyRoom[0][x] && copyRoom[0][x].move(left);
        }
        
        for(let y=1; y<=cleaner.up; y++){
            copyRoom[y][C-1]  && copyRoom[y][C-1].move(up);
        }
        
        for(let x=C-2; x>=1; x--){
            copyRoom[cleaner.up][x] && copyRoom[cleaner.up][x].move(right);
        }
         
        for(let y=cleaner.down+1; y<R; y++){
            copyRoom[y][0] && copyRoom[y][0].move(up);
        }

        copyRoom[cleaner.down][0] = 0;
        
        for(let x=1; x<C; x++){
            copyRoom[R-1][x] && copyRoom[R-1][x].move(left);
        }
        for(let y=R-2; y>=cleaner.down; y--){
            copyRoom[y][C-1] && copyRoom[y][C-1].move(down);
        }
        for(let x=C-2; x>=1; x--){
            copyRoom[cleaner.down][x] && copyRoom[cleaner.down][x].move(right);
        }
        room = clearRoom();
    }
   return console.log(room.reduce((acc,cur)=> acc+=cur.reduce((acc,cur)=> cur ? acc+=cur.quantity : acc ,0),0));
}
solution(room,T);
