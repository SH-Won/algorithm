// const input = ['4 2 1','1 1 5 2 2','1 4 7 1 6'];
// const input = ['4 2 2','1 1 5 2 2','1 4 7 1 6'];
// const input = ['4 2 3','1 1 5 2 2','1 4 7 1 6'];
// const input = ['7 5 3','1 3 5 2 4','2 3 5 2 6','5 2 9 1 7','6 2 1 3 5','4 4 2 4 2'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M,K] = input[0].split(' ').map(Number);
class FireBall{
    constructor(y,x,m,s,d){
        this.y = y-1;
        this.x = x-1;
        this.m = m;
        this.s = s;
        this.d = d;
    }
}
const dy = [-1,-1,0,1,1,1,0,-1];
const dx = [0,1,1,1,0,-1,-1,-1];
const fireballs = Array.from({length:M},(_,i)=>{
    const [y,x,m,s,d] = input[i+1].split(' ').map(Number);
    return new FireBall(y,x,m,s,d);
});
function move (){
    const {y,x,s,d} = this;
    const ns = s % N;
    const [ny,nx] = [ (y + dy[d]*ns + N) % N,(x + dx[d]*ns + N) % N];
    this.y = ny , this.x = nx;
}
const combineFireBall = (map) =>{
    let alltotalM = 0;
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            const fireBallArr = map[y][x];
            if(fireBallArr.length >=2){
                let totalM = 0 , totalS = 0 , count = 0 , odd_or_even = 0;
                fireBallArr.forEach(fireball => {
                    const {m,s,d} = fireball;
                    totalM+=m , totalS+=s , odd_or_even += (d%2) , count++;
                })
                map[y][x] = [];
                const splitM = Math.floor(totalM / 5);
                if(splitM === 0) continue;
                const splitS = Math.floor(totalS / count);
                const splitD = (odd_or_even === 0 || odd_or_even === count) ? [0,2,4,6] : [1,3,5,7];
                splitD.forEach(nd => map[y][x].push(new FireBall(y+1,x+1,splitM,splitS,nd)));
                alltotalM +=(splitM * 4);
            }
            else if(fireBallArr.length === 1){
                alltotalM += fireBallArr[0].m;
            }
        }
    }

    return alltotalM;
}

const solution = (fireballs,K) =>{
    let mSum ;
    let map = Array.from({length:N}, ()=>Array.from({length:N},()=>[]));
    FireBall.prototype.move = move;
    fireballs.forEach(fireball => map[fireball.y][fireball.x].push(fireball));
    while(K--){
        const currentMap = map;
        map = Array.from({length:N}, ()=>Array.from({length:N},()=>[]));
        for(let y=0; y<N; y++){
            for(let x=0; x<N; x++){
                const fireBallArr = currentMap[y][x];
                if(fireBallArr.length){
                    for(let i=0; i<fireBallArr.length; i++){
                        const fireball = fireBallArr[i];
                        fireball.move();
                        map[fireball.y][fireball.x].push(fireball);
                    }
                }
            }
        }
        mSum = combineFireBall(map);
    }
    return console.log(mSum);
}
solution(fireballs,K);