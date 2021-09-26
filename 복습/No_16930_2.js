//const input =['3 4 4','....','###.','....','1 1 3 1'];
//const input =['2 2 1','.#','#.','1 1 2 2']
const input =['4 4 2','....','....','....','....','1 1 4 1']

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = () =>{
    const [N,M,K] = input[0].split(' ').map(Number);
    const gym = Array.from({length:N},(_,i)=>input[i+1].split(''));
    const [x1,y1,x2,y2] = input[N+1].split(' ').map(num => +num - 1);
    let visited = Array.from({length:N},()=>Array(M).fill(Infinity));
    const isValidPos =(x,y) => (x>=0 && y>=0 && x<N && y<M);
    const dx=[1,-1,0,0];
    const dy=[0,0,1,-1];

    const move = (x1,y1) =>{
        visited[x1][y1] = 0;
        let queue = [[x1,y1,0]];
        let startIndex = 0;
        let endIndex;
        while(startIndex !== queue.length){
            endIndex = queue.length;
            for(let i=startIndex; i<endIndex; i++){
            const [cx,cy,time] = queue[i];
            if(cx === x2 && cy === y2){
               return console.log(time);
            }
            for(let i=0; i<4; i++){
                let depth = K;
                let [nx,ny] = [cx+dx[i],cy+dy[i]];
                while(depth-- && isValidPos(nx,ny) && 
                      gym[nx][ny] !=='#' && visited[nx][ny] > visited[cx][cy]){
                          if(visited[nx][ny] === Infinity){
                              visited[nx][ny] = visited[cx][cy] +1;
                              queue.push([nx,ny,time+1]);
                          }
                          nx+=dx[i];
                          ny+=dy[i];
                      }
            }
         }
         startIndex = endIndex;
        }
       return console.log(-1);
    }
    move(x1,y1);
}
solution();
