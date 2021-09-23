//const input =['5 5 1','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0','1 1 1 1 1'];
//const input =['5 5 1','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0','1 1 1 1 1','0 0 0 0 0'];
//const input =['5 5 2','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0','1 1 1 1 1','0 0 0 0 0'];
//const input = ['5 5 5','1 1 1 1 1','1 1 1 1 1','1 1 1 1 1','1 1 1 1 1','1 1 1 1 1'];
//const input = ['6 5 1','1 0 1 0 1','0 1 0 1 0','1 1 0 0 0','0 0 0 1 1','1 1 0 1 1','0 0 1 0 0'];
//const input = ['6 5 2','1 0 1 0 1','0 1 0 1 0','1 1 0 0 0','0 0 0 1 1','1 1 0 1 1','0 0 1 0 0'];
// const input = ['5 5 2','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0','1 1 1 1 1'];

const input = ['5 5 3','1 1 1 0 1','0 1 1 0 0','1 1 1 0 0','0 1 1 0 0','1 1 1 0 0']; //ans 13
//const input = ['5 5 2','1 0 1 1 1','0 1 1 1 1','1 0 1 0 1','1 1 0 1 0','1 0 1 0 1'] //ans 14

let set = new Set();
const pos = {y:4,x:4,d:2};
set.add(`${pos.y}${pos.x}`);
set.add(`${pos.y}${pos.x}`);
set.add(`${pos.y}${pos.x}`);
for(let values of set){
    console.log(values);
    const [y,x] = values.split('').map(Number);
    console.log(y);
    console.log(x);
    
}
set.clear();
console.log(set);


//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M,D] = input[0].split(' ').map(Number);
const enemy = Array.from({length:N},(_,i)=>input[i+1].split(' '));

const solution = (enemy) =>{
    let archer = Array(3);
    let advancable =N;
    let maxKill = 0;
    const distance = [[-1,0],[0,1],[0,-1]];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
    let visited = Array.from({length:N},()=>Array(M).fill(false));
    let killMap = new Set();
    for(let i=0; i<enemy.length; i++){
        if(enemy[i].indexOf('1') !==-1){
            advancable-=i;
            break;
        }
    }
    
    const siege = (enemy,advancable) =>{
        
        
        let kill = 0;

        const advanceEnemy= () =>{
            enemy = Array.from({length:N},(_,i)=>{
                if(i === 0) return Array(M).fill('0');
                return enemy[i-1];
            })
        
        }

        const findEnemy = (y,x) =>{
           // if(enemy[y-1][x] === '1') return killMap.add(`${y-1}${x}`);
            let queue= [[y,x,0]];
            
            let killable = [];
            let flag = false;
            while(queue.length){
                const [cy,cx,dist] =queue.shift();
                if(dist > D) break;
                if(cy !==y && enemy[cy][cx] ==='1'){
                    killable.push({y:cy,x:cx,d:dist});
                    flag = true;
                    continue;
                }
                if(flag) continue;
                distance.forEach(([my,mx])=>{
                    const [ny,nx] = [cy+my,cx+mx];
                    if(!isValidPos(ny,nx) || visited[ny][nx] ) return;
                    visited[ny][nx] = true;
                    queue.push([ny,nx,dist+1]);
                })
            }
            if(killable.length === 0) return;
            
            killable.sort((a,b)=>{
                if(a.d === b.d){
                     if(a.x === b.x) return b.y-a.y;
                    return a.x-b.x
                }
                return a.d - b.d
            })
         
            return killMap.add(`${killable[0].y},${killable[0].x}`)
        }
        
        const attack = () =>{
        
            for(let i=0; i<archer.length; i++){
                const [y,x] = [N,archer[i]];
                findEnemy(y,x);
                visited = visited.map(array => array.fill(false));
            }
            kill+=killMap.size;
            for(let value of killMap){
                const [y,x] = value.split(',').map(Number);
                enemy[y][x] = '0';
            }
            killMap.clear();
          
        }
                
        while(advancable--){
            
            attack();
            advanceEnemy();
        }
        
        return kill;
    }

    const putArcher = (index,count) =>{
        if(count === 3){
            
            const copyEnemy = Array.from({length:N},(_,i)=> [...enemy[i]]);
            const kill = siege(copyEnemy,advancable);
            maxKill = Math.max(maxKill,kill);
            return
        }

        for(let i=index; i<M; i++){
             archer[count] = i;
             putArcher(i+1,count+1);
        }
    }
    putArcher(0,0);
    return console.log(maxKill);
}

solution(enemy);