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
// const input =[
//     '7 8 50',
// '0 0 0 0 0 0 0 9',
// '0 0 0 0 3 0 0 8',
// '-1 0 5 0 0 0 22 0',
// '-1 8 0 0 0 0 0 0',
// '0 0 0 0 0 10 43 0',
// '0 0 5 0 15 0 0 0',
// '0 0 40 0 0 0 20 0'
// ]
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [R,C,T] = input[0].split(' ').map(Number);
const map = Array.from({length:R},(_,i)=>input[i+1].split(' ').map(Number));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<R && x<C);

const spread = (map,cleaner) =>{
    let spreadMap = Array.from({length:R},()=>Array(C).fill(0));
    const {start,end} = cleaner;
    const [cy1,cx1,cy2,cx2] = [...start,...end];
    for(let y=0; y<R; y++){
        for(let x=0; x<C; x++){
            if(!map[y][x]) continue;
            let totalSpreadDust = 0;
            for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(!isValidPos(ny,nx) || (ny === cy1 && nx === cx1) || ( ny === cy2 && nx === cx2)) continue;
                const spreadDust = Math.floor(map[y][x] / 5);
                totalSpreadDust+=spreadDust;
                spreadMap[ny][nx]+=spreadDust;
            }
            spreadMap[y][x] += (map[y][x] - totalSpreadDust);
        }
    } 
    return spreadMap
}
const clean = (map,cleaner) =>{
    const {start,end} = cleaner;
    const [cy1,cx1,cy2,cx2] = [...start,...end];
    for(let y=cy1-2; y>=0; y--){
        map[y+1][0] = map[y][0];
    }
    for(let x=1; x<C; x++){
        map[0][x-1] = map[0][x];
    }
    for(let y=1; y<=cy1; y++){
        map[y-1][C-1] = map[y][C-1];
    }
    for(let x=C-2; x>=1; x--){
        map[cy1][x+1] = map[cy1][x];
    }

    for(let y=cy2+2; y<R; y++){
        map[y-1][0] = map[y][0];
    }
    for(let x=1; x<C; x++){
        map[R-1][x-1] = map[R-1][x];
    }
    for(let y=R-2; y>=cy2; y--){
        map[y+1][C-1] = map[y][C-1];
    }
    for(let x=C-2; x>=1; x--){
        map[cy2][x+1] = map[cy2][x];
    }
    map[cy1][1] = 0;
    map[cy2][1] = 0;
}

const solution = (map,T) =>{
    let cleaner = {start:null , end:null};
loop:for(let y=0; y<R; y++){
        for(let x=0; x<C; x++){
           if(map[y][x] === -1){
               cleaner.start = [y,x];
               cleaner.end = [y+1,x];
               map[y][x] = 0 , map[y+1][x] = 0;
               break;
           }
        }
    }
    
    while(T--){
        map = spread(map,cleaner);
        clean(map,cleaner);
    }
    const totalDust = map.reduce((acc,cur)=>acc+=cur.reduce((acc,cur)=>acc+=cur,0),0);
    console.log(totalDust);
}
solution(map,T);