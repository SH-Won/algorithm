const input = ['7 3','2 0 0 0 1 1 0','0 0 1 0 1 2 0','0 1 1 0 1 0 0','0 1 0 0 0 0 0','0 0 0 2 0 1 1','0 1 0 0 0 0 0','2 1 0 0 0 0 2']
// const input =['7 3','2 0 2 0 1 1 0','0 0 1 0 1 2 0','0 1 1 2 1 0 0','2 1 0 0 0 0 2','0 0 0 2 0 1 1','0 1 0 0 0 0 0','2 1 0 0 2 0 2']
// const input =['7 4','2 0 2 0 1 1 0','0 0 1 0 1 2 0','0 1 1 2 1 0 0','2 1 0 0 0 0 2','0 0 0 2 0 1 1','0 1 0 0 0 0 0','2 1 0 0 2 0 2']
// const input =['7 5','2 0 2 0 1 1 0','0 0 1 0 1 2 0','0 1 1 2 1 0 0','2 1 0 0 0 0 2','0 0 0 2 0 1 1','0 1 0 0 0 0 0','2 1 0 0 2 0 2']
// const input =['7 3','2 0 2 0 1 1 0','0 0 1 0 1 0 0','0 1 1 1 1 0 0','2 1 0 0 0 0 2','1 0 0 0 0 1 1','0 1 0 0 0 0 0','2 1 0 0 2 0 2']
// const input =['7 2','2 0 2 0 1 1 0','0 0 1 0 1 0 0','0 1 1 1 1 0 0','2 1 0 0 0 0 2','1 0 0 0 0 1 1','0 1 0 0 0 0 0','2 1 0 0 2 0 2']
// const input =['5 1','2 2 2 1 1','2 1 1 1 1','2 1 1 1 1','2 1 1 1 1','2 2 2 1 1']


//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const isEmptySpace = (lab) =>{
    for(let y=0; y<lab.length; y++){
        for(let x=0; x<lab.length; x++){
            if(lab[y][x] === 0) return true;
        }
    }
    return false;
}
const spreadVirus = (start,lab) =>{
    const n = lab.length;
    const isValidPos = (y,x) =>(y>=0 && x>=0 && y<n && x<n);
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    let queue = [];
    start.forEach(([y,x]) => (lab[y][x] = 1, queue.push([y,x,0])));
    let spreadTime = 0;
    while(queue.length){
        const [y,x,time] = queue.shift();
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || lab[ny][nx] === 1) continue;
            if(lab[ny][nx] === 0){
                spreadTime = Math.max(spreadTime , time+1);
            }
            queue.push([ny,nx,time+1]);
            lab[ny][nx] = 1;
        }
    }
    if(isEmptySpace(lab)) return -1;
    return spreadTime;
}
const getMinTime = (M,lab,virus) =>{
    let startVirus = Array(M);
    let minTime = [];
    const combination = (count,index) =>{
        if(count === M){
            const copyLab = lab.map(row => [...row]);
            const time = spreadVirus(startVirus,copyLab);
            if(time !==-1) minTime.push(time);
            return;
        }
        for(let i=index; i<virus.length; i++){
           startVirus[count] = virus[i];
           combination(count+1,i+1);
        }
    }
    combination(0,0);
    return !minTime.length ? -1 : Math.min(...minTime); 
}
const solution = (input) =>{
    const [N,M] = input[0].split(' ').map(Number);
    const lab = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    let virus = [];
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(lab[y][x] === 2) virus.push([y,x]); 
        }
    }
    const answer = getMinTime(M,lab,virus);
    console.log(answer);
}
solution(input);