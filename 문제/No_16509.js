// const input = ['4 2','2 5']
// const input = ['0 1','8 4']
const input = ['0 2','1 4']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = input =>{
    const [sy,sx] = input[0].split(' ').map(Number);
    const [ey,ex]= input[1].split(' ').map(Number);
    const [dy,dx] = [[-1,0,1,0],[0,1,0,-1]];
    const [cy,cx] = [[[-2,-2],[-2,2],[2,2],[2,-2]],[[-2,2],[2,2],[2,-2],[-2,-2]]];
    const isValidPos = (y,x) =>(y>=0 && x>=0 && y<10 && x<9);
    const count = Array.from({length:10},()=>Array(9).fill(Infinity));
    count[sy][sx] = 0;
    let queue = [[sy,sx]];
    while(queue.length){
        const [y,x] = queue.shift();
        if(y === ey && x === ex) return console.log(count[y][x]);
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || (ny === ey && nx === ex)) continue;
            for(let j=0; j<2; j++){
                const [ny2,nx2] = [ny+cy[i][j],nx+cx[i][j]];
                if(!isValidPos(ny2,nx2) || count[ny2][nx2] <= count[y][x] + 1) continue;
                if(ny+cy[i][j]/2 === ey && nx+cx[i][j]/2 === ex) continue;
                count[ny2][nx2] = count[y][x] + 1;
                queue.push([ny2,nx2]);
            }
        }
    }
    console.log(-1);
}
solution(input);