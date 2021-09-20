const input = ['2','4 0 0 0 0 0 0 0 0','4 0 0 0 0 0 0 0 0'];
//const input = ['2','4 0 0 0 1 1 1 0 0','0 0 0 0 0 0 0 0 0'];
// const input = ['2','0 4 4 4 4 4 4 4 4 4','0 4 4 4 4 4 4 4 4 4'];
//const input = ['2','4 3 2 1 0 4 3 2 1','1 2 3 4 1 2 3 4 0'];
//const input = ['9','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0'];
// const input = [
// '9',
// '1 2 4 3 0 2 1 0 3',
// '1 2 1 2 0 0 0 0 1',
// '3 4 2 3 1 2 3 4 0',
// '0 1 2 3 4 2 1 0 0',
// '0 0 0 0 0 0 1 4 4',
// '0 4 0 4 0 4 0 4 0',
// '0 4 2 2 2 2 2 2 2',
// '1 1 1 1 1 1 1 1 0',
// '0 2 0 3 0 1 0 2 0'
// ]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input[0];
const point = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
let entry = Array(9)
let assigned =Array(10).fill(false);
let maxScore = 0;
const game = () =>{
    let base = Array(4).fill(false);
    let inning =0;
    let score =0;
    let start = 0;
    while(inning < N){
        let outCount = 0;
        base.fill(false);
        //let points = Array.from({length:9},(_,i)=>point[inning][order[i]]);
        // console.log(points);
        while(outCount < 3){
            const player = entry[start % 9];
            const playerPoint = point[inning][player];
            if(playerPoint ===0){
                outCount++;
                start++;
                continue;
            }
            else{
                for(let number=3; number>=1; number--){
                    if(base[number]){
                      number+playerPoint >=4 ? score++ : base[number+playerPoint] =true;
                      base[number] = false;
                    }
                }
                playerPoint === 4 ? score++ : base[playerPoint] = true;
                start++;
            } 
            
        }
        inning++;
    }
    return score;
}
const dfs = (index) =>{

    if(index === 9){
       const score =  game();
       //console.log(entry);
       maxScore = Math.max(score,maxScore);
       return;
    }
    if(index === 3){
       // console.log(entry);
        entry[index] = 0;
        return dfs(index+1);
    }
    for(let i=1; i<=8; i++){
        if(!assigned[i]){
            entry[index] = i;
            assigned[i] = true;
            dfs(index+1);
            assigned[i] = false;
        }
    }
    
}
dfs(0);
console.log(maxScore);