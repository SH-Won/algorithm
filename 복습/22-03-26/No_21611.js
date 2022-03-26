// const input = [
// '7 1',
// '0 0 0 0 0 0 0',
// '3 2 1 3 2 3 0',
// '2 1 2 1 2 1 0',
// '2 1 1 0 2 1 1',
// '3 3 2 3 2 1 2',
// '3 3 3 1 3 3 2',
// '2 3 2 2 3 2 3',
// '2 2'
// ]
// const input = [
// '7 4',
// '0 0 0 2 3 2 3',
// '1 2 3 1 2 3 1',
// '2 3 1 2 3 1 2',
// '1 2 3 0 2 3 1',
// '2 3 1 2 3 1 2',
// '3 1 2 3 1 2 3',
// '1 2 3 1 2 3 1',
// '1 3',
// '2 2',
// '3 1',
// '4 3'
// ]
// const input = [
// '7 4',
// '1 1 1 2 2 2 3',
// '1 2 2 1 2 2 3',
// '1 3 3 2 3 1 2',
// '1 2 2 0 3 2 2',
// '3 1 2 2 3 2 2',
// '3 1 2 1 1 2 1',
// '3 1 2 2 2 1 1',
// '1 3',
// '2 2',
// '3 1',
// '4 3'
// ]
const input = [
    '7 7',
    '1 1 1 2 2 2 3',
    '1 2 2 1 2 2 3',
    '1 3 3 2 3 1 2',
    '1 2 2 0 3 2 2',
    '3 1 2 2 3 2 2',
    '3 1 2 1 1 2 1',
    '3 1 2 2 2 1 1',
    '1 3',
    '2 2',
    '3 1',
    '4 3',
    '1 3',
    '1 1',
    '1 3'
    ]
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const insert = (groupArr,map) =>{
    groupArr.reverse();
    const N = Math.floor(map.length/2);
    let [y,x] = [N,N];
    const [dy,dx] = [[0,1,0,-1],[-1,0,1,0]];
    let count = [1,1,2,2];
    while(true){
        for(let dir=0; dir<4; dir++){
            for(let c=0; c<count[dir]; c++){
                const [ny,nx] = [y+dy[dir],x+dx[dir]];
                if(nx === -1) return;
                y = ny , x = nx;
                if(groupArr.length) map[y][x] = groupArr.pop();
                else map[y][x] = 0;
            }
        }
        count.forEach((_,i) => count[i]+=2);
    }
}
const grouping = explodedArr =>{
    let result = [];
    let pre = explodedArr[0], count = 1;
    for(let i=1; i<=explodedArr.length; i++){
        if(pre === explodedArr[i]) count++;
        else{
            result.push(count,pre);
            pre = explodedArr[i];
            count = 1;
        }
    }
    return result;
}
const explode = extractedArr =>{
    let result = [];
    let sum = 0;
    while(true){
        let pre = extractedArr[0];
        let count = 1;
        for(let i=1; i<=extractedArr.length; i++){
            if(pre === extractedArr[i]) count++;
            else{
                if(count < 4) result.push(...Array(count).fill(pre));
                else sum += (pre * count);
                pre = extractedArr[i];
                count = 1;
            }
        }
        if(result.length === extractedArr.length) return [result,sum];
        extractedArr = result;
        result = [];
    }
}
const extract = map =>{
    const N = Math.floor(map.length/2);
    let [y,x] = [N,N];
    const [dy,dx] = [[0,1,0,-1],[-1,0,1,0]];
    let count = [1,1,2,2];
    let zeroCount = 0;
    const result = [];
    while(true){
        for(let dir=0; dir<4; dir++){
            for(let c=0; c<count[dir]; c++){
                const [ny,nx] = [y+dy[dir],x+dx[dir]];
                if(nx === -1 || zeroCount === 2) return result;
                y = ny , x = nx;
                if(map[y][x]){
                    result.push(map[y][x]);
                    map[y][x] = 0;
                    zeroCount = 0;
                }
                else zeroCount++;
            }
        }
        count.forEach((_,idx) => count[idx]+=2);
    }
}
const magic = (d,s,map) =>{
    const N = Math.floor(map.length/2);
    const [dy,dx] = [[-1,1,0,0],[0,0,-1,1]];
    for(let i=1; i<=s; i++){
        const [ny,nx] = [N+dy[d]*i , N+dx[d]*i];
        map[ny][nx] = 0;
    }
}
const solution = input => {
    const [N,M] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i)=> input[i+1].split(' ').map(Number));
    const command = Array.from({length:M},(_,i)=> input[i+1+N].split(' ').map(Number)).reverse();
    let answer = 0;
    while(command.length){
        const [d,s] = command.pop();
        magic(d-1,s,map);
        const extractedArr = extract(map);
        const [explodedArr,sum] = explode(extractedArr);
        const groupArr = grouping(explodedArr);
        insert(groupArr,map);
        answer += sum;
    }
    console.log(answer);
}
solution(input);