const input = ['5','11100','2###1','3###1','2###1','12210']
// const input = ['1','0'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution =input =>{
    const N = +input[0];
    const map = Array.from({length:N},(_,i)=>input[i+1].split(''));
    const [dy,dx] = [[-1,-1,-1,0,1,1,1,0],[-1,0,1,1,1,0,-1,-1]]
    let mine = 0;
    for(let x=0; x<N-1; x++) map[0][x] = +map[0][x];
    for(let y=0; y<N-1; y++) map[y][N-1] = +map[y][N-1];
    for(let x=N-1; x>0; x--) map[N-1][x] = +map[N-1][x];
    for(let y=N-1; y>0; y--) map[y][0] = +map[y][0];
    for(let y=1; y<N-1; y++){
    loop:for(let x=1; x<N-1; x++){
            for(let i=0; i<8; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(map[ny][nx] === 0) continue loop;
            }
            
            for(let j=0; j<8; j++){
                const [ny,nx] = [y+dy[j],x+dx[j]];
                if(map[ny][nx] > 0 && typeof map[ny][nx] === 'number'){
                    map[ny][nx]--;
                }
            }
            mine++;
        }
    }
    console.log(mine);
}
solution(input);