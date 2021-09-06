// const input =[
//     '7 7',
// '2 0 0 0 1 1 0',
// '0 0 1 0 1 2 0',
// '0 1 1 0 1 0 0',
// '0 1 0 0 0 0 0',
// '0 0 0 0 0 1 1',
// '0 1 0 0 0 0 0',
// '0 1 0 0 0 0 0'
// ]
// const input =[
//     '4 6',
// '0 0 0 0 0 0',
// '1 0 0 0 0 2',
// '1 1 1 0 0 2',
// '0 0 0 0 0 2',

// ]
// const input =[
//     '8 8',
// '2 0 0 0 0 0 0 2',
// '2 0 0 0 0 0 0 2',
// '2 0 0 0 0 0 0 2',
// '2 0 0 0 0 0 0 2',
// '2 0 0 0 0 0 0 2',
// '0 0 0 0 0 0 0 0',
// '0 0 0 0 0 0 0 0',
// '0 0 0 0 0 0 0 0',
// ]
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(num =>+num);
const lab = Array.from({length:N},(_,i) => input[i+1].split(' '));

const solution = (lab) =>{
    
    let vPos = [];
    let answer = 0;
    for(let i=0; i<N; i++){
        for(let j=0; j<M; j++){
            if(lab[i][j] ==='2')
            vPos.push([i,j]);
        }
    }
  
    const getSafeNumber = (lab) =>{
        let count = 0;
        for(let i=0; i<N; i++){
            for(let j=0; j<M; j++){
                if(lab[i][j] ==='0') count++;
            }
        }
        return count;
    }
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
    const bfs = (vPos,lab) =>{
        let queue = [...vPos];
        while(queue.length){
            const [cy,cx] = queue.shift();
            [[1,0],[-1,0],[0,1],[0,-1]]
            .forEach(([my,mx])=>{
                const [ny,nx] = [cy+my,cx+mx];
                if(!isValidPos(ny,nx) || lab[ny][nx] !=='0') return;
                queue.push([ny,nx]);
                lab[ny][nx] ='2' 
            })
        }
        return lab;
    }
    const dfs = (count,index) =>{
        if(count === 0){
           const copyLab = Array.from({length:N},(_,i) => [...lab[i]]);
           const newLab = bfs(vPos,copyLab);
           const sNumber = getSafeNumber(newLab);
           answer = Math.max(answer,sNumber);
           return;
        }
        for(let i=index; i<N*M; i++){
            const [y,x] = [Math.floor(i/M),i % M];
            if(lab[y][x] ==='0'){
                lab[y][x] = '1';
                dfs(count-1,i+1);
                lab[y][x] = '0';
            }
        }

    }
    dfs(3,0);

    return answer;

}
const answer = solution(lab);
console.log(answer);