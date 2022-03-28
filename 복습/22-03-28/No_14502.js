// const input =[
//     '7 7',
// '2 0 0 0 1 1 0',
// '0 0 1 0 1 2 0',
// '0 1 1 0 1 0 0',
// '0 1 0 0 0 0 0',
// '0 0 0 0 0 1 1',
// '0 1 0 0 0 0 0',
// '0 1 0 0 0 0 0'
// ]
// const input =[
//     '4 6',
// '0 0 0 0 0 0',
// '1 0 0 0 0 2',
// '1 1 1 0 0 2',
// '0 0 0 0 0 2',
// ]
const input =[
    '8 8',
'2 0 0 0 0 0 0 2',
'2 0 0 0 0 0 0 2',
'2 0 0 0 0 0 0 2',
'2 0 0 0 0 0 0 2',
'2 0 0 0 0 0 0 2',
'0 0 0 0 0 0 0 0',
'0 0 0 0 0 0 0 0',
'0 0 0 0 0 0 0 0',
]
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getSafety = (map) =>{
    return map.reduce((acc,row) => acc+=row.reduce((acc,el) => acc+= (!el ? 1 : 0),0),0);
}
const spreadVirus = (virus,map) =>{
    const [N,M] = [map.length, map[0].length];
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    let queue = [...virus];
    while(queue.length){
        const [y,x] = queue.shift();
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= N || nx >= M || map[ny][nx] !== 0) continue;
            queue.push([ny,nx]);
            map[ny][nx] = 2;
        }
    }
}
const solution = input =>{
    const [N,M] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i) => input[i+1].split(' ').map(Number));
    const virus = [];
    map.forEach((row,y) =>
       row.forEach((el,x)=>{
           if(el === 2) virus.push([y,x]);
       })
    );
    let max = 0;
    const makeWall = (y,x,count) =>{
        if(count === 3){
            const copyMap = map.map(row => [...row]);
            spreadVirus(virus,copyMap);
            const safety = getSafety(copyMap);
            max = Math.max(safety,max);
            return;
        }
        if(y === N) return;
        if(x === M)  return makeWall(y+1,0,count);
        if(map[y][x] !== 0) return makeWall(y,x+1,count);
        else{
            map[y][x] = 1;
            makeWall(y,x+1,count+1);
            map[y][x] = 0;
        }
        return makeWall(y,x+1,count);
    }
    makeWall(0,0,0);
    console.log(max);
}
solution(input);
