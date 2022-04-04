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
const input = ['3','K.P','...','K.K','3 3 4','9 5 9','8 3 7']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const getMinFatigue = (office,house,height,map,heightMap) =>{
    const N = map.length;
    const {y,x} = office;
    const [dy,dx] = [[-1,-1,-1,0,1,1,1,0],[-1,0,1,1,1,0,-1,-1]];
    const visited = Array.from({length:N},()=>Array(N).fill(false));
    let low = 0 , high = 0 , min = Infinity;
    while(high < height.length){
        let queue = [];
        let count = 0;
        visited.forEach(row => row.fill(false));
        if(heightMap[y][x] >= height[low] && heightMap[y][x] <= height[high]){
            queue.push([y,x]);
            visited[y][x] = true;
        }
        while(queue.length){
            const [y,x] = queue.shift();
            if(map[y][x] === 'K') count++;
            for(let i=0; i<8; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(ny < 0 || nx < 0 || ny >= N || nx >= N || heightMap[ny][nx] < height[low] || heightMap[ny][nx] > height[high] || visited[ny][nx]) continue;
                visited[ny][nx] = true;
                queue.push([ny,nx]);
            }
        }
        if(count === house){
            min = Math.min(min , height[high] - height[low]);
            if(min === 0) return min;
            low++;
        }
        else high++;
    }
    return min;
}
const solution = input =>{
    const N = +input[0];
    const map = Array.from({length:N},(_,i)=>input[i+1].split(''));
    const heightMap =Array.from({length:N},(_,i)=>input[i+1+N].split(' ').map(Number));
    const height = Array.from(new Set(heightMap.flat())).sort((a,b) => a-b);
    let office , house = 0;
    map.forEach((row,y) => 
        row.forEach((el,x) => {
            if(el === 'P') office = {y,x};
            else if(el === 'K') house++;
        }))
    console.log(getMinFatigue(office,house,height,map,heightMap));
}
solution(input);