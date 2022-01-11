// const input = [
// '2',
// 'P.',
// '.K',
// '2 1',
// '3 2'
// ]
// const input = [
//     '3',
//     'P..',
//     '.KK',
//     '...',
//     '3 2 4',
//     '7 4 2',
//     '2 3 1'
// ]
// const input = [
//     '3',
//     'K.P',
//     '...',
//     'K.K',
//     '3 3 4',
//     '9 5 9',
//     '8 3 7'
//     ]
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getMinFatigue = (map,heightMap,postOffice,houseCount,height) =>{
    const N = map.length;
    const [dy,dx] = [[-1,-1,0,1,1,1,0,-1],[0,1,1,1,0,-1,-1,-1]];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
    let visited = Array.from({length:N},()=>Array(N).fill(false));
    const heightArr = Array.from(height).sort((a,b)=>a-b);
    let left = 0 , right = 0;
    const [y,x] = postOffice;
    let min = Infinity;
    while(right < heightArr.length){
        if(heightMap[y][x] < heightArr[left] || heightMap[y][x] > heightArr[right]){
            right++;
            continue;
        }
        visited.forEach(row => row.fill(false));
        let queue = [[y,x]];
        let house = 0;
        visited[y][x] = true;
        while(queue.length){
            const [y,x] = queue.shift();
            if(map[y][x] === 'K') house++;
            for(let i=0; i<8; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(!isValidPos(ny,nx) || visited[ny][nx] ) continue;
                const next = heightMap[ny][nx];
                if(next >= heightArr[left] && next <=heightArr[right]){
                   queue.push([ny,nx]);
                   visited[ny][nx] = true;
                }
            }
        }
        if(house === houseCount){
           min = Math.min(min , heightArr[right] - heightArr[left]);
           left++;
        }
        else right++;
    }
    return min;
}
const solution = (input) =>{
    const N = +input[0];
    const map = Array.from({length:N},(_,i) => input[i+1].split(''));
    const heightMap = Array.from({length:N},(_,i)=>input[i+N+1].split(' ').map(Number));
    let postOffice, houseCount = 0 ,height = new Set();
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(map[y][x] === 'P') postOffice = [y,x];
            else if(map[y][x] === 'K') houseCount++;
            height.add(heightMap[y][x]);
        }
    }
    const answer = getMinFatigue(map,heightMap,postOffice,houseCount,height);
    console.log(answer);
}
solution(input);