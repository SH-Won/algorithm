//const input = ['7 3','2 0 0 0 1 1 0','0 0 1 0 1 2 0','0 1 1 0 1 0 0','0 1 0 0 0 0 0','0 0 0 2 0 1 1','0 1 0 0 0 0 0','2 1 0 0 0 0 2']
//const input = ['7 2','2 0 2 0 1 1 0','0 0 1 0 1 0 0','0 1 1 1 1 0 0','2 1 0 0 0 0 2','1 0 0 0 0 1 1','0 1 0 0 0 0 0','2 1 0 0 2 0 2']
//  const input =[
//     '7 3',
// '2 0 2 0 1 1 0',
// '0 0 1 0 1 2 0',
// '0 1 1 2 1 0 0',
// '2 1 0 0 0 0 2',
// '0 0 0 2 0 1 1',
// '0 1 0 0 0 0 0',
// '2 1 0 0 2 0 2'
// ]
// const input =[
//     '7 3',
// '2 0 2 0 1 1 0',
// '0 0 1 0 1 0 0',
// '0 1 1 1 1 0 0',
// '2 1 0 0 0 0 2',
// '1 0 0 0 0 1 1',
// '0 1 0 0 0 0 0',
// '2 1 0 0 2 0 2'
// ]
// const input =[
//     '5 1',
// '2 2 2 1 1',
// '2 1 1 1 1',
// '2 1 1 1 1',
// '2 1 1 1 1',
// '2 2 2 1 1'
// ]
// const input =[
//     '7 5',
// '2 0 2 0 1 1 0',
// '0 0 1 0 1 2 0',
// '0 1 1 2 1 0 0',
// '2 1 0 0 0 0 2',
// '0 0 0 2 0 1 1',
// '0 1 0 0 0 0 0',
// '2 1 0 0 2 0 2'
// ]
// const input =[
//     '4 4',
// '1 1 1 1',
// '1 2 2 1',
// '1 2 2 1',
// '1 1 1 1'
// ]
//const input =['5 1','1 1 1 1 1','1 1 1 1 1','1 1 1 1 1','0 2 0 2 0','1 1 1 1 1']
const fs =require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(num =>+num);
const lab = Array.from({length:N},(_,i)=>input[i+1].split(' '));
let count = Array.from({length:N},()=>Array(N).fill(0));
let minTime =[];
let vPos = [];
for(let i=0; i<N; i++){
    for(let j=0; j<N; j++){
        if(lab[i][j] === '2') vPos.push([i,j]);
    }
}
const isValidPos = (y,x)=>(y>=0 && x>=0 && y<N && x<N);

const isEmpty = (lab) =>{
    for(let i=0; i<N; i++){
        const index = lab[i].indexOf("0");
        if(index !== -1) return true;
    }
    return false;
}
const getMinTime = (count) =>{
    let maxTime = 0;
    for(let i=0; i<N; i++){
        for(let j=0; j<N; j++){
            if(lab[i][j] ==='0'){
                maxTime = Math.max(maxTime,count[i][j]);
            }
        }
    }
   return maxTime;
}
const bfs = (start,lab) =>{
    let queue=[...start];
    for(let i=0; i<start.length; i++){
        const [y,x] = start[i];
        lab[y][x] ='1';
    }

    while(queue.length){
        const [cy,cx]  = queue.shift();
        [[1,0],[-1,0],[0,1],[0,-1]]
        .forEach(([my,mx])=>{
            const [ny,nx] = [cy+my,cx+mx];
            if(!isValidPos(ny,nx) || count[ny][nx] || lab[ny][nx] ==='1') return;
            
            lab[ny][nx] ='1'
            count[ny][nx] = count[cy][cx] + 1;
            queue.push([ny,nx]);
        })
    }
    if(isEmpty(lab)) return -1
    
    return getMinTime(count);
}

const dfs = (cnt,idx,selectedV) =>{
    if(cnt ===M){
        const copyLab = Array.from({length:N},(_,i)=>[...lab[i]]);
        const time = bfs(selectedV,copyLab);
        //if(time === -1) process.exit(console.log(-1));
        count = count.map(array => array.fill(0));

        return time !== -1 ? minTime.push(time) : minTime;
    }

    for(let i=idx; i<vPos.length; i++){
       
          let temp = [...selectedV];
          temp.push(vPos[i]);
          dfs(cnt+1,i+1,temp);
    }
}
dfs(0,0,[]);
console.log(minTime.length === 0 ? -1 : Math.min(...minTime));
