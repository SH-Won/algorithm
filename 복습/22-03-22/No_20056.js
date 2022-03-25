// const input = ['4 2 1','1 1 5 2 2','1 4 7 1 6'];
// const input = ['4 2 2','1 1 5 2 2','1 4 7 1 6'];
// const input = ['4 2 3','1 1 5 2 2','1 4 7 1 6'];
// const input = ['7 5 3','1 3 5 2 4','2 3 5 2 6','5 2 9 1 7','6 2 1 3 5','4 4 2 4 2'];

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

class FireBall{
    constructor(r,c,m,s,d){
        this.r = r;
        this.c = c;
        this.m = m;
        this.s = s;
        this.d = d;
    }
    move = () =>{
        let {r,c,s,d,N} = this;
        s %= N;
        const [nr,nc] = [((r + this.dr[d]*s) + N) % N,((c + this.dc[d]*s) + N) % N];
        this.r = nr , this.c = nc ;
    }
}
const magic = (map) =>{
    for(let r=0; r<map.length; r++){
        for(let c=0; c<map.length; c++){
            const fireballs = map[r][c];
            if(fireballs.length < 2) continue;
            const sumM = Math.floor(fireballs.reduce((acc,fb) => acc+=fb.m,0) / 5);
            if(sumM === 0){
                map[r][c] = [];
                continue;
            }
            const sumS = Math.floor(fireballs.reduce((acc,fb) => acc+=fb.s,0) / fireballs.length);
            const odd_even = fireballs.reduce((acc,fb) => acc+= (fb.d % 2),0);
            const dir = (odd_even === 0 || odd_even === fireballs.length) ? [0,2,4,6] : [1,3,5,7];
            const newFireBalls = dir.map(d => new FireBall(r,c,sumM,sumS,d));
            map[r][c] = newFireBalls; 
        }
    }
}
const solution = input =>{
    let [N,M,K] = input[0].split(' ').map(Number);
    let map = Array.from({length:N},()=>Array.from({length:N},()=>[]));
    const [dr,dc] = [[-1,-1,0,1,1,1,0,-1],[0,1,1,1,0,-1,-1,-1]];
    for(let i=1; i<1+M; i++){
        const [r,c,m,s,d] = input[i].split(' ').map(Number);
        map[r-1][c-1].push(new FireBall(r-1,c-1,m,s,d));
    }
    FireBall.prototype.dr = dr , FireBall.prototype.dc = dc , FireBall.prototype.N = N;
    while(K--){
        const current = map;
        map = Array.from({length:N},()=>Array.from({length:N},()=>[]));
        for(let r=0; r<N; r++){
            for(let c=0; c<N; c++){
                const fireballs = current[r][c];
                if(fireballs.length){
                    for(let i=0; i<fireballs.length; i++){
                        const fireball = fireballs[i];
                        fireball.move();
                        map[fireball.r][fireball.c].push(fireball);
                    }
                }
            }
        }
        magic(map);
    }
    const sumM = map.reduce((acc,row) => acc+=row.reduce((acc,fbArr) => acc+= fbArr.length ? fbArr.reduce((acc,fb) => acc+=fb.m,0) : 0 ,0),0)
    console.log(sumM);
}
solution(input);

