// const input = ['5 5','1 2 3 4 5','0 0 4 0 0','0 0 5 0 0','8 7 6 7 8','9 0 7 0 0']
// const input = ['2 2','1 2','3 4']
// const input = ['5 6','2 0 7 4 0 2','0 8 5 0 3 0','6 9 5 7 7 2','6 9 3 9 9 7','0 8 7 4 0 3']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const escapeRoom = (y,x,map) =>{
    const room = map[y][x];
    const [N,M] = [map.length, map[0].length];
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    let distance = Array.from({length:N},()=>Array(M).fill(Infinity));
    distance[y][x] = 0;
    let maxDistance = 0, password;
    let queue = [[y,x]];
    while(queue.length){
        const [y,x] = queue.shift();
        if(distance[y][x] > maxDistance){
            maxDistance = distance[y][x];
            password = room + map[y][x];
        }
        else if(distance[y][x] === maxDistance){
            password = Math.max(password,room+map[y][x]);
        }
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= N || nx >= M || distance[ny][nx] <= distance[y][x] + 1 || !map[ny][nx]) continue;
            queue.push([ny,nx]);
            distance[ny][nx] = distance[y][x] + 1;
        }
    }
    // if(room === 5) distance.forEach(row => console.log(row));
    return [maxDistance,password];
}
const solution = input => {
    const [N,M] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));

    let maxDistance = 0 , maxPassword;
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            if(map[y][x]){
                const [distance,password] = escapeRoom(y,x,map);
                if(distance > maxDistance){
                    maxDistance = distance;
                    maxPassword = password;
                }
                else if(distance === maxDistance) maxPassword = Math.max(maxPassword,password);
            }
        }
    }
    if(!maxPassword) return console.log(0);
    console.log(maxPassword);
}
solution(input);