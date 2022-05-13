// const input = ['2 20 50','50 30','20 40'];
// const input =['2 40 50','50 30','20 40'];
// const input =['2 20 50','50 30','30 40'];
// const input =['3 5 10','10 15 20','20 30 25','40 22 10'];
// const input = ['4 10 50','10 100 20 90','80 100 60 70','70 20 30 40','50 20 100 10'];

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const isMoved = (L,R,map) =>{
    const N = map.length;
    const direction = [[1,0],[-1,0],[0,1],[0,-1]];
    const visited = Array.from({length:N},()=>Array(N).fill(false));
    let move = false;
    map.forEach((row,y) => 
        row.forEach((people,x) =>{
            if(visited[y][x]) return;
            visited[y][x] = true;
            let queue = [[y,x]] , totalPeople = 0 ,idx = 0;
            while(idx < queue.length){
                const [y,x] = queue[idx++];
                totalPeople += map[y][x];
                direction.forEach(([dy,dx]) =>{
                    const [ny,nx] = [y+dy,x+dx];
                    if(ny < 0 || nx < 0 || ny >= N || nx >= N || visited[ny][nx]) return;
                    const diff = Math.abs(map[y][x] - map[ny][nx]);
                    if(diff < L || diff > R) return;
                    queue.push([ny,nx]);
                    visited[ny][nx] = true;
                })
            }
            if(totalPeople === people) return;
            move = true;
            const unitPeople = Math.floor(totalPeople / queue.length);
            queue.forEach(([y,x]) => map[y][x] = unitPeople);
        })
    )
    return move;
}
const solution = input =>{
    const [N,L,R] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    let count = 0;
    while(isMoved(L,R,map)) count++;
    console.log(count);
}
solution(input);