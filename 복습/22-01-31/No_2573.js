const input = ['5 7','0 0 0 0 0 0 0','0 2 4 5 3 0 0','0 3 0 2 5 2 0','0 7 6 2 4 0 0','0 0 0 0 0 0 0']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [dy,dx] = [[-1,1,0,0],[0,0,-1,1]];
const melt = (map) =>{
    let meltIce = [];
    for(let y=0; y<map.length; y++){
        for(let x=0; x<map[0].length; x++){
             if(map[y][x]){
                 let count = 0;
                 for(let i=0; i<4; i++){
                     const [ny,nx] = [y+dy[i],x+dx[i]];
                     if(ny < 0 || nx < 0 || ny >= map.length || nx >=map[0].length || map[ny][nx]) continue;
                     count++
                 }
                 if(count === 0) continue;
                 meltIce.push([y,x,count]);
             }
        }
    }
    if(!meltIce.length) return;
    meltIce.forEach(([y,x,count])=> map[y][x] = map[y][x]-count <= 0 ? 0 : map[y][x]-count);
}
const getGroupCount = (map) =>{
    let group = 0;
    let visited = Array.from({length:map.length} ,()=>Array(map[0].length).fill(false));
    const findGroup = (y,x) =>{
        visited[y][x] = true;
        let queue = [[y,x]];
        while(queue.length){
            const [y,x] = queue.shift();
            for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(ny < 0 || nx < 0 || ny >= map.length || nx >= map[0].length || visited[ny][nx] || !map[ny][nx]) continue;
                visited[ny][nx] = true;
                queue.push([ny,nx]);
            }
        }
    }
    for(let y=0; y<map.length; y++){
        for(let x=0; x<map[0].length; x++){
            if(!visited[y][x] && map[y][x]){
                findGroup(y,x);
                group++;
            }
            if(group === 2) return group;
        }
    }
    return group;
}
const solution = (input) =>{
    const [N,M] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    let years = 0;
    while(true){
        years++;
        melt(map);
        const group = getGroupCount(map);
        if(group === 0) return console.log(0);
        else if(group === 2) return console.log(years);
    }
}
solution(input);
