// const input = [
// '7 8',
// '.......',
// '......C',
// '......*',
// '*****.*',
// '....*..',
// '....*..',
// '.C..*..',
// '.......',
// ] // ans 3
// const input = ['4 4','C.**','..**','....','...C'] //ans1 
// const input = ['4 4','C...','....','**..','**.C'] //ans 1
// const input = ['4 4','**.C','**..','....','C...'] //ans 1;
// const input = ['4 4','...C','....','..**','C.**'] //ans1
// const input = ['4 7','....','..*.','C.*.','..*C','..*.','..*.','....'] //ans2;
// const input = ['4 7','....','.*..','.*.C','C*..','.*..','.*..','....']; //ans2
// const input = ['7 4','...C...','.......','.*****.','...C...'] //ans 2
// const input = ['4 6','.C..','....','....','**.*','....','...C'] //ans2
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getMinMirrorCount = (start,map) =>{
    const [H,W] = [map.length, map[0].length];
    const [dy,dx] =[[1,-1,0,0],[0,0,1,-1]];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<H && x<W);
    let install = Array.from({length:H},()=>Array.from({length:W},()=>Array(4).fill(Infinity)));
    const [y,x] = start;
    let queue = [] , idx = 0, min = Infinity;
    for(let i=0; i<4; i++){
        const [ny,nx] = [y+dy[i],x+dx[i]];
        if(!isValidPos(ny,nx) || map[ny][nx] === '*') continue;
        queue.push([ny,nx,i]);
        install[ny][nx][i] = 0;
        install[y][x][i] = 0;
    }
    while(idx < queue.length){
        const [y,x,dir] = queue[idx++];
        if(map[y][x] === 'C'){
            min = Math.min(min,install[y][x][dir]);
            continue;
        }
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || map[ny][nx] ==='*') continue;
            let installCount = install[y][x][dir];
            if(dir !==i) installCount++;
            if(install[ny][nx][i] > installCount){
                queue.push([ny,nx,i]);
                install[ny][nx][i] = installCount;
            }
        }
    }
    return min
}
const solution = (input) =>{
    const [W,H] = input[0].split(' ').map(Number);
    let map = Array.from({length:H},(_,i)=>input[i+1].split(''));
    let start ;
    loop:for(let y=0; y<H; y++){
        for(let x=0; x<W; x++){
            if(map[y][x] ==='C'){
                start = [y,x] , map[y][x] = '.'
                break loop;
            }
        }
    }
    const answer = getMinMirrorCount(start,map);
    console.log(answer);
}
solution(input);