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
// const input = [
//     '7 7',
//     '1 1 1 0 1 1 1',
//     '1 1 1 0 1 1 1',
//     '1 1 1 0 1 1 1',
//     '0 0 0 0 0 0 0',
//     '1 1 1 0 1 1 1',
//     '1 1 1 0 1 1 1',
//     '1 1 1 0 1 1 1'
//     ]
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
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));

const solution = (map) =>{
    let visited = Array.from({length:N},()=>Array(M).fill(false));
    let parent ;
    const distance = [[1,0],[-1,0],[0,1],[0,-1]];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
    const numbering = () =>{
        let count = 1;
        const bfs = (y,x,count) =>{
            visited[y][x] = true;
            map[y][x] = count;
            let queue=[[y,x]];
            while(queue.length){
                const [cy,cx] = queue.shift();
                distance.forEach(([my,mx])=>{
                    const [ny,nx] = [cy+my,cx+mx];
                    if(!isValidPos(ny,nx) || visited[ny][nx] ||map[ny][nx] !== 1) return;
                    visited[ny][nx] = true;
                    map[ny][nx] = count;
                    queue.push([ny,nx]);
                })
            }
        }
        for(let i=0; i<N; i++){
            for(let j=0; j<M; j++){
                if(map[i][j] === 1){
                    count++;
                    bfs(i,j,count);
                }
            }
        }
        parent = Array(count-1).fill(0).map((num,index)=> num=index);
    }
    let path = [];
    const buildBridge = () =>{
        for(let y=0; y<N; y++){
            for(let x=0; x<M; x++){
                if(map[y][x]){
                    distance.forEach(([my,mx])=>{
                       let [ny,nx] = [y+my,x+mx];
                       let weight = 0;
                       while(isValidPos(ny,nx)){
                           if(map[ny][nx]){
                               if(map[ny][nx] !== map[y][x] && weight >=2){
                                   path.push({from:map[y][x]-2,to:map[ny][nx]-2,weight});
                               }
                               break;
                           }else{
                               ny+=my;
                               nx+=mx;
                               weight++;
                           }
                       }
                    })

                }
            }
        }

    }
    const getParent = (parent,i) =>{
        if(parent[i] === i) return i;
        return parent[i] = getParent(parent,parent[i]);
    }
    const unionParent =(parent,a,b)=>{
        a = getParent(parent,a);
        b = getParent(parent,b);
        return a < b ? parent[b]=a : parent[a]=b;
    }
    const findParent= (parent,a,b) =>{
        a = getParent(parent,a);
        b = getParent(parent,b);
        return a===b ? true : false
    }
    numbering();
    buildBridge();
    path.sort((a,b)=>a.weight - b.weight);
    let sum = 0;
    // let flag = false;
    for(let i=0; i<path.length; i++){
        const {from,to,weight} = path[i];
        if(!findParent(parent,from,to)){
           sum+=weight;
           unionParent(parent,from,to);
        }
    }
    for(let i=0; i<parent.length-1; i++){
        if(!findParent(parent,parent[i],parent[i+1])){
            return console.log(-1);
        }
    }
    // console.log(path);
    // console.log(map.map(array => array.join(' ')).join('\n'));
    return console.log(sum);
}
solution(map);