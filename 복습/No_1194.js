// const input = ['1 7','f0.F..1'];
// const input = [
//     '5 5',
//     '....1',
//     '#1###',
//     '.1.#0',
//     '....A',
//     '.1.#.'
     
// ]
// const input = [
//     '7 8',
//     'a#c#eF.1',
//     '.#.#.#..',
//     '.#B#D###',
//     '0....F.1',
//     'C#E#A###',
//     '.#.#.#..',
//     'd#f#bF.1'
//     ]
// const input = ['3 4','1..0','###.','1...']
// const input = ['3 5','..0..','.###.','..1.A']
// const input = ['4 5','0....','.#B#A','.#.#.','b#a#1']
// const input = ['1 11','c.0.C.C.C.1']
const input = ['3 6','###...','#0A.1a','###...']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getMinTime = (start,map) =>{
    const [N,M] = [map.length, map[0].length];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
    const [dy,dx] = [[-1,1,0,0],[0,0,-1,1]];
    const [y,x] = start;
    let time = Array.from({length:N},()=>Array.from({length:M},()=>Array(1<<6).fill(-1)));
    time[y][x][0] = 0;
    let queue = [[y,x,0]];
    while(queue.length){
        const [y,x,key] = queue.shift();
        if(map[y][x] === '1') return time[y][x][key];
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || map[ny][nx] ==='#' || time[ny][nx][key] !==-1) continue;

            if(map[ny][nx] >= 'a' && map[ny][nx] <='f'){
                const newKey = (1 << (map[ny][nx].charCodeAt() - 97)) | key;
                if(time[ny][nx][newKey] === -1){
                    time[ny][nx][newKey] = time[y][x][key] + 1;
                    queue.push([ny,nx,newKey]);
                }
            }
            else if(map[ny][nx] >='A' && map[ny][nx] <='F'){
                const unlock = (1 << (map[ny][nx].charCodeAt() - 65)) & key;
                if(unlock && time[ny][nx][key] === -1){
                    time[ny][nx][key] = time[y][x][key] + 1;
                    queue.push([ny,nx,key]);
                }
            }
            else{
                time[ny][nx][key] = time[y][x][key] + 1;
                queue.push([ny,nx,key]);
            }
        }
    }
    return -1;
}
const solution = (input) =>{
    const [N,M] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i) =>input[i+1].split(''));
    let start ;
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            if(map[y][x] ==='0') start = [y,x];
        }
    }
    const answer = getMinTime(start,map);
    console.log(answer);
    
}
solution(input);