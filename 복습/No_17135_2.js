// const input =['5 5 1','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0','1 1 1 1 1'];
// const input =['5 5 1','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0','1 1 1 1 1','0 0 0 0 0'];
//const input =['5 5 2','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0','1 1 1 1 1','0 0 0 0 0'];
//const input = ['5 5 5','1 1 1 1 1','1 1 1 1 1','1 1 1 1 1','1 1 1 1 1','1 1 1 1 1'];
//const input = ['6 5 1','1 0 1 0 1','0 1 0 1 0','1 1 0 0 0','0 0 0 1 1','1 1 0 1 1','0 0 1 0 0'];
//const input = ['6 5 2','1 0 1 0 1','0 1 0 1 0','1 1 0 0 0','0 0 0 1 1','1 1 0 1 1','0 0 1 0 0'];
//const input = ['5 5 2','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0','1 1 1 1 1'];

//const input = ['5 5 3','1 1 1 0 1','0 1 1 0 0','1 1 1 0 0','0 1 1 0 0','1 1 1 0 0']; //ans 13
//const input = ['5 5 2','1 0 1 1 1','0 1 1 1 1','1 0 1 0 1','1 1 0 1 0','1 0 1 0 1'] //ans 14

//const fs =require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M,D] = input[0].split(' ').map(Number);
const battleField = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x)=> (y>=0 && x>=0 && y<N && x<M);
const fowardEnemy = (battleField) =>{
    return [Array(M).fill(0)].concat(battleField.slice(0,N-1));
}
const killEnemy = (archer,battleField)=>{
    let enemy = new Set();
    for(let i=0; i<archer.length; i++){
        const catchEnemy = findEnemy(archer[i],battleField);
        if(catchEnemy){
            const {y,x} = catchEnemy;
            enemy.add(`${y},${x}`);
        }
    }
    for(let value of enemy){
        const [y,x] = value.split(',').map(Number);
        battleField[y][x] = 0;
    }
    return enemy.size;
}
const findEnemy = (archer,battleField) =>{
    const [ay,ax] = archer
    let enemy = [];
    let queue = [[ay-1,ax,1]];
    // let visited = Array.from({length:N},()=>Array(M).fill(false));
    let visited = new Set();
    // visited[ay-1][ax] = true;
    visited.add(`${ay-1},${ax}`)
    let isFind = false;
    while(queue.length){
        const [y,x,distance] = queue.shift();
        if(distance <=D && battleField[y][x]){
            enemy.push({y,x,distance});
            isFind = true;
            continue;
        }
        if(isFind) continue;
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || visited.has(`${ny},${nx}`)) continue;
            visited.add(`${ny},${nx}`)
            queue.push([ny,nx,distance+1]);
        }
    }
    if(!enemy.length) return false;
    enemy.sort((a,b)=>{
        if(a.distance === b.distance) return a.x - b.x;
        return a.distance - b.distance;
    })
    return enemy[0];
}
const seige = (battleField,archer) =>{
    let isExist = true;
    let killCount = 0;
    while(isExist){
        killCount += killEnemy(archer,battleField);
        battleField = fowardEnemy(battleField);
        // console.log(battleField.map(row => row.join(' ')).join('\n'))
        isExist = battleField.some(row => row.some(enemy => enemy));
    }
    return killCount;
}
const solution = (battleField) =>{
    let archer = Array(3);
    let maxKill = 0;
    const setArcher = (index,count) =>{
        if(count === 3){
            const copyField = Array.from({length:N},(_,i)=>[...battleField[i]]);
            const kill = seige(copyField,archer);
            return maxKill = Math.max(maxKill,kill);
        }
        for(let i=index; i<M; i++){
            archer[count] = [N,i];
            setArcher(i+1,count+1);
        }
    }
    setArcher(0,0);
    console.log(maxKill);
}
solution(battleField);