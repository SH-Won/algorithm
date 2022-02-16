// const input = ['4','1 1 1 1','1 1 1 1','1 1 1 1','1 1 1 1'];
const input = ['3','3 4 3','2 5 2','5 2 2']
// const fs =require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const isPossible = (slope,map) =>{
    const n = map.length;
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const visited = Array.from({length:n},()=>Array(n).fill(false));
    visited[0][0] = true;
    let queue = [[0,0]];
    while(queue.length){
        const [y,x] = queue.shift();
        if(y === n-1 && x === n-1) return true;
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= n || nx >= n || visited[ny][nx] || Math.abs(map[y][x] - map[ny][nx]) > slope) continue;
            queue.push([ny,nx]);
            visited[ny][nx] = true;
        }
    }
    return false;
}
const getMinSlope = (map,max) =>{
    let left = 0;
    let right = max-1;
    while(left <= right){
        const mid = Math.floor((left+right) / 2);
        if(isPossible(mid,map)) right = mid-1;
        else left = mid+1;
    }
    return left;
}
const solution = input =>{
    const N = +input[0];
    const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    let max = 0;
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++) if(map[y][x] > max) max = map[y][x];
    }
    const answer = getMinSlope(map,max);
    console.log(answer);
}
solution(input);