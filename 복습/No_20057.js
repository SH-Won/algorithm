//const input = ['5','0 0 0 0 0','0 0 0 0 0','0 10 0 0 0','0 0 0 0 0','0 0 0 0 0'];
//const input = ['5','0 0 0 0 0','0 0 0 0 0','0 100 0 0 0','0 0 0 0 0','0 0 0 0 0'];
//  const input = [
// '7',
// '1 2 3 4 5 6 7',
// '1 2 3 4 5 6 7',
// '1 2 3 4 5 6 7',
// '1 2 3 0 5 6 7',
// '1 2 3 4 5 6 7',
// '1 2 3 4 5 6 7',
// '1 2 3 4 5 6 7',
// ]
// const input = [
// '5',
// '100 200 300 400 200',
// '300 243 432 334 555',
// '999 111 0 999 333',
// '888 777 222 333 900',
// '100 200 300 400 500',
// ]
// const input = [
// '5',
// '0 0 100 0 0',
// '0 0 100 0 0',
// '0 0 0 0 0',
// '0 0 100 0 0',
// '0 0 100 0 0'
// ]
// const input = [
// '9',
// '193 483 223 482 858 274 847 283 748',
// '484 273 585 868 271 444 584 293 858',
// '828 384 382 818 347 858 293 999 727',
// '818 384 727 373 636 141 234 589 991',
// '913 564 555 827 0 999 123 123 123',
// '321 321 321 983 982 981 983 980 990',
// '908 105 270 173 147 148 850 992 113',
// '943 923 982 981 223 131 222 913 562',
// '752 572 719 590 551 179 141 137 731',
// ]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
//const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
const sdy = [[-1,1,-2,-1,1,2,-1,1,0],[-1,-1,0,0,0,0,1,1,2],[1,-1,2,1,-1,-2,1,-1,0],[1,1,0,0,0,0,-1,-1,-2]];
const sdx = [[1,1,0,0,0,0,-1,-1,-2],[-1,1,-2,-1,1,2,-1,1,0],[-1,-1,0,0,0,0,1,1,2],[1,-1,2,1,-1,-2,1,-1,0]];
const dy = [0,1,0,-1];
const dx = [-1,0,1,0];
const ratio = [1,1,2,7,7,2,10,10,5];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
const solution = () =>{
    let map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    let count = [1,1,2,2];
    let [y,x] = [Math.floor(N/2),Math.floor(N/2)];
    let totalOutSand = 0;
    while(true){
        for(let dir=0; dir<4; dir++){
            for(let c=0; c<count[dir]; c++){
                const [ny,nx] = [y+dy[dir],x+dx[dir]];
                if(!isValidPos(ny,nx)) return console.log(totalOutSand);
                let sand = map[ny][nx];
                let spreadSand = 0;
                for(let s=0; s<9; s++){
                    const [sy,sx] = [ny+sdy[dir][s],nx+sdx[dir][s]];
                    const spread = Math.floor((sand * ratio[s])/100);
                    if(!isValidPos(sy,sx)) totalOutSand+=spread;
                    else map[sy][sx] += spread;
                    spreadSand+=spread;
                }
                const [ay,ax] = [ny+dy[dir],nx+dx[dir]];
                const alphaSand = sand -spreadSand;
                if(!isValidPos(ay,ax)) totalOutSand+=alphaSand;
                else map[ay][ax]+=alphaSand;
                map[ny][nx] = 0;
                y=ny, x=nx; 
            }
        }
        count.forEach((num,index)=>count[index]+=2);
    }
}
solution();