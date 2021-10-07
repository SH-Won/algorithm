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

const solution = () =>{
    const [N,M]= input[0].split(' ').map(Number);
    let map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    const dy = [1,-1,0,0];
    const dx = [0,0,1,-1];
    const isValidPos = (y,x) =>(y>=0 && x>=0 && y<N && x<M);
    let parent ;
    const numbering = () =>{
        let visited = Array.from({length:N},()=>Array(M).fill(false));
        let number = 1;
        const giveNumber = (y,x,number) =>{
            map[y][x] = number;
            visited[y][x] = true;
            let queue = [[y,x]];
            while(queue.length){
                const [cy,cx] = queue.shift();
                for(let i=0; i<4; i++){
                    const [ny,nx] = [cy+dy[i],cx+dx[i]];
                    if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] !== 1) continue;
                    visited[ny][nx] = true;
                    map[ny][nx] = number;
                    queue.push([ny,nx]);
                }
            }
        }
        for(let y=0; y<N; y++){
            for(let x=0; x<M; x++){
                if(map[y][x] ===1 && !visited[y][x]){
                    number++;
                    giveNumber(y,x,number);
                }
           }
         }
         parent = Array(number-1).fill(0).map((num,index) => num = index);
     }
     const getPath = () =>{
        let path =[];
        for(let y=0; y<N; y++){
            for(let x=0; x<M; x++){
                if(map[y][x]){
                    const island = map[y][x];
                    for(let i=0; i<4; i++){
                        let length =0;
                        let [ny,nx] = [y+dy[i],x+dx[i]];
                        while(isValidPos(ny,nx)){
                            if(map[ny][nx]){
                                if(map[ny][nx] !==island && length>=2){
                                   path.push({from:island-2,to:map[ny][nx]-2,length});
                                }
                                break;
                            }
                            ny+=dy[i];
                            nx+=dx[i];
                            length++;
                        }
                    }
                }
            }
        }
        return path;
     }
     const getParent = (parent,i) => {
         if(parent[i] === i) return i;
         return parent[i] = getParent(parent,parent[i]);
     }
     const unionParent = (parent,a,b) =>{
         a = getParent(parent,a);
         b = getParent(parent,b);
         a < b ? parent[b] = a : parent[a] = b
     }
     const findParent = (parent,a,b) =>{
         a = getParent(parent,a);
         b = getParent(parent,b);
         return a === b ? true : false;
     }
     
     numbering();
     let path = getPath();
     let min = 0;
     let flag = false;
     path.sort((a,b)=>a.length - b.length);
     
     for(let i=0; i<path.length; i++){
         const {from,to,length} = path[i];
         if(!findParent(parent,from,to)){
             min+=length;
             unionParent(parent,from,to);
         }
     }
     for(let i=0; i<parent.length-1; i++){
         if(!findParent(parent,parent[i],parent[i+1])){
             flag = true;
             break;
         }
     }
     return flag ? console.log(-1) : console.log(min); 
}
solution();