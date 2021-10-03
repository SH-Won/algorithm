// const input = [
// '5 7',
// '0 0 0 0 0 0 0',
// '0 2 4 5 3 0 0',
// '0 3 0 2 5 2 0',
// '0 7 6 2 4 0 0',
// '0 0 0 0 0 0 0'
// ]
const fs =require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const iceberg = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));

const solution = (iceberg) =>{
    let visited = Array.from({length:N},()=>Array(M).fill(false));
    let melted = Array.from({length:N},()=>Array(M).fill(0));
    const isValidPos = (y,x)=>(y>=0 && x>=0 && y<N && x<M);
    const dy=[1,-1,0,0];
    const dx=[0,0,1,-1];
    const meltedIceberg = () =>{
        const next = melted;
        melted = Array.from({length:N},()=>Array(M).fill(0));
        //console.log(next.map(array=>array.join(' ')).join('\n'));
        return next;
    }
    const melt = () =>{
        for(let y=0; y<N; y++){
            for(let x=0; x<M; x++){
                if(iceberg[y][x]){
                    let count = 0;
                    let height = iceberg[y][x];
                    for(let i=0; i<4; i++){
                        const [ny,nx] = [y+dy[i],x+dx[i]];
                        if(!isValidPos(ny,nx) || iceberg[ny][nx]) continue;
                        count++;
                    }
                    height - count < 0 ? melted[y][x] = 0 : melted[y][x] = height-count;
                }
            }
        }
    }
    const seperate = (y,x) =>{
        visited[y][x] = true;
        let queue= [[y,x]];
        while(queue.length){
            const [cy,cx] = queue.shift();
            for(let i=0; i<4; i++){
                const [ny,nx] =[cy+dy[i],cx+dx[i]];
                if(!isValidPos(ny,nx) || visited[ny][nx] || !iceberg[ny][nx] ) continue;
                queue.push([ny,nx]);
                visited[ny][nx]=true;
            }
        }
    }
    let count =0;
    let year = 0;
    
    while(true){
        count = 0;
        melt();
        iceberg = meltedIceberg();
        year++;
        for(let y=0; y<N; y++){
            for(let x=0; x<M; x++){
                if(!visited[y][x] && iceberg[y][x]){
                    count++;
                    seperate(y,x);
                }
            }
        }
        if(count === 0 ) return console.log(0);
        if(count >= 2) return console.log(year);
        visited = visited.map(array=>array.fill(false));
    }

}
solution(iceberg);