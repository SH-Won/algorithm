//const input =['2 3','SCC','...'];
//const input =['3 5','##C##','##C##','#..S#'] //ans -1
//const input =['7 7','C......','.......','###....','.......','#...S..','C....#.','.......'] //ans 22
// const input =['7 8','........','#.......','###.....','........','#...S...','.....#..','....C..C'] //ans 15
// const input =['8 8','........','#.......','###.....','........','#...S...','.....#.#','......CC','........'] //ans 9
//const input =['4 8','#...S...','.....#.#','......CC','........']; //ans9

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(num =>+num);
let classroom = Array.from({length:N},(_,i)=>input[i+1].split(''));
const getStartPos =()=>{
    let flag = false;
    let start ;
    for(let i=0; i<N; i++){
        for(let j=0; j<M; j++){
            if(classroom[i][j] === 'S'){
                start = [i,j];
            }
            if(!flag && classroom[i][j] ==='C'){
                classroom[i][j] ='c';
                flag = true;
            }
        }
    }
    return start;
}  
let start = getStartPos();

const bfs = (start) =>{
    let visited = Array.from({length:N},()=>Array.from({length:M},()=>Array.from({length:5},()=>Array.from({length:2},()=>Array(2).fill(0)))));
    
    const isValidPos = (y,x) =>(y>=0 && x>=0 && y<N && x<M)
    const distance = [[0,-1],[0,1],[-1,0],[1,0]]
    for(let i=0; i<4; i++){
        visited[start[0]][start[1]][i][0][0] = 0;
    }
    let queue =[];
    queue.push([...start,4,0,0]);
    while(queue.length){
        const [cy,cx,dir,c,c1] = queue.shift();
        if(c===1 && c1 ===1){
            return visited[cy][cx][dir][c][c1];
        }

        for(let i=0; i<4; i++){
            if(dir === i) continue;
            const [ny,nx] = [cy+distance[i][0],cx+distance[i][1]];
            let [C,C1] =[c,c1];
            if(!isValidPos(ny,nx) || classroom[ny][nx] ==='#' || visited[ny][nx][i][c][c1]) continue;
            if(classroom[ny][nx] ==='C') C=1;
            if(classroom[ny][nx] ==='c') C1=1;
            visited[ny][nx][i][C][C1] = visited[cy][cx][dir][c][c1] +1;
            queue.push([ny,nx,i,C,C1])
        }
    }
    
   return -1;
   
}
let answer = bfs(start);
console.log(answer);

// 2 0 0 
// 1 2 0

// 2 3 0
// 3 2 3

// 0 0 4
// 0 0 0

//2 3 0
//1 2 0

//2 1 4
//3 2 3

// 0 0 4
// 0 0 0
