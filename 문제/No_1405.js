// 같은 곳을 한번보다 많이 이동 하지 않는 경우는 단순하다.
// 같은 곳을 두번이상 이동 하는 경우를 구해서 전체에서 뺀다.
// 같은곳을 두번이상 이동하는 경우
const [n,...arr]= [6,25,25,25,25];
//const fs = require('fs');
//const [n,...arr] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(num => +num);
let visited = Array.from({length:(n*2)+1},()=>Array((n*2)+1).fill(false));
const move = [...arr];
const distance = [[0,1],[0,-1],[-1,0],[1,0]];
visited[n][n] = true;
let maxCount =0;
dfs(n,n,0,[0,0,0,0]);
console.log(parseFloat((maxCount/(4**n)).toFixed(9)));
function dfs(y,x,count,direction){

    if(count === n){
    
        maxCount++;
        return;
    }
    
    for(let i=0; i<4; i++){
       
        
        if(direction[i]=== move[i]) continue;
        let temp = [...direction];
        temp[i]++;
        const [ny,nx] = [y+distance[i][0],x+distance[i][1]];
        if(!visited[ny][nx]){
            visited[ny][nx] = true;
            dfs(ny,nx,count+1,temp);
            visited[ny][nx] =false;
            
           // continue;
        }
        
        
        
    }

    
}