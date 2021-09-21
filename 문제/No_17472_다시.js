// const input = [
// '7 8',
// '0 0 0 0 0 0 1 1',
// '1 1 0 0 0 0 1 1',
// '1 1 0 0 0 0 0 0',
// '1 1 0 0 0 1 1 0',
// '0 0 0 0 0 1 1 0',
// '0 0 0 0 0 0 0 0',
// '1 1 1 1 1 1 1 1'
// ]
// const input = [
// '7 8',
// '0 0 0 1 1 0 0 0',
// '0 0 0 1 1 0 0 0',
// '1 1 0 0 0 0 1 1',
// '1 1 0 0 0 0 1 1',
// '1 1 0 0 0 0 0 0',
// '0 0 0 0 0 0 0 0',
// '1 1 1 1 1 1 1 1'
// ]
// const input = [
// '7 8',
// '1 0 0 1 1 1 0 0',
// '0 0 1 0 0 0 1 1',
// '0 0 1 0 0 0 1 1',
// '0 0 1 1 1 0 0 0',
// '0 0 0 0 0 0 0 0',
// '0 1 1 1 0 0 0 0',
// '1 1 1 1 1 1 0 0',
// ]
const input = [
'7 7',
'1 1 1 0 1 1 1',
'1 1 1 0 1 1 1',
'1 1 1 0 1 1 1',
'0 0 0 0 0 0 0',
'1 1 1 0 1 1 1',
'1 1 1 0 1 1 1',
'1 1 1 0 1 1 1'
]
// const input =[
// '8 8',
// '0 0 0 1 1 1 1 0',
// '0 1 1 1 1 0 1 0',
// '0 1 0 1 1 1 0 0',
// '0 1 0 0 0 1 0 0',
// '0 0 0 1 0 0 1 0',
// '0 0 0 0 0 1 0 0',
// '0 1 1 1 0 0 0 0',
// '0 1 0 0 0 1 0 0'
// ]
// const input =[
// '6 10',
// '1 1 1 1 1 1 1 1 1 1',
// '1 0 0 0 0 0 1 0 0 0',
// '1 0 1 0 1 0 1 0 0 1',
// '1 0 1 1 1 0 1 0 0 1',
// '0 0 0 0 0 0 0 0 0 1',
// '1 1 0 1 1 1 1 1 0 1',
// ]//ans 12;
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
solution(map);
function solution(map){
    const isValidPos = (y,x)=>(y>=0 && x>=0 && y<N && x<M);
    const distance = [[1,0],[-1,0],[0,1],[0,-1]];
    let sum = 0;
    let path = [];
    let parent ;
    
    const numbering = () =>{
        let cnt = 1;
        for(let i=0; i<N; i++){
            for(let j=0; j<M; j++){
                if(map[i][j] === 1){
                    cnt++;
                    map[i][j] = cnt;
                    let queue = [[i,j]];
                    while(queue.length){
                        const [cy,cx] = queue.shift();
                        distance.forEach(([my,mx])=>{
                            const [ny,nx] = [cy+my,cx+mx];
                            if(!isValidPos(ny,nx) || map[ny][nx] !==1) return;
                            queue.push([ny,nx]);
                            map[ny][nx] = cnt;
                        })
                    }
                }
            }
        }
        parent = Array(cnt).fill(0).map((num,index) => num = index);
    }
    const getPath = (y,x) =>{
        distance.forEach(([my,mx])=>{
            let [ny,nx] = [y+my,x+mx];
            let weight = 0;
            while(isValidPos(ny,nx)){

               if(map[ny][nx]){
                   if(map[y][x] !== map[ny][nx] && weight >=2){
                       path.push({from:map[y][x]-1,to:map[ny][nx]-1,weight});
                   }
                   break;
               }
               else{
                   weight++;
                   ny+=my;
                   nx+=mx;
               }
        }
      }) 
    }
    const getParent = (parent,i) =>{
        if(parent[i] === i) return i;
        return parent[i] = getParent(parent,parent[i]);

    }
    const unionParent = (parent,a,b) =>{
        a = getParent(parent,a);
        b = getParent(parent,b);
        if(a<b) parent[b] = a;
        else parent[a] = b;
    }
    const findParent = (parent,a,b) =>{
        a = getParent(parent,a);
        b = getParent(parent,b);
        return a===b ? true : false;
    }
    numbering();
    for(let i=0; i<N; i++){
        for(let j=0; j<M; j++){
            if(map[i][j]) getPath(i,j);
        }
    }
   
    path.sort((a,b)=>a.weight - b.weight);
    
    
    for(let i=0; i<path.length; i++){
        const {from,to,weight} = path[i];
        if(!findParent(parent,from,to)){
            sum+=weight;
            unionParent(parent,from,to);
        }

    }
    let flag = true;
    for(let i=1; i<parent.length-1; i++){
        if(!findParent(parent,parent[i],parent[i+1]))
        flag = false;
    }
        
    return flag ? console.log(sum) : console.log(-1);
}