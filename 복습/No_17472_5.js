// const input = [
// '7 8',
// '0 0 0 0 0 0 1 1',
// '1 1 0 0 0 0 1 1',
// '1 1 0 0 0 0 0 0',
// '1 1 0 0 0 1 1 0',
// '0 0 0 0 0 1 1 0',
// '0 0 0 0 0 0 0 0',
// '1 1 1 1 1 1 1 1'
// ]
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
const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
const getParent = (parent,i) =>{
    if(parent[i] === i) return i;
    return parent[i] = getParent(parent,parent[i]);
}
const findParent = (parent,a,b) =>{
    a = getParent(parent,a);
    b = getParent(parent,b);
    return a===b;
}
const unionParent = (parent,a,b) =>{
    a = getParent(parent,a);
    b = getParent(parent,b);
    a > b ? parent[a] = b : parent[b] = a;
}
const getMinLength = (path,parent) =>{
    path.sort((a,b) => a.length - b.length);
    let totalLength = 0;
    for(let i=0; i<path.length; i++){
        const {from,to,length} = path[i];
        if(!findParent(parent,from,to)){
            unionParent(parent,from,to);
            totalLength+=length;
        }
    }
    let flag = true;
    for(let i=0; i<parent.length-1; i++){
        if(!findParent(parent,parent[i],parent[i+1])){
            flag = false;
            break;
        }
    }
    return flag ? totalLength : -1;
}
const makePath = (map) =>{
    const [N,M] = [map.length, map[0].length];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
    let path = [];
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            const island = map[y][x];
            if(island){
                for(let i=0; i<4; i++){
                    let [ny,nx] = [y+dy[i],x+dx[i]];
                    let length = 0;
                    while(isValidPos(ny,nx) && !map[ny][nx]){
                        ny+=dy[i] , nx+=dx[i] , length++;
                    }
                    if(isValidPos(ny,nx) && length >=2 && island !== map[ny][nx]){
                       path.push({from:island-1,to:map[ny][nx]-1,length});
                    }
                }
            }
        }
    }
    return path;
}
const numbering = (map) =>{
    const [N,M] = [map.length, map[0].length];
    let visited = Array.from({length:N},()=>Array(M).fill(false));
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
    const findSameGround = (y,x,number) =>{
        visited[y][x] = true;
        map[y][x] = number;
        let queue = [[y,x]];
        while(queue.length){
            const [y,x] = queue.shift();
            for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] !== 1) continue;
                queue.push([ny,nx]);
                visited[ny][nx] = true;
                map[ny][nx] = number;
            }
        }
    }
    let number = 0;
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            if(!visited[y][x] && map[y][x] === 1){
                number++;
                findSameGround(y,x,number);
            }
        }
    }
    return Array(number).fill().map((v,i) => i);
}
const solution = (input) =>{
    let map = Array.from({length:input.length-1},(_,i) => input[i+1].split(' ').map(Number));
    let parent = numbering(map);
    const path = makePath(map);
    const answer = getMinLength(path,parent);
    console.log(answer);
}
solution(input);