// const input = ['4 2 1','1 1 5 2 2','1 4 7 1 6'];
// const input = ['4 2 2','1 1 5 2 2','1 4 7 1 6'];
// const input = ['4 2 3','1 1 5 2 2','1 4 7 1 6'];
// const input = ['7 5 3','1 3 5 2 4','2 3 5 2 6','5 2 9 1 7','6 2 1 3 5','4 4 2 4 2'];

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

function FireBall(r,c,m,s,d){
    this.r = r-1;
    this.c = c-1;
    this.m = m;
    this.s = s;
    this.d = d;
}
function move(){
    let {r,c,s,d,N} = this;
    s%=N;
    const [nr,nc] = [(r + this.dr[d]*s + N) % N ,(c + this.dc[d]*s + N) % N];
    this.r = nr , this.c = nc; 
}
const combineAndSplit =(map) =>{
    let mSum = 0;
    for(let r=0; r<map.length; r++){
        for(let c=0; c<map.length; c++){
            const ballArr = map[r][c];
            if(ballArr.length >= 2 ){
                const count = ballArr.length;
                let totalM = 0 ,totalS =0 , oddEven = 0;
                ballArr.forEach(fb => (totalM+=fb.m , totalS+=fb.s , oddEven += fb.d % 2));
                const splitM = totalM / 5 >>0;
                map[r][c] = [];
                if(splitM === 0) continue;
                const splitS = totalS / count >>0;
                const splitD = (oddEven === 0 || oddEven === count) ? [0,2,4,6] : [1,3,5,7];
                const newBallArr = splitD.map(d => new FireBall(r+1,c+1,splitM,splitS,d));
                map[r][c] =newBallArr;
                mSum+= (splitM * 4);
            }
            else if(ballArr.length === 1){
                mSum += ballArr[0].m;
            }
        }
    }
    return mSum;
}
const solution = (input) =>{
    const [N,M,K] = input[0].split(' ').map(Number);
    let fireBalls = Array.from({length:M}, (_,i) => new FireBall(...input[i+1].split(' ').map(Number)));
    let map = Array.from({length:N},()=>Array.from({length:N} ,()=>[]));
    fireBalls.forEach(fb => map[fb.r][fb.c].push(fb));
    FireBall.prototype.dr = [-1,-1,0,1,1,1,0,-1] , FireBall.prototype.dc = [0,1,1,1,0,-1,-1,-1];
    FireBall.prototype.N = N , FireBall.prototype.move = move;
    let answer = 0;
    let count = K;
    while(count--){
        const current = map;
        map = Array.from({length:N},()=>Array.from({length:N} ,()=>[]));
        for(let y=0; y<N; y++){
            for(let x=0; x<N; x++){
                const ballArr = current[y][x];
                if(ballArr.length){
                    for(let i=0; i<ballArr.length; i++){
                        const fireBall = ballArr[i];
                        fireBall.move();
                        map[fireBall.r][fireBall.c].push(fireBall);
                    }
                }
            }
        }
        answer = combineAndSplit(map);
    }
    console.log(answer);
}
solution(input);