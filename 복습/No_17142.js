//const input = ['7 3','2 0 0 0 1 1 0','0 0 1 0 1 2 0','0 1 1 0 1 0 0','0 1 0 0 0 0 0','0 0 0 2 0 1 1','0 1 0 0 0 0 0','2 1 0 0 0 0 2']
//const input =['7 5','2 0 2 0 1 1 0','0 0 1 0 1 2 0','0 1 1 2 1 0 0','2 1 0 0 0 0 2','0 0 0 2 0 1 1','0 1 0 0 0 0 0','2 1 0 0 2 0 2']

//const input =['7 3','2 0 2 0 1 1 0','0 0 1 0 1 0 0','0 1 1 1 1 0 0','2 1 0 0 0 0 2','1 0 0 0 0 1 1','0 1 0 0 0 0 0','2 1 0 0 2 0 2']
//const input =['7 2','2 0 2 0 1 1 0','0 0 1 0 1 0 0','0 1 1 1 1 0 0','2 1 0 0 0 0 2','1 0 0 0 0 1 1','0 1 0 0 0 0 0','2 1 0 0 2 0 2']

//const input =['5 1','2 2 2 1 1','2 1 1 1 1','2 1 1 1 1','2 1 1 1 1','2 2 2 1 1']
// const input =['7 5','2 0 2 0 1 1 0','0 0 1 0 1 2 0','0 1 1 2 1 0 0','2 1 0 0 0 0 2','0 0 0 2 0 1 1','0 1 0 0 0 0 0','2 1 0 0 2 0 2']
//const input =['4 3','1 1 1 1','1 2 2 1','1 2 2 1','1 1 1 1']
//const input =['5 1','1 1 1 1 1','1 1 1 1 1','1 1 1 1 1','0 2 0 2 0','1 1 1 1 1']

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N,M] = input[0].split(' ').map(num => +num);
const lab = Array.from({length:N},(_,i) => input[i+1].split(' '));

solution(lab);
function solution(lab){
    let visited = Array.from({length:N},()=>Array(N).fill(false));
    const isValidPos = (y,x) =>(y>=0 && x>=0 && y<N && x<N);
    const dy = [1,-1,0,0];
    const dx = [0,0,1,-1];
    let minTime = [];
    let vPos = [];
    //바이러스 위치
    for(let i=0; i<N; i++){
        for(let j=0; j<N; j++){
            if(lab[i][j] === '2'){
                const time = 0;
                vPos.push([i,j,time]);
            }
        }
    }
    const isEmpty = () =>{
        for(let y=0; y<N; y++){
            for(let x=0; x<N; x++){
                if(lab[y][x] ==='1' || lab[y][x] ==='2') continue;
                if(!visited[y][x]) return true;
            }
        }
        return false;
    }
    const bfs = (startVirus) =>{
        for(let i=0; i<M; i++){
            const [y,x] = startVirus[i];
            visited[y][x] = true;
        }
        let queue =[...startVirus];
        let maxTime =0;
        while(queue.length){
            const [cy,cx,time] =queue.shift();
            if(time > maxTime && lab[cy][cx] !=='2') maxTime = time;
            for(let i=0; i<4; i++){
                const [ny,nx] = [cy+dy[i],cx+dx[i]];
                if(!isValidPos(ny,nx) || visited[ny][nx] || lab[ny][nx] === '1') continue;
                visited[ny][nx] = true;
                queue.push([ny,nx,time+1]);
            }
        }
        if(isEmpty()) return -1;
        return maxTime;

    }
    const dfs = (idx,count,startVirus) =>{
        if(count ===M){
            const time = bfs(startVirus);
            visited = visited.map(array => array.fill(false));
            return time !==-1 && minTime.push(time) 
        }
        for(let i=idx; i<vPos.length; i++){
            let temp = [...startVirus];
            temp.push(vPos[i]);
            dfs(i+1,count+1,temp);
        }
    }
    dfs(0,0,[])
    return minTime.length === 0 ? console.log(-1) : console.log(Math.min(...minTime))
}