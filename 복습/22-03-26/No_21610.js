// const input = [
// '5 4',
// '0 0 1 0 2',
// '2 3 2 1 0',
// '4 3 2 9 0',
// '1 0 2 9 0',
// '8 8 2 1 0',
// '1 3',
// '3 4',
// '8 1',
// '4 8'
// ]
// const input = [
//     '5 8',
//     '0 0 1 0 2',
//     '2 3 2 1 0',
//     '0 0 2 0 0',
//     '1 0 2 0 0',
//     '0 0 2 1 0',
//     '1 9',
//     '2 8',
//     '3 7',
//     '4 6',
//     '5 5',
//     '6 4',
//     '7 3',
//     '8 2'
//     ]
    // const input = [
    // '5 8',
    // '100 100 100 100 100',
    // '100 100 100 100 100',
    // '100 100 100 100 100',
    // '100 100 100 100 100',
    // '100 100 100 100 100',
    // '8 1',
    // '7 1',
    // '6 1',
    // '5 1',
    // '4 1',
    // '3 1',
    // '2 1',
    // '1 1',
    // ]
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [dy,dx] = [[0,-1,-1,-1,0,1,1,1],[-1,-1,0,1,1,1,0,-1]];
const water_bug = (clouds,map,cloudMap) =>{
    const nextClouds = [];
    clouds.forEach(([y,x]) =>(cloudMap[y][x] = true , map[y][x]++ )); // 물 1증가 , 다음 구름이 생기는칸 제외;
    clouds.forEach(([y,x])=>{
        let count = 0;
        for(let i=1; i<8; i+=2){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= map.length || nx >= map.length || !map[ny][nx]) continue;
            count++;
        }
        map[y][x]+=count;
    }); // 대각선 물복사
    map.forEach((row,y) => 
        row.forEach((water,x) => {
            if(cloudMap[y][x]) cloudMap[y][x] = false;
            else if(water >= 2) nextClouds.push([y,x]) , map[y][x]-=2 ;
        })
    )
    return nextClouds;
}
const solution = input =>{
    const [N,M] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i) => input[i+1].split(' ').map(Number));
    const cloudMap = Array.from({length:N},()=>Array(N).fill(false)); // visited;
    const command = Array.from({length:M},(_,i) => input[i+1+N].split(' ').map(Number)).reverse();
    let clouds = [[N-1,0],[N-1,1],[N-2,0],[N-2,1]];
    while(command.length){
        const [d,s] = command.pop();
        clouds.forEach(([y,x],idx) =>{
            const [ny,nx] = [(y+dy[d-1]*(s % N)+N) % N ,(x+dx[d-1]*(s % N)+N) % N];
            clouds[idx] = [ny,nx];
        })
        clouds = water_bug(clouds,map,cloudMap);
    }
    const answer = map.reduce((acc,row) => acc+=row.reduce((acc,water) => acc+=water,0),0);
    console.log(answer);
}
solution(input);