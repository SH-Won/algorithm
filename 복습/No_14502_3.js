const input =[
    '7 7',
'2 0 0 0 1 1 0',
'0 0 1 0 1 2 0',
'0 1 1 0 1 0 0',
'0 1 0 0 0 0 0',
'0 0 0 0 0 1 1',
'0 1 0 0 0 0 0',
'0 1 0 0 0 0 0'
]
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
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const checkSafetyNumber = (lab)=>{
    return lab.flat().reduce((acc,cur) => acc+= (cur===0 ? 1 :0) ,0);
}
const spreadVirus = (virus,lab) =>{
    const [N,M] = [lab.length , lab[0].length];
    const [dy,dx] = [[-1,1,0,0],[0,0,-1,1]];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
    let queue = [...virus];
    while(queue.length){
        const [y,x] = queue.shift();
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || lab[ny][nx] !==0) continue;
            queue.push([ny,nx]);
            lab[ny][nx] = 1;
        }
    }
    return checkSafetyNumber(lab);
}
const getMaxSafety = (lab,N,M) =>{
    const virus = [];
    let max = 0;
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            if(lab[y][x] === 2) virus.push([y,x]);
        }
    }
    const makeWall = (count,index) =>{
        if(count === 3){
            const copyLab = lab.map(row => [...row]);
            const safety = spreadVirus(virus,copyLab);
            max = Math.max(max,safety);
            return 
        }
        for(let i=index; i<N*M; i++){
            const [y,x] = [i/M >>0, i % M];
            if(lab[y][x] !==0) continue;
            lab[y][x] = 1;
            makeWall(count+1,i+1);
            lab[y][x] = 0;
        }
    }
    makeWall(0,0);
    return max;
}
const solution = (input) =>{
    const [N,M] = input[0].split(' ').map(Number);
    const lab = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    const answer = getMaxSafety(lab,N,M);
    console.log(answer);
}
solution(input);