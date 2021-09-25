// console.log('A'.charCodeAt()-65);
//const input = ['2 4','CAAB','ADCB']
//const input = ['3 6','HFDFFB','AJHGDH','DGAGEH']
//const input = ['5 5','IEFCJ','FHFKC','FFALF','HFGCF','HMCHH']

//const fs= require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [R,C] = input[0].split(' ').map(Number);
const map = Array.from({length:R},(_,i)=>input[i+1].split('').map(alphabet => alphabet.charCodeAt()-65));
const distance= [[1,0],[-1,0],[0,1],[0,-1]];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<R && x<C);
const solution = () =>{
    let visited = Array(26).fill(false);
    visited[map[0][0]] = true;
    let max = 0;
    let count = 0;
    
    const dfs = (y,x) =>{
        count++;
        if(count > max) max = count;
        for(let i=0; i<distance.length; i++){
            const [ny,nx] = [y+distance[i][0],x+distance[i][1]];
            if(!isValidPos(ny,nx) || visited[map[ny][nx]]) continue;
            visited[map[ny][nx]] = true;
            dfs(ny,nx);
        }
        
        count--;
        visited[map[y][x]] = false;
    }
    dfs(0,0);
    return console.log(max);
}
solution();