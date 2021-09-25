// console.log('A'.charCodeAt()-65);
// const input = ['2 4','CAAB','ADCB']
const input = ['3 6','HFDFFB','AJHGDH','DGAGEH']
//const input = ['5 5','IEFCJ','FHFKC','FFALF','HFGCF','HMCHH']
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [R,C] = input[0].split(' ').map(Number);
const map = Array.from({length:R},(_,i)=>input[i+1].split(''));

const solution = (map) =>{
    let max = 0;
    let visited = Array(26).fill(false);
    //let count = Array.from({length:R},()=>Array(C).fill(0));
    const distance = [[1,0],[-1,0],[0,1],[0,-1]];
    const isValidPos = (y,x)=>(y>=0 && x>=0 && y<R && x<C);
    visited[map[0][0].charCodeAt()-65] = true;
    const dfs = (y,x,cnt) =>{

        for(let i=0; i<distance.length; i++){
            const [ny,nx] = [y+distance[i][0],x+distance[i][1]];
            if(!isValidPos(ny,nx)) continue;
            const nextAlphabet = map[ny][nx].charCodeAt() -65;
            if(!visited[nextAlphabet]){
               visited[nextAlphabet] = true;
               dfs(ny,nx,cnt+1);
               visited[nextAlphabet] = false;
            } 
        }
        if(cnt > max) max = cnt;
        return;
    }
    dfs(0,0,1);
    return console.log(max);
}
solution(map);
