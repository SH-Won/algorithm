//const input =['5 5 1','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0','1 1 1 1 1'];
//const input =['5 5 1','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0','1 1 1 1 1','0 0 0 0 0'];
//const input =['5 5 2','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0','1 1 1 1 1','0 0 0 0 0'];
//const input = ['5 5 5','1 1 1 1 1','1 1 1 1 1','1 1 1 1 1','1 1 1 1 1','1 1 1 1 1'];
//const input = ['6 5 1','1 0 1 0 1','0 1 0 1 0','1 1 0 0 0','0 0 0 1 1','1 1 0 1 1','0 0 1 0 0'];
// const input = ['6 5 2','1 0 1 0 1','0 1 0 1 0','1 1 0 0 0','0 0 0 1 1','1 1 0 1 1','0 0 1 0 0'];
// const input = ['5 5 2','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0','1 1 1 1 1'];
//const input = ['5 5 3','1 1 1 0 1','0 1 1 0 0','1 1 1 0 0','0 1 1 0 0','1 1 1 0 0']; //ans 13
// const input = ['5 5 2','1 0 1 1 1','0 1 1 1 1','1 0 1 0 1','1 1 0 1 0','1 0 1 0 1'] //ans 14
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M,D] = input[0].split(' ').map(Number);
const enemy = Array.from({length:N},(_,i)=>input[i+1].split(' '));
let count = N;
for(let i=0; i<N; i++){
    if(enemy[i].indexOf('1') !== -1){
        count-=i;
        break;
    }
}
// let killMap = new Map();
// const x = 1;
// const y = 2;
// killMap.set(`${x+y}`,true);
// let set = new Set();
// const x = 1;
// const y = 2;
// set.add(`${x},${y}`);
// set.add(`${x},${y}`);
// set.add("3,4")

// for(let value of set){
//     console.log(value.split(',').map(Number));
// }
//console.log(set.has(`1,2`))
solution(enemy,count);
function solution(enemy,count){
    let maxKill = 0;
    const distance = [[-1,0],[0,-1],[0,1]];
    const isValidPos  =(y,x) => (y>=0 && x>=0 && y<N & x<M);
    let visited = Array.from({length:N},()=>Array(M).fill(false));
    let killMap = new Set();
    
    const siege = (enemy,archerPos,count) =>{
        let kill = 0;
        const enemyMove = () =>{
            enemy = Array.from({length:N},(_,i)=>{
                if(i === 0) return Array(M).fill('0');
                return enemy[i-1]
            })
        }
        const closedEnemy = (y,x) =>{
            // if(enemy[y-1][x] === '1') return killMap.add(`${y-1},${x}`);
            let killable = [];
            let flag = false;
            let minDist ;
            let queue = [[y,x,0]];
            while(queue.length){
                const [cy,cx,d] = queue.shift();
                // if(d === D) break;
                if(d > D) break;
                if( cy !== y && enemy[cy][cx] === '1'){
                    flag = true;
                    killable.push([cy,cx,d]);
                    continue;
                }
                if(flag) continue
                
                distance.forEach(([my,mx])=>{
                    const [ny,nx] = [cy+my,cx+mx];
                    if(!isValidPos(ny,nx) || visited[ny][nx]) return;
                    visited[ny][nx] = true;
                    queue.push([ny,nx,d+1]);
                   // if(enemy[ny][nx] === '1') killable.push([ny,nx]);
                })
            }
            if(killable.length ===0) return;
            // killable.sort((a,b)=>a[1]-b[1]);
            killable.sort((a,b)=>{
                if(a[2] === b[2]){
                    if(a[1] === b[1]) return b[0]-a[0];
                    return a[1] - b[1]
                }
                return a[2] - b[2]
            })
           
            return killMap.add(`${killable[0][0]},${killable[0][1]}`);
           
        }

        const attack = () =>{
            for(let i=0; i<archerPos.length; i++){
                const [ay,ax] = archerPos[i];
                closedEnemy(ay,ax);
                visited = visited.map(array =>array.fill(false));
            }
            kill += killMap.size;
            
            for(let values of killMap){
                const [y,x] = values.split(',').map(Number);
                enemy[y][x] = '0';
            }
            killMap.clear();
        }

        while(count--){
            attack();
            enemyMove();
        }
       return kill;
    }

    const setArcher = (idx,archerCnt,archerPos) =>{
        if(archerCnt ===3){
            const copyEnemy = Array.from({length:N},(_,i)=> [...enemy[i]]);
            const kill =siege(copyEnemy,archerPos,count);
            
            maxKill = Math.max(kill,maxKill);
            return;
        }
        for(let i=idx; i<M; i++){
             let temp = [...archerPos];
             temp.push([N,i]);
             setArcher(i+1,archerCnt+1,temp);  
        }

    }
    setArcher(0,0,[]);
    return console.log(maxKill);
}