//const input = ['7 3','2 0 0 0 1 1 0','0 0 1 0 1 2 0','0 1 1 0 1 0 0','0 1 0 0 0 0 0','0 0 0 2 0 1 1','0 1 0 0 0 0 0','2 1 0 0 0 0 2'];
// const input =[
//     '7 3',
// '2 0 2 0 1 1 0',
// '0 0 1 0 1 2 0',
// '0 1 1 2 1 0 0',
// '2 1 0 0 0 0 2',
// '0 0 0 2 0 1 1',
// '0 1 0 0 0 0 0',
// '2 1 0 0 2 0 2',
// ]
// const input =[
//     '7 4',
// '2 0 2 0 1 1 0',
// '0 0 1 0 1 2 0',
// '0 1 1 2 1 0 0',
// '2 1 0 0 0 0 2',
// '0 0 0 2 0 1 1',
// '0 1 0 0 0 0 0',
// '2 1 0 0 2 0 2',
// ]
// const input = [
//     '7 5',
// '2 0 2 0 1 1 0',
// '0 0 1 0 1 2 0',
// '0 1 1 2 1 0 0',
// '2 1 0 0 0 0 2',
// '0 0 0 2 0 1 1',
// '0 1 0 0 0 0 0',
// '2 1 0 0 2 0 2',
// ]
// const input =[
//     '7 3',
// '2 0 2 0 1 1 0',
// '0 0 1 0 1 0 0',
// '0 1 1 1 1 0 0',
// '2 1 0 0 0 0 2',
// '1 0 0 0 0 1 1',
// '0 1 0 0 0 0 0',
// '2 1 0 0 2 0 2',
// ]
// const input =[
//     '7 2',
// '2 0 2 0 1 1 0',
// '0 0 1 0 1 0 0',
// '0 1 1 1 1 0 0',
// '2 1 0 0 0 0 2',
// '1 0 0 0 0 1 1',
// '0 1 0 0 0 0 0',
// '2 1 0 0 2 0 2',
// ]
// const input = [
//     '5 1',
// '2 2 2 1 1',
// '2 1 1 1 1',
// '2 1 1 1 1',
// '2 1 1 1 1',
// '2 2 2 1 1',
// ]
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(num => +num);
const lab = Array.from({length:N},(_,i)=>input[i+1].split(' '));

solution(lab);
function solution(lab){
    let visited = Array.from({length:N},()=>Array(N).fill(false));
    const isValidPos =(y,x) => (y>=0 && x>=0 && y<N && x<N);
    const distance = [[1,0],[-1,0],[0,1],[0,-1]];
    let minTime = [];
    // 바이러스 시작
    let vPos = [];
    for(let i=0; i<N; i++){
        for(let j=0; j<N; j++){
            if(lab[i][j] === '2'){
                const time = 0;
                 vPos.push([i,j,time]);
            }
        }
    }
   
    const isEmpty = () =>{
        
        for(let i=0; i<N; i++){
            for(let j=0; j<N; j++){
                if(lab[i][j] === '1') continue;
                if(!visited[i][j]) return true;
            }
        }
        return false;
    }
    const bfs = (start) =>{
        for(let i=0; i<start.length; i++){
            const [y,x] =start[i];
            visited[y][x]  =true;
        }
        let maxTime = 0;
        let queue = [...start];
       
        while(queue.length){
            const [cy,cx,time] = queue.shift();
            if(time >maxTime) maxTime = time;
            
            for(let i=0; i<distance.length; i++){
                const [ny,nx] = [cy+distance[i][0],cx+distance[i][1]];
                if(!isValidPos(ny,nx) || lab[ny][nx] ==='1' || visited[ny][nx]) continue;
                visited[ny][nx] =true
                queue.push([ny,nx,time+1]);
            }
        }
        if(isEmpty()) return -1;
        return maxTime;
    }
    const dfs = (idx,count,startVirus) =>{
        if(count === M){
            const time = bfs(startVirus);
          
            visited = visited.map((array=> array.fill(false)));
            return time !==-1 ? minTime.push(time) : minTime;
        } 
        for(let i=idx; i<vPos.length; i++){
            let temp =[...startVirus];
            temp.push(vPos[i]);
            dfs(i+1,count+1,temp);
        }
    }
    dfs(0,0,[]);

    return console.log(minTime.length ===0 ? -1 : Math.min(...minTime))
}