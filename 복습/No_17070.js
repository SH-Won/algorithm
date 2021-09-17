//const input = ['6','0 0 0 0 0 0','0 1 0 0 0 0','0 0 0 0 0 0','0 0 0 0 0 0','0 0 0 0 0 0','0 0 0 0 0 0']
//const input = ['3','0 0 0','0 0 0','0 0 0'];
//const input =['4','0 0 0 0','0 0 0 0','0 0 0 0','0 0 0 0'];
const input = ['5','0 0 1 0 0','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0']
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const house = Array.from({length:N},(_,i)=>input[i+1].split(' '));
const [HORIZON,VERTICAL,CROSS] = [0,1,2];
const distance = [[0,1],[1,0],[1,1]];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
const isValidCross = (y,x) => (house[y-1][x] !=='1' && house[y][x-1] !=='1');
let count = 0;
const movePipe = (y,x,direction) => {

    if(y === N-1 && x===N-1){
       count++;
       return;
    }
    
    for(let i=0; i<3; i++){
        if(direction === HORIZON && i===VERTICAL) continue;
        if(direction === VERTICAL && i===HORIZON) continue;
        
        const [ny,nx] = [y+distance[i][0],x+distance[i][1]];
        if(!isValidPos(ny,nx) || house[ny][nx] ==='1') continue;
        if(i === CROSS && !isValidCross(ny,nx)) continue;
        movePipe(ny,nx,i);
    }

}
movePipe(0,1,HORIZON);
console.log(count);