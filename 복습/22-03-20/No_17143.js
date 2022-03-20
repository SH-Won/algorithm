// const input = ['100 100 0'];
const input = ['4 6 8','4 1 3 3 8','1 3 5 2 9','2 4 8 4 1','4 5 0 1 4','3 3 1 2 7','1 5 8 4 3','3 6 2 1 2','2 2 2 3 5'];
//const input = ['4 5 4','4 1 3 3 8','1 3 5 2 9','2 4 8 4 1','4 5 0 1 4'];
// const input = ['2 2 4','1 1 1 1 1','2 2 2 2 2','1 2 1 2 3','2 1 2 1 4']

// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class Shark{
    constructor(r,c,s,d,z){
        this.r = r-1;
        this.c = c-1;
        this.s = d <=2 ? s % (2*(this.R-1)) : s % (2*(this.C-1));
        this.d = d;
        this.z = z;
    }
    getPos = (to,pos) =>{
        let changeCount = 0;
        while(true){
            if(pos < 0){
                pos = pos * (-1);
                changeCount++;
            }
            else if(pos >= to){
                pos = 2*(to-1) - pos;
                changeCount++;
            }
            else break;
        }
        return [pos,changeCount];
    }
    move = () =>{
        let {r,c,s,d,z} = this;
        if(d === 1){
            const [nextRow,changeCount] = this.getPos(this.R,r-s);
            if(changeCount % 2 === 1) d = 2;
            this.r = nextRow , this.d = d;
        }
        else if(d === 2){
            const [nextRow,changeCount] = this.getPos(this.R,r+s);
            if(changeCount % 2 === 1) d = 1;
            this.r = nextRow , this.d = d;
        }
        else if(d === 3){
            const [nextColumn,changeCount] = this.getPos(this.C,c+s);
            if(changeCount % 2 === 1) d = 4;
            this.c = nextColumn , this.d = d;
        }
        else{
            const [nextColumn,changeCount] = this.getPos(this.C,c-s);
            if(changeCount % 2 === 1) d = 3;
            this.c = nextColumn , this.d = d;
        }
    }
}
const setShark = (shark,map) =>{
    const {r,c,z} = shark;
    if(!map[r][c]) map[r][c] = shark;
    else{
        if(map[r][c].z < z) map[r][c] = shark;
    }
}
const fishing = (fisher,map) =>{
    for(let y=0; y<map.length; y++){
        if(map[y][fisher]){
            const size = map[y][fisher].z;
            map[y][fisher] = null;
            return size;
        }
    }
    return 0;
}

const solution = (input) =>{
    const [R,C,M] = input[0].split(' ').map(Number);
    let map = Array.from({length:R},()=>Array(C).fill(null));
    Shark.prototype.R = R, Shark.prototype.C = C;
    for(let i=1; i<1+M; i++){
        const [r,c,s,d,z] = input[i].split(' ').map(Number);
        map[r-1][c-1] = new Shark(r,c,s,d,z);
    }
    let sizeSum = 0;
    for(let fisher=0; fisher<C; fisher++){
        sizeSum += fishing(fisher,map);
        const current = map;
        map = Array.from({length:R},()=>Array(C).fill(null));
        for(let y=0; y<R; y++){
            for(let x=0; x<C; x++){
                const shark = current[y][x];
                if(shark){
                    shark.move();
                    setShark(shark,map);
                }
            }
        }
    }
    console.log(sizeSum);
}
solution(input);
