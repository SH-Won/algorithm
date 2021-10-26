const fs =require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const solution = () =>{
    const [N,M] = input[0].split(' ').map(Number);
    let map = Array.from({length:N},()=>Array(M).fill(0))
    const qy = [-1,-1,-1,0,1,1,1,0];
    const qx = [-1,0,1,1,1,0,-1,-1];
    const ky = [-1,-2,-2,-1,1,2,2,1];
    const kx = [-2,-1,1,2,2,1,-1,-2];
    //const isValidPos =(y,x)=>(y>=0 && x>=0 && y<N && x<M);

   
    let answer = 0;
    for(let i=1; i<4; i++){
        const info = input[i].split(' ').map(Number);
        for(let j=1; j<info.length; j+=2){
            const [y,x] = [info[j],info[j+1]];
            map[y-1][x-1] = i;
        }
        
    }
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            if(map[y][x] === 1){
                for(let dir=0; dir<8; dir++){
                    let [ny,nx] = [y+qy[dir],x+qx[dir]];
                    while(ny >=0 && nx >=0 && ny<N && nx<M && map[ny][nx] <=0){
                       map[ny][nx] = -1
                        ny+=qy[dir] , nx+=qx[dir];
                    }
                }
            }
            else if(map[y][x] ===2){
                for(let dir=0; dir<8; dir++){
                    let [ny,nx] = [y+ky[dir],x+kx[dir]];
                    if(ny < 0 || nx <0 || ny >=N || nx >=M || map[ny][nx] ) continue;
                        map[ny][nx] = -1;
                }
            }
            
        }
    }
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            if(!map[y][x]) answer++;
        }
    }
    console.log(answer);
}    
solution();