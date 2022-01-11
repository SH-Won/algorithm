const input = ['6','0 0 0 0 0 0','0 1 0 0 0 0','0 0 0 0 0 0','0 0 0 0 0 0','0 0 0 0 0 0','0 0 0 0 0 0']
// const input = ['3','0 0 0','0 0 0','0 0 0'];
// const input =['4','0 0 0 0','0 0 0 0','0 0 0 0','0 0 0 0'];
// const input = ['5','0 0 1 0 0','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0','0 0 0 0 0']
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getWayCount = (house) =>{
    const N = house.length;
    const [dy,dx] = [[0,1,1],[1,0,1]];
    const [HORIZON,VERTICAL,DIAGONAL] = [0,1,2];
    let ways = 0;
    const findWay = (y,x,dir) =>{
        if(y === N-1 && x === N-1) return ways++;

        for(let i=0; i<3; i++){
            if(dir === HORIZON && i === VERTICAL) continue;
            if(dir === VERTICAL && i === HORIZON) continue;
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= N || nx >= N || house[ny][nx] === 1) continue;
            if(i === DIAGONAL && (house[y+1][x] || house[y][x+1])) continue;
            findWay(ny,nx,i);
        }
    }
    findWay(0,1,HORIZON);
    return ways;
}
const solution = (input) =>{
    const N = +input[0];
    const house = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    const answer = getWayCount(house);
    console.log(answer);
}
solution(input);