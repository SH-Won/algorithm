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
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const lab = Array.from({length:N},(_,i)=>input[i+1].split(' '));
solution(lab);
function solution(lab){
    let maxSafety = 0;
    let vPos = [];
    // const visited = Array.from({length:N},()=>Array(M).fill(false));
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
    const distance =[[1,0],[-1,0],[0,1],[0,-1]];
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            if(lab[y][x] === '2') vPos.push([y,x]);
        }
    }

    const checkSafety = (lab) =>{
        let count = 0;
        for(let y=0; y<N; y++){
            for(let x=0; x<M; x++){
                if(lab[y][x] === '0') count++;
            }
        }
        return count;
    }
    const spreadVirus = (start,lab) =>{
        
        let queue=[...start];
        
        while(queue.length){
            const [cy,cx] =queue.shift();
            
            distance.forEach(([my,mx])=>{
                const [ny,nx] = [cy+my,cx+mx];
                if(!isValidPos(ny,nx) || lab[ny][nx] !=='0') return;
                lab[ny][nx] = '2';
                queue.push([ny,nx]);
            })
        }
        return lab;
    }

    const makeWall = (index,count) =>{
        if(count === 3){
         
            const copyLab = Array.from({length:N},(_,i)=>[...lab[i]]);
            const spreadLab= spreadVirus(vPos,copyLab);
            const safety = checkSafety(spreadLab);
            maxSafety = Math.max(safety,maxSafety);
            return;
        }

       for(let i=index; i<N*M; i++){
           const [y,x] = [Math.floor(i / M), i % M];
           if(lab[y][x] === '0'){
               lab[y][x] ='1';
               makeWall(i+1,count+1);
               lab[y][x] ='0'
           }
       }
    }
    makeWall(0,0);
    return console.log(maxSafety);
}