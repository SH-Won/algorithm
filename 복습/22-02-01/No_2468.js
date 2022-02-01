// const input = ['5','6 8 2 6 2','3 2 3 4 6','6 7 3 3 2','7 2 5 3 6','8 9 5 2 7']
const input = ['7','9 9 9 9 9 9 9','9 2 1 2 1 2 9','9 1 8 7 8 1 9','9 2 7 9 7 2 9','9 1 8 7 8 1 9','9 2 1 2 1 2 9','9 9 9 9 9 9 9'];
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getSafeArea = (map,rain) =>{
    const n = map.length;
    let visited = Array.from({length:n} ,() => Array(n).fill(false));
    const [dy,dx] = [[-1,1,0,0],[0,0,1,-1]];
    let safeArea = 0;

    for(let y=0; y<n; y++){
        for(let x=0; x<n; x++){
            if(!visited[y][x] && map[y][x] > rain){
                visited[y][x] = true;
                safeArea++;
                let queue = [[y,x]];
                while(queue.length){
                    const [y,x] = queue.shift();
                    for(let i=0; i<4; i++){
                        const [ny,nx] = [y+dy[i],x+dx[i]];
                        if(ny < 0 || nx < 0 || ny >= n || nx >= n || visited[ny][nx] || map[ny][nx] <= rain) continue;
                        queue.push([ny,nx]);
                        visited[ny][nx] = true;
                    }
                }
            }
        }
    }
    return safeArea;
}
const solution = (input) =>{
    const N = +input[0];
    const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    let maxHeight = 0;
    let answer = 0;
    map.forEach(row => maxHeight = Math.max(maxHeight,...row));
    for(let rain=0; rain<maxHeight; rain++) answer = Math.max(answer,getSafeArea(map,rain));
    console.log(answer);
}
solution(input);