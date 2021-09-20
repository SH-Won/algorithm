//const input =['3 4 1','....','###.','....','1 1 3 1'];
//const input =['2 2 1','.#','#.','1 1 2 2']
//const input =['4 4 2','....','....','....','....','1 1 4 1']

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let inputIndex = 0;
const [N,M,K] = input[inputIndex++].split(' ').map(num => +num);
const gym = Array.from({length:N},()=>input[inputIndex++].split(''));
const [y1,x1,y2,x2] =input[inputIndex].split(' ').map(num => +num -1);

let visited = Array.from({length:N},()=>Array(M).fill(Infinity));

const bfs = (y,x) =>{
    const isValidPos = (y,x) =>(y>=0 && x>=0 && y<N && x<M);
    const distance = [[1,0],[-1,0],[0,1],[0,-1]];
    let startIndex = 0;
    let endIndex;
    let queue =[[y,x]];
    visited[y][x] = 0;
    while(startIndex!==queue.length){
        endIndex = queue.length;
        for(let i=startIndex; i<endIndex; i++){
            const [cy,cx] = queue[i];
            if(cy ===y2 && cx ===x2){
                return console.log(visited[y2][x2]);
            }

            distance.forEach(([my,mx])=>{
                let depth = K;
                let [ny,nx] = [cy+my,cx+mx];
                while(depth-- && isValidPos(ny,nx) && gym[ny][nx] !=='#'
                      && visited[ny][nx] > visited[cy][cx]){
                          if(visited[ny][nx] === Infinity){
                              visited[ny][nx] = visited[cy][cx] +1;
                              queue.push([ny,nx]);
                          }
                          ny+=my;
                          nx+=mx;
                      }
            })

        }

        startIndex = endIndex;
    }
    return console.log(-1);
}
bfs(y1,x1);
