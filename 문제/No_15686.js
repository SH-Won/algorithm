//const input = ['5 3','0 0 1 0 0','0 0 2 0 1','0 1 2 0 0','0 0 1 0 0','0 0 0 0 2'];
// const input = ['5 2','0 2 0 1 0','1 0 1 0 0','0 0 0 0 0','2 0 0 1 1','2 2 0 1 2'];
// const input = ['5 1','1 2 0 0 0','1 2 0 0 0','1 2 0 0 0','1 2 0 0 0','1 2 0 0 0'];
//const input = ['5 1','1 2 0 2 1','1 2 0 2 1','1 2 0 2 1','1 2 0 2 1','1 2 0 2 1']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(num =>+num);
const city = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(num =>+num));

solution(city,M);
function solution(city,M){
    let housePos = [];
    let chickenPos = [];
    let minDistance = Infinity;
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(city[y][x] === 1) housePos.push([y,x]);
            if(city[y][x] === 2) chickenPos.push([y,x]);
        }
    }
    const getMinDistance = (chickenPos) =>{
         let distance = 0;
         for(let i=0; i<housePos.length; i++){
             let min = Infinity; 
             const [hy,hx] = housePos[i];
             for(let j=0; j<chickenPos.length; j++){
                 const [cy,cx] = chickenPos[j];
                 min = Math.min(min,Math.abs(hy-cy) + Math.abs(hx-cx));
             }
             distance+=min;
         }
         return distance;
    }


    const dfs = (cPos,limit,idx) =>{

        if(cPos.length === limit){
            const totalMinDistance = getMinDistance(cPos);
            minDistance = Math.min(minDistance,totalMinDistance);
            return;
        }

        for(let i=idx; i<chickenPos.length; i++){
             let temp =[...cPos];
             temp.push(chickenPos[i]);
             dfs(temp,limit,i+1);
        }
    }
    for(let i=1; i<=M; i++){
        dfs([],i,0);
    }
    
    return console.log(minDistance);
}