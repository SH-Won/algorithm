//const input = ['2 0 3'];
const input = ['2 1 3','1 1'];
//const input = ['5 5 6','1 1','3 2','2 3','5 1','5 4'];
//const input = ['6 5 6','1 1','3 2','1 3','2 5','5 5'];
//const input = ['5 8 6','1 1','2 2','3 3','4 4','3 1','4 2','5 3','6 4'];
//const input = ['5 12 6','1 1','1 3','2 2','2 4','3 1','3 3','4 2','4 4','5 1','5 3','6 2','6 4'];
//const input = ['5 6 6','1 1','3 1','5 2','4 3','2 3','1 4'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M,H] = input[0].split(' ').map(num =>+num);
let ladder = Array.from({length:H+2},()=>Array(N+1).fill(0));

for(let i=1; i<=M; i++){
    const [a,b] = input[i].split(' ').map(num =>+num);
    ladder[a][b] = b+1;
    ladder[a][b+1] =b;
}

solution();
function solution() {
   // let visited = Array.from({length:H+2},()=>Array(N+1).fill(false));
    let isPossible = true;
    let minLadder = Infinity;
    const checkLadder = (y,x,end) =>{
        let flag = 0;
        while(true){
           
            if(y === H+1){
                
                return x ===end ? true : false;
            }
            if(!flag && ladder[y][x]){
                const nx = ladder[y][x];
                //if(!visited[y][nx]){
                  //  visited[y][nx] = true;
                   flag =1;
                    x = nx;
                    continue;
                //}

            }

           // visited[y+1][x] = true;
            y+=1;
            flag=0;
        }
    }

    const dfs = (idx,count,limit) =>{
       //console.log(idx,count);
        if(count === limit){
            for(let i=1; i<=N; i++){
            isPossible = checkLadder(0,i,i);
            if(!isPossible) break;
           // visited = visited.map(array => array.fill(false));
          }
          if(isPossible){
             process.exit(console.log(count));
          }
           return;
        }
        
        
        
       // if(count===3 && !isPossible) return;

        for(let i=idx; i<(H+1)*(N+1); i++){
            const [y,x] = [Math.floor(i/(N+1)),i % (N+1)];
            if(y === 0 || x===0 || x===N) continue;
            if(!ladder[y][x] && !ladder[y][x+1]){
               
                ladder[y][x] = x+1;
                ladder[y][x+1] = x;
                dfs(i+2,count+1,limit);
                ladder[y][x] = 0;
                ladder[y][x+1]= 0;
            }
        }

    }

    for(let i=0; i<=3; i++){
        dfs(0,0,i);
    }
    return console.log(-1);
}

