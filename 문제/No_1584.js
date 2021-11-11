const input = ['1','500 0 0 500','1','0 0 0 0']
//const input = ['0','0'];
//const input = ['2','0 0 250 250','250 250 500 500','2','0 251 249 500','251 0 500 249'];
//const input = ['2','0 0 250 250','250 250 500 500','2','0 250 250 500','250 0 500 250']
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// let index = 0;
// const N = +input[index++];
// let [ty1,tx1,ty2,tx2] = [Infinity,Infinity,0,0];
// for(let i=0; i<N; i++){

// }
// const M = +input[2];
// const [dy1,dx1,dy2,dx2] = input[3].split(' ').map(Number);
const isValidPos = (y,x) => (y>=0 && x>=0 && y<501 && x<501);
// const [tMinY,tMinX,tMaxY,tMaxX] = [Math.min(ty1,ty2),Math.min(tx1,tx2),Math.max(ty1,ty2),Math.max(tx1,tx2)];
// const [dMinY,dMinX,dMaxY,dMaxX] = [Math.min(dy1,dy2),Math.min(dx1,dx2),Math.max(dy1,dy2),Math.max(dx1,dx2)];
// const isDeathPos = (y,x) => (y>=dMinY && x>=dMinX && y<=dMaxY && x<=dMaxX);
// const isDangerousPos = (y,x) => (y>=tMinY && x>=tMinX && y<=tMaxY && x<=tMaxX);
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];


const solution = () =>{
    let index = 0;
    let map = Array.from({length:501},()=>Array(501).fill(0));
    const N = +input[index++];
    for(let i=0; i<N; i++){
        const [y1,x1,y2,x2] = input[index++].split(' ').map(Number);
        const [minY,minX,maxY,maxX] = [Math.min(y1,y2),Math.min(x1,x2),Math.max(y1,y2),Math.max(x1,x2)];
        for(let y=minY; y<=maxY; y++){
            for(let x=minX; x<=maxX; x++){
                map[y][x] = 1;
            }
        }
    }
    const M = +input[index++];
    for(let i=0; i<M; i++){
        const [y1,x1,y2,x2] = input[index++].split(' ').map(Number);
        const [minY,minX,maxY,maxX] = [Math.min(y1,y2),Math.min(x1,x2),Math.max(y1,y2),Math.max(x1,x2)];
        for(let y=minY; y<=maxY; y++){
            for(let x=minX; x<=maxX; x++){
                map[y][x] = 2;
            }
        }
    }
    let life = Array.from({length:501},()=>Array(501).fill(Infinity));
    life[0][0] = 0;
    let queue =[[0,0,0]];
    while(queue.length){
        const [y,x,count] = queue.shift();

        if(y === 500 && x === 500) return console.log(count);
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || map[ny][nx] === 2) continue;
            if(map[ny][nx] ===1 && life[ny][nx] > count+1){
                life[ny][nx] = count+1;
                queue.push([ny,nx,count+1])
            }
            else if(map[ny][nx] === 0 && life[ny][nx] > count){
                life[ny][nx] = count;
                queue.push([ny,nx,count]);
            }
            
        }
    }
    return console.log(-1);
}
solution();
