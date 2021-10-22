// const input = [
//     '5 5',
//     '1 2 3 4 5',
//     '5 4 3 2 1',
//     '2 3 4 5 6',
//     '6 5 4 3 2',
//     '1 2 1 2 1',
//     ]
    // const input = [
    // '4 5',
    // '1 2 3 4 5',
    // '1 2 3 4 5',
    // '1 2 3 4 5',
    // '1 2 3 4 5',
    // ]
    // const input = [
    //     '4 10',
    //     '1 2 1 2 1 2 1 2 1 2',
    //     '2 1 2 1 2 1 2 1 2 1',
    //     '1 2 1 2 1 2 1 2 1 2',
    //     '2 1 2 1 2 1 2 1 2 1'
    // ]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ');
const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x)=>(y>=0 && x>=0 && y<N && x<M);
const minoT = (y,x) =>{
    let max = 0;
    let flag ;
    for(let order=0; order<4; order++){
        flag = true;
        let sum = map[y][x];
        for(let i=0; i<4; i++){
            if(order === i) continue;
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx)){
                flag = false;
                break;
            }
            sum+=map[ny][nx];
        }
       if(flag) max = Math.max(sum,max);
    }
    return max;
}
const solution = () =>{
    let answer = 0;
    let max = 0;
    let visited = Array.from({length:N},()=>Array(M).fill(false));

    const dfs = (y,x,count,sum) =>{
        if(count === 3){
            max = Math.max(sum,max);
            return;
        }
        visited[y][x] = true;
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || visited[ny][nx]) continue;
            const nextSum = map[ny][nx] + sum;
            visited[ny][nx] = true;
            dfs(ny,nx,count+1,nextSum);
            visited[ny][nx] = false;
        }
        visited[y][x] = false;
    }
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            dfs(y,x,0,map[y][x]);
            let sum = minoT(y,x);
            max = Math.max(max,sum);
        }
    }
    console.log(max);
}
solution();
