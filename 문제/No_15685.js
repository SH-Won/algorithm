//const input =['3','3 3 0 1','4 2 1 3','4 2 2 1'];
// const input = ['4','3 3 0 1','4 2 1 3','4 2 2 1','2 7 3 4'];
//const input = ['10','5 5 0 0','5 6 0 0','5 7 0 0','5 8 0 0','5 9 0 0','6 5 0 0','6 6 0 0','6 7 0 0','6 8 0 0','6 9 0 0'];
const input = ['4','50 50 0 10','50 50 1 10','50 50 2 10','50 50 3 10'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const curve = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(num =>+num));

solution(curve);
function solution(curve){
    let visited = Array.from({length:101},()=>Array(101).fill(false));
    const isValidPos = (x,y) => (x>=0 && y>=0 && x<=100 && y<=100);
    const distance = [[0,-1],[-1,0],[0,1],[1,0]];
    const dragonCurve = (x,y,d,generation) =>{
        let dist = [d];
        visited[x][y] = true;
        const [sx,sy] = [x+distance[(d+3)%4][0],y+distance[(d+3)%4][1]];
        visited[sx][sy] = true;
        x = sx;
        y= sy;
       
        while(generation--){
            let length = dist.length;     
            while(length--){
                const i = dist[length]
                const [nx,ny] = [x+distance[i][0],y+distance[i][1]];
                dist.push((i+1) % 4);
                visited[nx][ny] = true;
                x=nx;
                y=ny;
            }
        }

    }
    for(let i=0; i<N; i++){
        const [x,y,d,generation] = curve[i];
        dragonCurve(x,y,d,generation);
    }
    let count = 0;
    for(let x=0; x<100; x++){
        for(let y=0; y<100; y++){
            if(visited[x][y] && visited[x+1][y] && visited[x][y+1] && visited[x+1][y+1])
            count++;
        }
    }
    return console.log(count);
}