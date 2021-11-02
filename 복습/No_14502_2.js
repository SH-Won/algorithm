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
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+1].split(' '));
const dy = [-1,1,0,0];
const dx = [0,0,-1,1];
const solution = (map) =>{
    let virus = [];
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            if(map[y][x] ==='2') virus.push([y,x]);
        }
    }
    const isValidPos = (y,x)=>(y>=0 && x>=0 && y<N && x<M);
    const spreadVirus = (map) =>{
        virus.forEach(([y,x]) => map[y][x] ='1');
        let queue =[...virus];
        while(queue.length){
            const [y,x] = queue.shift();
            for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(!isValidPos(ny,nx) || map[ny][nx] !=='0') continue;
                map[ny][nx] = '1';
                queue.push([ny,nx]);
            }
        }
        return map.flat().filter(el => el ==='0').length;
    }
    let maxSafety = 0;
    const makeWall = (index,count) =>{
         if(count === 3){
            const copyMap = Array.from({length:N} ,(_,i) =>[...map[i]]);
            const safety = spreadVirus(copyMap);
            maxSafety = Math.max(maxSafety,safety);
            return;
         }
         for(let i=index; i<N*M; i++){
             const [y,x] = [Math.floor(i/M), i%M];
             if(map[y][x] !=='0') continue;
             map[y][x] = '1';
             makeWall(i+1,count+1);
             map[y][x] = '0';
         }
    }
    makeWall(0,0);
    console.log(maxSafety);
}
solution(map);
