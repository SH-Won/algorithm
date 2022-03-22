// const input = ['5 5','#####','#..B#','#.#.#','#RO.#','#####']
// const input = ['7 7','#######','#...RB#','#.#####','#.....#','#####.#','#O....#','#######']
// const input = ['7 7','#######','#..R#B#','#.#####','#.....#','#####.#','#O....#','#######']
// const input = [
// '10 10',
// '##########',
// '#R#...##B#',
// '#...#.##.#',
// '#####.##.#',
// '#......#.#',
// '#.######.#',
// '#.#...##.#',
// '#.#.#.#..#',
// '#...#.O#.#',
// '##########'
// ]
// const input = ['3 7','#######','#R.O.B#','#######']
// const input = [
// '10 10',
// '##########',
// '#R#...##B#',
// '#...#.##.#',
// '#####.##.#',
// '#......#.#',
// '#.######.#',
// '#.#....#.#',
// '#.#.##...#',
// '#O..#....#',
// '##########'
// ]
// const input = ['3 10','##########','#.O....RB#','##########']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getMinCount = (red,blue,map) =>{
    const [LEFT,RIGHT,UP,DOWN] = [0,1,2,3]
    const dirMap = ['L','R','U','D'];
    const [dy,dx] = [[0,0,-1,1],[-1,1,0,0]];
    let check = Array.from({length:4},()=>Array(2).fill(false));
    let queue = [[...red,...blue,0,""]];
    let visited = new Set();
    visited.add(`${red.join(',')},${blue.join(',')}`);
    while(queue.length){
        const [ry,rx,by,bx,count,dir] = queue.shift();
        if(count >= 10) return -1;
        for(let i=0; i<4; i++){
            let marble = [[ry,rx],[by,bx]];
            check[i].fill(false);
            for(let j=0; j<marble.length; j++){
                let [ny,nx] = [marble[j][0]+dy[i],marble[j][1]+dx[i]];
                while(map[ny][nx] !== '#'){
                    if(map[ny][nx] === 'O'){
                        check[i][j] = true;
                        break;
                    }
                    ny+=dy[i], nx+=dx[i];
                }
                marble[j] = [ny-dy[i],nx-dx[i]];
            }
            if(check[i].some(el => el)){
                if(!check[i][1]) return {count:count+1,dir:dir+dirMap[i]};
                continue; 
            }
            if(marble[0][0] === marble[1][0] && marble[0][1] === marble[1][1]){
                if(i === LEFT) rx < bx ? marble[1][1]++ : marble[0][1]++;
                else if(i === RIGHT) rx < bx ? marble[0][1]-- : marble[1][1]--;
                else if(i === UP) ry < by ? marble[1][0]++ : marble[0][0]++;
                else if(i === DOWN) ry < by ? marble[0][0]-- : marble[1][0]--;
            }
            if(marble[0][0] !== ry || marble[0][1] !== rx || marble[1][0] !== by || marble[1][1] !== bx){
                const nextMarble = `${marble[0].join(',')},${marble[1].join(',')}`
                if(!visited.has(nextMarble)){
                   queue.push([...marble[0],...marble[1],count+1,dir+dirMap[i]]);
                   visited.add(nextMarble);
                }
            }
        }
    }
    return -1;
}
const solution = input =>{
    const [N,M] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i)=> input[i+1].split(''));
    let red , blue;
    for(let y=1; y<N-1; y++){
        for(let x=1; x<M-1; x++){
            if(map[y][x] === 'R') red = [y,x];
            else if (map[y][x] ==='B') blue = [y,x];
        }
    }
    const answer = getMinCount(red,blue,map);
    answer === -1 ? console.log(answer) : console.log(`${answer.count}\n${answer.dir}`);
}
solution(input);