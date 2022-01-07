// const input = ['2 20 50','50 30','20 40'];
// const input =['2 40 50','50 30','20 40'];
// const input =['2 20 50','50 30','30 40'];
// const input =['3 5 10','10 15 20','20 30 25','40 22 10'];
// const input = ['4 10 50','10 100 20 90','80 100 60 70','70 20 30 40','50 20 100 10'];
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const movePeople = (country,countries,move,L,R) =>{
    const n = countries.length;
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<n && x<n);
    const [dy,dx] = [[-1,1,0,0],[0,0,1,-1]];
    const [y,x] = country;
    move[y][x] = true;
    let queue = [[y,x]] , idx = 0 , union = 0;
    while(idx < queue.length){
        const [y,x] = queue[idx++];
        union += countries[y][x];
        const people = countries[y][x];
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || move[ny][nx] ) continue;
            const nextPeople = countries[ny][nx];
            if(Math.abs(people - nextPeople) < L || Math.abs(people - nextPeople) > R)  continue;
            move[ny][nx] = true;
            queue.push([ny,nx]);
        }
    }
    if(queue.length === 1) return false;
    const divPeople = union / queue.length >> 0
    queue.forEach(([y,x]) => countries[y][x] = divPeople);
    return true;
}

const solution = (input) =>{
    const [N,L,R] = input[0].split(' ').map(Number);
    let countries = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    let move = Array.from({length:N},()=>Array(N).fill(false));
    let days = 0 ;
    while(true){
        let isEnd = true;
        for(let y=0; y<N; y++){
            for(let x=0; x<N; x++){
                if(!move[y][x]){
                    const isMove = movePeople([y,x],countries,move,L,R);
                    if(isEnd && isMove) isEnd = false;
                }
            }
        }
        if(isEnd) return console.log(days);
        move.forEach(row => row.fill(false));
        days++;
    }
    
}
solution(input);