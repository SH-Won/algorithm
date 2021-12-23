// const input = [
// '5 5',
// '#####',
// '#..B#',
// '#.#.#',
// '#RO.#',
// '#####',
// ]

// const input = [
// '8 5',
// '#####',
// '#.###',
// '#...#',
// '#...#',
// '#O.##',
// '#.###',
// '#.RB#',
// '#####',
// ] //ans2
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+1].split(''));
const [dy,dx] =[[1,-1,0,0],[0,0,1,-1]];
const [DOWN,UP,RIGHT,LEFT] = [0,1,2,3];
const getMinCount = (red,blue,map) =>{
    let start = [...red,...blue];
    let check = Array.from({length:4},()=>Array(2).fill(false));
    let queue = [[...start,0]];
    while(queue.length){
        const [ry,rx,by,bx,count] = queue.shift();
        if(count >= 10) return -1;
        for(let dir=0; dir<4; dir++){
            let marbles = [[ry,rx],[by,bx]];
            check[dir].fill(false);
            for(let i=0; i<marbles.length; i++){
                let [y,x] = marbles[i];
                let [ny,nx] = [y+dy[dir],x+dx[dir]];
                while(map[ny][nx] !=='#'){
                    if(map[ny][nx] === 'O'){
                        check[dir][i] = true;
                        break;
                    }
                    ny+=dy[dir],nx+=dx[dir];
                }
                marbles[i] = [ny-dy[dir],nx-dx[dir]];
            }
            if(check[dir].some(el => el)){
                if(check[dir][0] && !check[dir][1]) return count+1;
                continue;
            }
            let [red,blue] = marbles;
            if(red[0] === blue[0] && red[1] === blue[1]){
                if(dir === LEFT){
                   rx > bx ? red[1]++ : blue[1]++;
                }
                else if(dir ===RIGHT){
                   rx > bx ? blue[1]-- : red[1]--;
                }
                else if(dir === UP){
                   ry > by ? red[0]++ : blue[0]++;
                }
                else if(dir === DOWN){
                   ry > by ? blue[0]-- : red[0]--;
                }
            }
            if(red[0] === ry && red[1] === rx && blue[0] === by && blue[1] ===bx){
                continue;
            }
            queue.push([...red,...blue,count+1]);

        }
    }
    return -1;
}
const solution = (map) =>{
    let [red,blue] = [[null,null],[null,null]];
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            if(map[y][x] ==='R') red = [y,x];
            else if(map[y][x] ==='B') blue = [y,x];
        }
    }
    const answer = getMinCount(red,blue,map);
    console.log(answer);
}
solution(map);