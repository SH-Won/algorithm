// const input = ['5','0 0 0 0 0','0 0 0 0 0','0 10 0 0 0','0 0 0 0 0','0 0 0 0 0'];
// const input = ['5','0 0 0 0 0','0 0 0 0 0','0 100 0 0 0','0 0 0 0 0','0 0 0 0 0'];
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
const [dy,dx] = [[0,1,0,-1],[-1,0,1,0]];
const sdy = [[-1,1,-2,-1,1,2,-1,1,0],[-1,-1,0,0,0,0,1,1,2],[1,-1,2,1,-1,-2,1,-1,0],[1,1,0,0,0,0,-1,-1,-2]];
const sdx = [[1,1,0,0,0,0,-1,-1,-2],[-1,1,-2,-1,1,2,-1,1,0],[-1,-1,0,0,0,0,1,1,2],[1,-1,2,1,-1,-2,1,-1,0]];
const ratio = [1,1,2,7,7,2,10,10,5];
const calcOutSand = (N,map) =>{
    let totalOutSand = 0;
    let [y,x] = [N/2 >>0 , N/2 >>0];
    let count = [1,1,2,2];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
    while(true){
        for(let d=0; d<4; d++){
            for(let c=0; c<count[d]; c++){
                [y,x] = [y+dy[d],x+dx[d]];
                if(x === -1) return totalOutSand;
                const sand = map[y][x];
                let totalSpreadSand = 0;
                map[y][x] = 0;
                for(let i=0; i<9; i++){
                    const [ny,nx] = [y+sdy[d][i],x+sdx[d][i]];
                    const spreadSand = (sand * ratio[i] / 100) >> 0;
                    totalSpreadSand+=spreadSand;
                    if(!isValidPos(ny,nx)) totalOutSand+=spreadSand;
                    else map[ny][nx]+=spreadSand;
                }
                const [ay,ax] = [y+dy[d],x+dx[d]];
                if(!isValidPos(ay,ax)) totalOutSand += (sand - totalSpreadSand);
                else map[ay][ax]+= (sand - totalSpreadSand);
            }
        }
        count.forEach((num,i) => count[i] +=2 );
    }
}
const solution = (input) =>{
    const N = +input[0];
    let map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    const answer = calcOutSand(N,map);
    console.log(answer);
}
solution(input);