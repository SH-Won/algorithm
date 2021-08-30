//const [n,...move] =[5,25,25,25,25];
const fs = require('fs');
const [n,...move] = fs.readFileSync('/dev/stdin').toString().split(' ').map(num =>+num);

let visited = Array.from({length:(n*2)+1},()=>Array((n*2)+1).fill(false));
const dirChance = move.map(num => parseFloat(num*0.01) );
const distance = [[0,1],[0,-1],[-1,0],[1,0]];
visited[n][n]=true;
let maxChance =0;
dfs(n,n,0,1);
console.log(maxChance)
function dfs(y,x,count,chance){

    if(count === n){
        maxChance +=chance;
        return
    }
    for(let i=0; i<4; i++){
         const [ny,nx] = [y+distance[i][0],x+distance[i][1]];
         const nextChance = (chance * dirChance[i]);

         if(!visited[ny][nx]){
             visited[ny][nx] = true;
             dfs(ny,nx,count+1,nextChance);
             visited[ny][nx] =false;
         }
        
    }
}

