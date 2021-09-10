const input =['2 3','SCC','...'];
//const input =['3 5','##C##','##C##','#..S#'] //ans -1
// const input =['7 7','C......','.......','###....','.......','#...S..','C....#.','.......'] //ans 22
// const input =['7 8','........','#.......','###.....','........','#...S...','.....#..','....C..C'] //ans 15
// const input =['8 8','........','#.......','###.....','........','#...S...','.....#.#','......CC','........'] //ans 9
//const input =['4 8','#...S...','.....#.#','......CC','........']; //ans9


//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(num =>+num);
const classroom = Array.from({length:N},(_,i)=>input[i+1].split(''));

const cPos = {y:null,x:null};
const startPos ={y:null,x:null}
loop: for(let i=0; i<N; i++){
    for(let j=0; j<M; j++){
        if(cPos.y !==null & startPos.y !==null) break loop;
        if(cPos.y ===null && classroom[i][j] ==='C'){
            cPos.y = i;
            cPos.x =j;
            
        }
        if(classroom[i][j] === 'S'){
            startPos.y = i;
            startPos.x = j;
        }
    }
}

const bfs = (y,x) =>{
    let count = Array.from({length:N},()=>Array.from({length:M},()=>Array.from({length:5},()=>Array(4).fill(0))));
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
    const distance =[[1,0],[-1,0],[0,1],[0,-1]];
    let queue= [[y,x,4,0]];
    for(let i=0; i<4; i++){
        count[y][x][i][0] = 0;
     }
    
    while(queue.length){
        const [cy,cx,d,c_count] = queue.shift();
        if(c_count === 3){
            return console.log(count[cy][cx][d][c_count]);
        }

        for(let i=0; i<distance.length; i++){
            if(d === i) continue;
            const [ny,nx] = [cy+distance[i][0],cx+distance[i][1]];
            if(!isValidPos(ny,nx) || count[ny][nx][i][c_count] || classroom[ny][nx] ==='#') continue;
            
            let next_c_count = c_count;
            if(classroom[ny][nx] === 'C'){
                if(ny ===cPos.y && nx ===cPos.x){
                 next_c_count = next_c_count | 1;
                }
                else{
                    next_c_count = next_c_count | 2;
                }
                // count[ny][nx][next_c_count] = count[cy][cx][c_count] +1
                // queue.push([ny,nx,i,next_c_count]);
            }
            count[ny][nx][i][next_c_count] = count[cy][cx][d][c_count] +1;
            queue.push([ny,nx,i,next_c_count]);
            
        }
    }
    return console.log(-1);
}
bfs(startPos.y,startPos.x);
