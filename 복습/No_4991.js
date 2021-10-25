// const input = [
// '7 5',
// '.......',
// '.o...*.',
// '.......',
// '.*...*.',
// '.......',
// '15 13',
// '.......x.......',
// '...o...x....*..',
// '.......x.......',
// '.......x.......',
// '.......x.......',
// '...............',
// 'xxxxx.....xxxxx',
// '...............',
// '.......x.......',
// '.......x.......',
// '.......x.......',
// '..*....x....*..',
// '.......x.......',
// '10 10',
// '..........',
// '..o.......',
// '..........',
// '..........',
// '..........',
// '.....xxxxx',
// '.....x....',
// '.....x.*..',
// '.....x....',
// '.....x....',
// '0 0'
// ]
// const input = [
//     '3 3',
//     '***',
//     'xox',
//     '*..',
//     '0 0']
// const input = [
// '5 5',
// '....*',
// '.*.*.',
// '..o..',
// '..*..',
// '.....',
// '0 0'
// ]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = () => {
    let answer ="";
    let index = 0;
    const dy = [1,-1,0,0];
    const dx = [0,0,1,-1];
    let [w,h] =[null,null];
    let map;
    let visited;
    const isValidPos = (y,x)=> (y>=0 && x>=0 && y<h && x<w);
    const getMinMoveCount = (y,x,number) =>{
        visited[y][x][0] = true;
        let queue = [[y,x,0,0]];
        while(queue.length){
            const [cy,cx,time,clean] = queue.shift();
            if(clean === (1<<number)-1) return time;
            for(let i=0; i<4; i++){
                const [ny,nx] =[cy+dy[i],cx+dx[i]];
                if(!isValidPos(ny,nx) || map[ny][nx] ==='x' || visited[ny][nx][clean]) continue;
                if(map[ny][nx] ==='.'){
                   queue.push([ny,nx,time+1,clean]);
                   visited[ny][nx][clean] = true;
                }
                else if(typeof map[ny][nx] === 'number'){
                     const newClean = clean | 1<<(map[ny][nx]);
                     if(!visited[ny][nx][newClean]){
                         queue.push([ny,nx,time+1,newClean]);
                         visited[ny][nx][newClean] = true;
                     }
                }
            }
        }
        return -1;
    }
    while(true){
        [w,h]= input[index++].split(' ').map(Number);
        if(w === 0 && h===0) break;
        map = Array.from({length:h},()=>input[index++].split(''));
        let [y,x] = [null,null];
        let number = 0;
        for(let i=0; i<h; i++){
            for(let j=0; j<w; j++){
                if(map[i][j] ==='o') y=i ,x=j, map[i][j]='.';
                else if(map[i][j] ==='*') map[i][j] = number , number++;
            }
        }
        visited = Array.from({length:h},()=>Array.from({length:w},()=>Array(1<<number).fill(false)));
        const time = getMinMoveCount(y,x,number);
        answer+=`${time}\n`
    }
    console.log(answer.trim())
}
solution();