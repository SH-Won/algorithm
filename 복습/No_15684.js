//const input = ['2 0 3'];
//const input = ['2 1 3','1 1'];
//const input = ['5 5 6','1 1','3 2','2 3','5 1','5 4'];
//const input = ['6 5 6','1 1','3 2','1 3','2 5','5 5'];
//const input = ['5 8 6','1 1','2 2','3 3','4 4','3 1','4 2','5 3','6 4'];
//const input = ['5 12 6','1 1','1 3','2 2','2 4','3 1','3 3','4 2','4 4','5 1','5 3','6 2','6 4'];
const input = ['5 6 6','1 1','3 1','5 2','4 3','2 3','1 4'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M,H] = input[0].split(' ').map(Number);
const row = Array.from({length:M},(_,i)=>input[i+1].split(' ').map(Number));

const solution = () => {
    let ladder = Array.from({length:H+2},()=>Array(N+1).fill(0));
    for(let i=0; i<M; i++){
        const [a,b] = row[i];
        ladder[a][b] = b+1;
        ladder[a][b+1] = b;
    }
    const checkResult = () =>{
        for(let i=1; i<=N; i++){
            let go = false;
            let [y,x] = [1,i];
            while(true){
                if(y === H+1){
                    if(x !== i) return false;
                    break;
                }
                if(!go && ladder[y][x]){
                    go = true;
                    x = ladder[y][x];
                    continue;
                }
                y+=1;
                go = false;
            }
        }
       return true;
    }

    const dfs = (index,count,max) =>{
        if(count === max){
            let check = checkResult();
            if(check) process.exit(console.log(count))
            return;
        }
        for(let i=index; i<(N+1)*(H+1); i++){
            const [y,x] = [Math.floor(i/(N+1)), i % (N+1)];
            if(y===0 || x===0 || x===N) continue;
            if(!ladder[y][x] && !ladder[y][x+1]){
                ladder[y][x] = x+1;
                ladder[y][x+1] = x;
                dfs(i+2,count+1,max);
                ladder[y][x] = 0;
                ladder[y][x+1] = 0;
            }
        }
    }

    for(let i=0; i<=3; i++){
        dfs(0,0,i)
    }
   console.log(-1);
}
solution();