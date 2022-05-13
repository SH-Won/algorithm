// const input = ['1 7','f0.F..1'];
// const input = [
//     '5 5',
//     '....1',
//     '#1###',
//     '.1.#0',
//     '....A',
//     '.1.#.'
     
// ]
const input = [
    '7 8',
    'a#c#eF.1',
    '.#.#.#..',
    '.#B#D###',
    '0....F.1',
    'C#E#A###',
    '.#.#.#..',
    'd#f#bF.1'
    ]
const fs =require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getMinCount = (start,map) =>{
    const [N,M] = [map.length, map[0].length];
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
    const count = Array.from({length:1<<6},()=>Array.from({length:N},()=>Array(M).fill(Infinity)));
    count[0][start.y][start.x] = 0;
    let queue = [[start.y,start.x,0]];
    while(queue.length){
        const [y,x,key] = queue.shift();
        if(map[y][x] === '1') return count[key][y][x];
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || map[ny][nx] === '#') continue;
            let nextKey ;
            if(map[ny][nx] ==='.' || map[ny][nx] === '1') nextKey = key;
            else if('A' <= map[ny][nx] && map[ny][nx] <='F' && (key & (1 << (map[ny][nx].charCodeAt()-65)))) nextKey = key;
            else if('a' <= map[ny][nx] && map[ny][nx] <= 'f') nextKey = key | (1 <<(map[ny][nx].charCodeAt()-97));
            if(nextKey !== undefined && count[nextKey][ny][nx] > count[key][y][x] + 1){
                count[nextKey][ny][nx] = count[key][y][x] + 1;
                queue.push([ny,nx,nextKey]);
            }
        } 
    }
    return -1;
}
const solution = input =>{
    const [N,M] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i)=>input[i+1].split(''));
    let start =null ;
loop:for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            if(map[y][x] === '0'){
                start = {y,x} , map[y][x] ='.';
                break;
            }
        }
    }
    console.log(getMinCount(start,map));
}
solution(input);
