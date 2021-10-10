// const input = [
// '5 4',
// '0 0 1 0 2',
// '2 3 2 1 0',
// '4 3 2 9 0',
// '1 0 2 9 0',
// '8 8 2 1 0',
// '1 3',
// '3 4',
// '8 1',
// '4 8'
// ]
const input = [
'5 8',
'0 0 1 0 2',
'2 3 2 1 0',
'0 0 2 0 0',
'1 0 2 0 0',
'0 0 2 1 0',
'1 9',
'2 8',
'3 7',
'4 6',
'5 5',
'6 4',
'7 3',
'8 2'
]
// const input = [
// '5 8',
// '100 100 100 100 100',
// '100 100 100 100 100',
// '100 100 100 100 100',
// '100 100 100 100 100',
// '100 100 100 100 100',
// '8 1',
// '7 1',
// '6 1',
// '5 1',
// '4 1',
// '3 1',
// '2 1',
// '1 1',
// ]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
let map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
let visited = Array.from({length:N},()=>Array(N).fill(false));
const info = Array.from({length:M},(_,i)=>input[i+N+1].split(' ').map(Number));
const dy = [0,0,-1,-1,-1,0,1,1,1];
const dx = [0,-1,-1,0,1,1,1,0,-1];
const cross =[[1,1],[1,-1],[-1,1],[-1,-1]];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);

const waterBug = () =>{

}
const rainning_waterBug = (d,s) =>{
    const dist = s % N;
    let clouds = [];
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(!visited[y][x]) continue;
            const [ny,nx] = [( y+dy[d]*dist + N ) % N, ( x+dx[d]*dist + N ) % N ];
            clouds.push([ny,nx]);
            visited[y][x] = false;
            map[ny][nx]+=1;
        }
    }
    clouds.forEach(([y,x]) => visited[y][x] = true);
    
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(!visited[y][x]) continue;
            let count = 0;
            for(let i=0; i<cross.length; i++){
                const [ny,nx] = [y+cross[i][0],x+cross[i][1]];
                if(!isValidPos(ny,nx) || !map[ny][nx] ) continue;
                count++
            }
            map[y][x]+=count;
        }
    }

   for(let y=0; y<N; y++){
       for(let x=0; x<N; x++){
           if(visited[y][x]){
               visited[y][x] = false;
               continue;
           }
           else if(!visited[y][x] && map[y][x] >= 2){
               visited[y][x] = true;
               map[y][x]-=2;
           }
       }
   }
}
let i=0;
visited[N-1][0] = true , visited[N-1][1] = true , visited[N-2][0] = true , visited[N-2][1] = true;

while(i<info.length){
    const [d,s] = info[i];
    rainning_waterBug(d,s);
    i++

}
const sum = map.reduce((acc,cur)=> acc+=cur.reduce((acc,cur)=>acc+=cur,0),0);
console.log(sum);
