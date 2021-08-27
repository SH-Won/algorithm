//const input =['3 4 1','....','###.','....','1 1 3 1'];
//const input =['2 2 1','.#','#.','1 1 2 2']
//const input =['4 4 2','....','....','....','....','1 1 4 1']

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let inputIndex = 0;
const [N,M,K]= input[inputIndex++].split(' ').map(num => +num);
let gym = Array.from({length:N},()=>input[inputIndex++].split(''));
let visited = Array.from({length:N},()=>Array(M).fill(Infinity));
const [x1,y1,x2,y2]=input[inputIndex].split(' ').map(num => (+num) -1);

const bfs =(x,y)=>{
    let queue = [[x,y]];
    visited[x][y] =0;
    const isValidPos =(x,y)=> (x>=0 && y>=0 && x<N && y<M);
    const distance = [[1,0],[-1,0],[0,1],[0,-1]];
    let startIndex = 0;
    let endIndex;
    // 시간초과가 걸려서 shift() 메서드를 사용하지않고,
    // 깊이가 1씩 증가할때 queue 의 추가된 갯수를 파악하고,
    // startIndex 와 endIndex를 정해 직접 참조한다.
    // 시간초과 되었던게 무려 시간이 반이상 줄었다.
    // shift() 메서드는 배열을 한번 쭉 조회하므로
    // 직접 조회하는 queue[i] 식의 조회방법과 시간차이가 많이난다.
    while(startIndex !== queue.length){
        endIndex = queue.length;
        for(let i=startIndex; i<endIndex; i++){
        const [cx,cy] =queue[i];
        distance.forEach(([mx,my])=>{
            let [nx,ny] = [cx+mx,cy+my];
            let depth = K;
            // 이미 방문한곳을 '#' 으로 막으면 안됨
            // 이미 방문한곳보다 다음 방문할곳이 작다면
            // 큐에 이미 넣어진 다음방문지점부터 시작하는게 최단거리이기때문에
            // 큐에 넣어줄 필요가 없다.
            // visited[nx][ny] > visited[cx][cy]  이
            // 11011
            // 2#1##
            // 22122
            // 2####
            // (2,2)  에서 시작한다고 가정, K는 5
            while(depth-- && isValidPos(nx,ny) && gym[nx][ny] !=='#' &&
                  visited[nx][ny] > visited[cx][cy]){
                    if(visited[nx][ny] === Infinity){
                        queue.push([nx,ny]);
                        visited[nx][ny] = visited[cx][cy] + 1;
                    }
                    nx+=mx;
                    ny+=my;
                  }
        })
        
    }
    startIndex= endIndex;

    }
    return visited[x2][y2];
}
let answer = bfs(x1,y1);
console.log(answer === Infinity ? -1 : answer);