// const input = [
//     '8 9',
//     '0 0 0 0 0 0 0 0 0',
//     '0 0 0 1 1 0 0 0 0',
//     '0 0 0 1 1 0 1 1 0',
//     '0 0 1 1 1 1 1 1 0',
//     '0 0 1 1 1 1 1 0 0',
//     '0 0 1 1 0 1 1 0 0',
//     '0 0 0 0 0 0 0 0 0',
//     '0 0 0 0 0 0 0 0 0'
//     ]
const input = [
    '5 5',
    '0 0 0 0 0',
    '0 1 1 1 0',
    '0 1 0 1 0',
    '0 1 1 1 0',
    '0 0 0 0 0'
]
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
const findAir =(y,x,airMap,map) =>{
    const [R,C] = [map.length, map[0].length];
    airMap[y][x] = true;
    let count = 0;
    let queue = [[y,x]], idx =0;
    while(idx < queue.length){
        const [y,x] = queue[idx++];
        count++;
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >=R || nx >=C || airMap[ny][nx] || map[ny][nx]) continue;
            queue.push([ny,nx]);
            airMap[ny][nx] = true;
        }
    }
    console.log(count);
}
const meltcheese = (airMap,map) =>{
    let removeCheese = [];
    for(let y=0; y<map.length; y++){
        for(let x=0; x<map[0].length; x++){
            if(map[y][x]){
                let count = 0;
                for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(airMap[ny][nx]) count++;
                if(count >=2){
                   removeCheese.push([y,x]);
                   break;
                }
            }
          }
        }
    }
    removeCheese.forEach(([y,x])=> (airMap[y][x] = true , map[y][x] = 0));
    return removeCheese.length;
}
const solution = (input) =>{
    const [R,C] = input[0].split(' ').map(Number);
    let map = Array.from({length:R},(_,i) => input[i+1].split(' ').map(Number));
    let airMap = Array.from({length:R},() => Array(C).fill(false));
    let cheese = map.flat().reduce((acc,cur) => acc+=(cur ? 1:0),0);
    findAir(0,0,airMap,map);
    let hours = 0;
    while(cheese){
        cheese-= meltcheese(airMap,map)
        hours++;
    }
    console.log(hours);
}
solution(input);