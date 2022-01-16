const input = [
    '5 3 2',
    '0 0 0 0 0',
    '0 0 0 0 0',
    '0 0 0 0 0',
    '0 0 0 0 0',
    '0 0 1 0 0',
    '0 0 0 0 0'
]
// const input = ['4 3 2','1 1 1 1','1 1 1 1','1 1 1 1','1 1 1 1','-1 -1 -1 -1','1 1 1 -1']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const isAllRipe = (map) =>{
    for(let z=0; z<map.length; z++){
        for(let y=0; y<map[0].length; y++){
            for(let x=0; x<map[0][0].length; x++){
                if(!map[z][y][x]) return false;
            }
        }
    }
    return true;
}
const getRipeDays = (tomato,map) =>{
    const [H,N,M] = [map.length, map[0].length, map[0][0].length];
    const [dz,dy,dx] = [[1,-1,0,0,0,0],[0,0,1,-1,0,0],[0,0,0,0,1,-1]];
    const isValidPos = (z,y,x) => (z>=0 && y>=0 && x>=0 && z<H && y<N && x<M);
    let queue = tomato ,idx = 0;
    let days = 0;
    while(idx < queue.length){
        let length = queue.length - idx;
        let change = false;
        while(length--){
            const [z,y,x] = queue[idx++];
            for(let i=0; i<6; i++){
                const [nz,ny,nx] = [z+dz[i],y+dy[i],x+dx[i]];
                if(!isValidPos(nz,ny,nx) || map[nz][ny][nx] !==0 ) continue;
                queue.push([nz,ny,nx]);
                map[nz][ny][nx] = 1;
                change = true;
            }
        }
        change ? days++ : days;
    }
    return isAllRipe(map) ? days : -1;
}
const solution = (input) =>{
    const [M,N,H] = input[0].split(' ').map(Number);
    const map = Array.from({length:H},(_,i)=>Array.from({length:N},(_,j)=>input[i*N + j + 1].split(' ').map(Number)))
    let tomato = [];
    for(let z=0; z<H; z++){
        for(let y=0; y<N; y++){
            for(let x=0; x<M; x++){
                if(map[z][y][x] === 1) tomato.push([z,y,x]);
            }
        }
    }
    const days = getRipeDays(tomato,map);
    console.log(days);
}
solution(input);