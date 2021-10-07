//const input = ['5','0 0 0 0 0','0 0 0 0 0','0 10 0 0 0','0 0 0 0 0','0 0 0 0 0'];
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
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
let map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
const dx = [-1,0,1,0];
const dy = [0,1,0,-1];
const dsx =[[1,1,0,0,0,0,-1,-1,-2],[-1,1,-2,-1,1,2,-1,1,0],[-1,-1,0,0,0,0,1,1,2],[1,-1,2,1,-1,-2,1,-1,0]];
const dsy =[[-1,1,-2,-1,1,2,-1,1,0],[-1,-1,0,0,0,0,1,1,2],[1,-1,2,1,-1,-2,1,-1,0],[1,1,0,0,0,0,-1,-1,-2]];
const ratio=[0.01,0.01,0.02,0.07,0.07,0.02,0.1,0.1,0.05];
let moveCount = [1,1,2,2];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);

const solution = () => {
    
    let cy = Math.floor(N/2);
    let cx = Math.floor(N/2);
    
    let totalOutSand = 0;
    while(true){
        
        for(let d=0; d<4; d++){
           
           for(let move=0; move<moveCount[d]; move++){
               const [ny,nx] = [cy+dy[d],cx+dx[d]];
               
               if(!isValidPos(ny,nx)){
                   //console.log(cy,cx);
                   return console.log(totalOutSand);
               }
               let sand = map[ny][nx];
               
               map[ny][nx] =0;
               let totalSpreadSand = 0;
               for(let i=0; i<9; i++){
                   const [sy,sx] = [ny+dsy[d][i],nx+dsx[d][i]];
                   let spreadSand = Math.floor(sand*ratio[i]);
                   totalSpreadSand += spreadSand
                   if(!isValidPos(sy,sx)) totalOutSand+=spreadSand
                   else map[sy][sx] += spreadSand
                   
               }

               const [ay,ax] = [ny+dy[d],nx+dx[d]];
               
               const alphaSand = sand - totalSpreadSand
               if(!isValidPos(ay,ax)) totalOutSand+=alphaSand
               else map[ay][ax]+=alphaSand
               cy = ny;
               cx = nx;
           }
        }
        moveCount.forEach((move,index)=> moveCount[index]+=2);        
    }

}
solution();