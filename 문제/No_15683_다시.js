// const input =[
//     '4 6',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '0 0 1 0 6 0',
// '0 0 0 0 0 0'
// ]
// const input = [
//     '6 6',
// '0 0 0 0 0 0',
// '0 2 0 0 0 0',
// '0 0 0 0 6 0',
// '0 6 0 0 2 0',
// '0 0 0 0 0 0',
// '0 0 0 0 0 5',
// ]
// const input = [
//     '6 6',
// '1 0 0 0 0 0',
// '0 1 0 0 0 0',
// '0 0 1 0 0 0',
// '0 0 0 1 0 0',
// '0 0 0 0 1 0',
// '0 0 0 0 0 1',
// ]
// const input = [
//     '6 6',
// '1 0 0 0 0 0',
// '0 1 0 0 0 0',
// '0 0 1 5 0 0',
// '0 0 5 1 0 0',
// '0 0 0 0 1 0',
// '0 0 0 0 0 1'
// ]
// const input = ['1 7','0 1 2 3 4 5 6'];
// const input = ['3 7','4 0 0 0 0 0 0 0','0 0 0 2 0 0 0','0 0 0 0 0 0 4'];
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(num =>+num);
const office = Array.from({length:N},(_,i) =>input[i+1].split(' ').map(num =>+num));
//const [left,right,up,down,row,column,all] = [0,1,2,3,4,5,6,7];
const direction = [
    [],
    [[[1,0]],[[-1,0]],[[0,1]],[[0,-1]]],
    [[[1,0],[-1,0]],[[0,1],[0,-1]]],
    [[[-1,0],[0,1]],[[0,1],[1,0]],[[1,0],[0,-1]],[[0,-1],[-1,0]]],
    [[[-1,0],[0,1],[1,0]],[[0,1],[1,0],[0,-1]],[[1,0],[0,-1],[-1,0]],[[0,-1],[-1,0],[0,1]]],
    [[[1,0],[-1,0],[0,1],[0,-1]]]]
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
solution(office);
function solution(office){
    let cctvPos = [];
    let maxWatcing = 0;
    let wall =0;
    for(let i=0; i<N; i++){
        for(let j=0; j<M; j++){
            if(office[i][j] !== 0 && office[i][j] !==6){
                 cctvPos.push([i,j]);
            }
            if(office[i][j] === 6) wall++;
        }
    }
   
    const watch =(y,x,dir,office) =>{
        let count = 0;
        
        for(let i=0; i<dir.length; i++){
            const [dy,dx] = dir[i];
            let [ny,nx]  = [y+dy,x+dx];
            while(isValidPos(ny,nx) && office[ny][nx] !==6){
                if(office[ny][nx] ==='#' || office[ny][nx] !==0){ 
                    ny+=dy;
                    nx+=dx;
                    continue;
                }
                office[ny][nx] ='#';
                
                count++;
                ny+=dy;
                nx+=dx;
                
            }
        }
      
        
        return count;
    }
    const dfs = (count,dir) =>{
        if(dir.length === cctvPos.length){
            // 왜 const 배열이 let처럼 바뀔까..
            const copyOffice = Array.from({length:N},(_,i) => [...office[i]]);
            let watchingPlace = 0;
            for(let i=0; i<cctvPos.length; i++){
                const [y,x] =cctvPos[i];
                watchingPlace += watch(y,x,dir[i],copyOffice);
            }
            maxWatcing = Math.max(watchingPlace,maxWatcing);
            return;
        }
        
            const [y,x] = cctvPos[count];
            const cctv = office[y][x];
            for(let i=0; i<direction[cctv].length; i++){
                let temp = [...dir];
                
                temp.push(direction[cctv][i]);
                dfs(count+1,temp);
            }
            
        
    }
    dfs(0,[]);
    return console.log(N*M - maxWatcing -wall -cctvPos.length);
}