// const input = [
// '3 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1'
// ]
// const input = [
// '3 2',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2'
// ]
// const input = [
// '3 5',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 0 3 2'
// ]
// const input = [
// '3 10',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 0 3 2 1 2 3 2 3'
// ]
// const input = [
// '3 10',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 1 2 3 1 2 3 1',
// ]
// const input = [
//     '3 10',
//     '1 0 3 4 5 6 7 0',
//     '8 0 6 5 4 3 2 1',
//     '1 2 0 4 5 6 7 0',
//     '8 7 6 5 4 3 2 1',
//     '1 2 3 4 0 6 7 0',
//     '8 7 0 5 4 3 2 1',
//     '1 2 3 4 5 6 7 0',
//     '0 7 0 5 4 3 2 1',
//     '1 2 3 1 2 3 1 2 3 1'
//     ]

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getMass = (map) =>{
    const n = map.length; 
    const [dy,dx] = [[-1,1,0,0],[0,0,-1,1]];
    let visited = Array.from({length:n},()=>Array(n).fill(false));
    let mass = 0;
    const findIce = (y,x) =>{
        visited[y][x] = true;
        let queue = [[y,x]];
        let count = 0;
        while(queue.length){
            const [y,x] = queue.shift();
            count++;
            for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(ny < 0 || nx < 0 || ny >=n || nx >=n || visited[ny][nx] ||!map[ny][nx] ) continue; 
                queue.push([ny,nx]);
                visited[ny][nx] = true;
            }
        }
        if(count === 1) return;
        mass = Math.max(mass,count);
    }
    for(let y=0; y<n; y++){
        for(let x=0; x<n; x++){
            if(!visited[y][x] && map[y][x]){
                findIce(y,x);
            }
        }
    }
    return mass;
}
const melt = (map) =>{
    const n = map.length;
    const [dy,dx] = [[-1,1,0,0],[0,0,-1,1]];
    const isValidPos = (y,x) =>(y>=0 && x>=0 && y<n && x<n);
    let meltMap = Array.from({length:n},()=>Array(n).fill(0));
    for(let y=0; y<n; y++){
    loop:for(let x=0; x<n; x++){
            if(!map[y][x]) continue;
            let count = 0;
            for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(!isValidPos(ny,nx) || !map[ny][nx]) count++;
                if(count >=2){
                    meltMap[y][x] = (map[y][x] - 1);
                    continue loop;
                }
            }
            meltMap[y][x] = map[y][x];
        }
    }
    return meltMap;
}
const rotate = (y,x,L,map) =>{
    let temp = Array.from({length:L},()=>Array(L));
    for(let i=0; i<L; i++){
        for(let j=0; j<L; j++){
            temp[j][L-i-1] = map[y+i][x+j];
        }
    }
    for(let i=0; i<L; i++){
        for(let j=0; j<L; j++){
            map[y+i][x+j] = temp[i][j];
        }
    }
}
const solution = (input) =>{
    let [N,Q] = input[0].split(' ').map(Number);
    const n = Math.pow(2,N);
    let map = Array.from({length:n},(_,i) =>input[i+1].split(' ').map(Number));
    const command = input[1+n].split(' ').map(Number);
    let i = 0;
    while(Q--){
        const L = command[i++];
        const l = Math.pow(2,L);
        for(let y=0; y<n; y+=l){
           for(let x=0; x<n; x+=l){
               rotate(y,x,l,map);
           }
        }
        map = melt(map);
    }
    const sum = map.reduce((acc,cur)=> acc+=cur.reduce((acc,cur)=> acc+=cur ,0),0);
    const mass = getMass(map);
    console.log(`${sum}\n${mass}`);
}
solution(input);