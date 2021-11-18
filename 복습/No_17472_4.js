const input = [
'7 8',
'0 0 0 0 0 0 1 1',
'1 1 0 0 0 0 1 1',
'1 1 0 0 0 0 0 0',
'1 1 0 0 0 1 1 0',
'0 0 0 0 0 1 1 0',
'0 0 0 0 0 0 0 0',
'1 1 1 1 1 1 1 1'
]
// const input = [
// '7 8',
// '0 0 0 1 1 0 0 0',
// '0 0 0 1 1 0 0 0',
// '1 1 0 0 0 0 1 1',
// '1 1 0 0 0 0 1 1',
// '1 1 0 0 0 0 0 0',
// '0 0 0 0 0 0 0 0',
// '1 1 1 1 1 1 1 1'
// ]
// const input = [
// '7 8',
// '1 0 0 1 1 1 0 0',
// '0 0 1 0 0 0 1 1',
// '0 0 1 0 0 0 1 1',
// '0 0 1 1 1 0 0 0',
// '0 0 0 0 0 0 0 0',
// '0 1 1 1 0 0 0 0',
// '1 1 1 1 1 1 0 0',
// ]
// const input = [
//     '7 7',
//     '1 1 1 0 1 1 1',
//     '1 1 1 0 1 1 1',
//     '1 1 1 0 1 1 1',
//     '0 0 0 0 0 0 0',
//     '1 1 1 0 1 1 1',
//     '1 1 1 0 1 1 1',
//     '1 1 1 0 1 1 1'
//     ]
    // const input =[
    // '8 8',
    // '0 0 0 1 1 1 1 0',
    // '0 1 1 1 1 0 1 0',
    // '0 1 0 1 1 1 0 0',
    // '0 1 0 0 0 1 0 0',
    // '0 0 0 1 0 0 1 0',
    // '0 0 0 0 0 1 0 0',
    // '0 1 1 1 0 0 0 0',
    // '0 1 0 0 0 1 0 0'
    // ]
    // const input =[
    // '6 10',
    // '1 1 1 1 1 1 1 1 1 1',
    // '1 0 0 0 0 0 1 0 0 0',
    // '1 0 1 0 1 0 1 0 0 1',
    // '1 0 1 1 1 0 1 0 0 1',
    // '0 0 0 0 0 0 0 0 0 1',
    // '1 1 0 1 1 1 1 1 0 1',
    // ]//ans 12;
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const map = Array.from({length:N}, (_,i)=>input[i+1].split(' ').map(Number));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);

const getParent = (parent,i) =>{
    if(parent[i] === i) return i;
    return parent[i] = getParent(parent,parent[i]);

}
const findParent = (parent,a,b) =>{
    a = getParent(parent,a);
    b = getParent(parent,b);
    return a===b ? true : false;
}
const unionParent = (parent,a,b) =>{
    a = getParent(parent,a);
    b = getParent(parent,b);
    a < b ? parent[b] = a : parent[a] = b;
}
const labeling = (y,x,number,group,visited) =>{
    visited[y][x] = true;
    let queue = [[y,x]];
    while(queue.length){
        const [cy,cx] = queue.shift();
        group[cy][cx] = number;
        for(let i=0; i<4; i++){
            const [ny,nx] = [cy+dy[i],cx+dx[i]];
            if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] === 0) continue;
            queue.push([ny,nx]);
            visited[ny][nx] = true;
        }
    }
}
const getPath = (group) =>{
    let distance = Array.from({length:N}, ()=> Array(M).fill(-1));
    let queue = [] , path = [];
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            if(group[y][x]){
                for(let i=0; i<4; i++){
                    queue.push([y,x,i]);
                }
                distance[y][x] = 0;
            }
        }
    }
    console.log(distance.map(row => row.join(' ')).join('\n'))
    while(queue.length){
        const [y,x,dir] = queue.shift();
        
            const [ny,nx] = [y+dy[dir],x+dx[dir]];
            if(!isValidPos(ny,nx) || group[y][x] === group[ny][nx]) continue;
            if(distance[ny][nx] === -1){
                group[ny][nx] = group[y][x];
                queue.push([ny,nx,dir]);
                distance[ny][nx] = distance[y][x] + 1;
            }
            
            else if(distance[y][x] + distance[ny][nx] >=2){
                path.push({from:group[y][x]-1, to:group[ny][nx]-1 , distance: distance[y][x]+distance[ny][nx]})
                path.push({from:group[ny][nx]-1, to:group[y][x]-1 , distance: distance[y][x]+distance[ny][nx]})
              }
            
    }
    console.log('---')
    console.log(distance.map(row => row.join(' ')).join('\n'))
    path.sort((a,b) => a.distance - b.distance);
    return path;
}
const solution = (map) =>{
    let group = Array.from({length:N}, ()=>Array(M).fill(0));
    let visited = Array.from({length:N} ,()=>Array(M).fill(false));
    let number = 0;
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            if(!visited[y][x] && map[y][x]){
                number++;
                labeling(y,x,number,group,visited);
            }
        }
    }
    // console.log(group.map(row => row.join(' ')).join('\n'));
    let parent = Array.from({length:number},(_,i)=> i);
    console.log(parent);
    const path = getPath(group);
    console.log(path);
    let minDistance = 0;
    for(let i=0; i<path.length; i++){
        const {from,to,distance} = path[i];
        if(!findParent(parent,from,to)){
            minDistance+=distance;
            unionParent(parent,from,to);
        }
    }
    for(let i=0; i<parent.length-1; i++){
        const [a,b] = [parent[i],parent[i+1]];
        if(!findParent(parent,a,b)) return console.log(-1);
    }
    console.log(minDistance);
}
solution(map);