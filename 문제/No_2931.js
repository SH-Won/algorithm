// const input = [
// '3 7',
// '.......',
// '.M-.-Z.',
// '.......',
// ]
// const input = [
// '3 5',
// '..1-M',
// '1-+..',
// 'Z.23.',
// ]
// const input = [
// '6 10',
// 'Z.1----4..',
// '|.|....|..',
// '|..14..M..',
// '2-+++4....',
// '..2323....',
// '..........',
// ]
// const input = [
// '3 3',
// 'Z.M',
// '2-.',
// '...'
// ]

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+1].split(''));
const dy = [0,0,1,-1]; // 동 서 남 북
const dx = [1,-1,0,0];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);

let [y,x,dir] = [null,null,null];
loop: for(let i=0; i<N; i++){
    for(let j=0; j<M; j++){
        if(map[i][j] ==='M'){
            for(let k=0; k<4; k++){
                const [ny,nx] = [i+dy[k],j+dx[k]];
                if(!isValidPos(ny,nx) || map[ny][nx] ==='.') continue;
                y=ny , x=nx, dir = k;
                break loop
            }
        }
    }
}

while(true){

    [y,x] = [y+dy[dir],x+dx[dir]];
    if(map[y][x] ==='.') break;

    if(dir === 0){
        if(map[y][x] ==='-' || map[y][x] ==='+') dir ;
        else if(map[y][x] ==='3') dir = 3;
        else if(map[y][x] ==='4') dir = 2;
    }
    else if(dir ===1){
        if(map[y][x] ==='-' || map[y][x] ==='+') dir;
        else if(map[y][x] ==='1') dir = 2;
        else if(map[y][x] ==='2') dir = 3;
    }
    else if(dir ===2){
        if(map[y][x] ==='|' || map[y][x] === '+') dir;
        else if(map[y][x] ==='2') dir = 0;
        else if(map[y][x] ==='3') dir = 1;
    }
    else if(dir ===3){
        if(map[y][x] ==='|' || map[y][x] ==='+') dir;
        else if(map[y][x] ==='1') dir = 0;
        else if(map[y][x] ==='4') dir = 1;
    }
    
}

const findMatchBlock = (y,x) =>{
    const [EAST,WEST,SOUTH,NORTH] = [0,1,2,3];
    let direction = Array(4).fill(false);
    for(let i=0; i<4; i++){
        const [ny,nx] = [y+dy[i],x+dx[i]];
        if(!isValidPos(ny,nx) || map[ny][nx] ==='.') continue;

        if(i === EAST && (map[ny][nx] ==='-' || map[ny][nx] ==='+' || map[ny][nx] ==='3' || map[ny][nx] ==='4') ) direction[EAST] = true;
        else if(i===WEST && (map[ny][nx] ==='-' || map[ny][nx] ==='+' || map[ny][nx] ==='1' || map[ny][nx] ==='2')) direction[WEST] = true;
        else if(i===SOUTH && (map[ny][nx] ==='|' || map[ny][nx] ==='+' || map[ny][nx] ==='2' || map[ny][nx]==='3')) direction[SOUTH] =true;
        else if(i===NORTH && (map[ny][nx] ==='|' || map[ny][nx] ==='+' || map[ny][nx] ==='1' || map[ny][nx] ==='4')) direction[NORTH] =true; 
    }
    if(direction.every(dir => dir)) return '+';
    else if(direction[SOUTH] && direction[NORTH]) return '|'
    else if(direction[EAST] && direction[WEST]) return '-'
    else if(direction[EAST] && direction[SOUTH]) return '1'
    else if(direction[NORTH] && direction[EAST]) return'2'
    else if(direction[WEST] && direction[NORTH]) return'3'
    else if(direction[WEST] && direction[SOUTH]) return'4'
}
const block = findMatchBlock(y,x);
console.log(`${y+1} ${x+1} ${block}`);