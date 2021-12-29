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
// const input = [
//     '7 7',
//     '1 1 1 2 2 2 3',
//     '1 2 2 1 2 2 3',
//     '1 3 3 2 3 1 2',
//     '1 2 2 0 3 2 2',
//     '3 1 2 2 3 2 2',
//     '3 1 2 1 1 2 1',
//     '3 1 2 2 2 1 1',
//     '1 3',
//     '2 2',
//     '3 1',
//     '4 3',
//     '1 3',
//     '1 1',
//     '1 3'
//     ]
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
const command = Array.from({length:M},(_,i)=>input[i+N+1].split(' ').map(Number));
const [Y,X] = [N/2 >>0 , N/2 >>0];
const [dy,dx] = [[null,-1,1,0,0],[null,0,0,-1,1]];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);

const makeGroup = (explodedArr) =>{
    let groupArr = [];
    let count = 1;
    for(let i=0; i<explodedArr.length; i++){
        const [cur,next] = [explodedArr[i],explodedArr[i+1]];
        if(cur === next){
            count++;
            continue;
        }
        else{
            groupArr.push(count,cur);
            count = 1;
        }
    }
    return groupArr;
}
const explode = (extractArr) =>{
    let explodedArr = [];
    let sum = 0;
    while(true){
        let count = 1;
        for(let i=0; i<extractArr.length; i++){
            const [cur,next] = [extractArr[i],extractArr[i+1]];
            if(cur === next){
                count++;
                continue;
            }
            if(count >=4){
                sum+= cur * count;
            }
            else{
                explodedArr.push(...Array(count).fill(cur));
            }
            count = 1;
        }
        if(extractArr.length === explodedArr.length) break;
        extractArr = [...explodedArr];
        explodedArr = [];
    }
    return [sum,explodedArr];
} 
const extract = (map) =>{
     const [dy,dx] = [[0,1,0,-1],[-1,0,1,0]];
     let count = [1,1,2,2];
     let [y,x] = [Y,X] , zeroCount=0;
     let extractArr = [];
     while(true){
         for(let dir=0; dir<4; dir++){
             let c = count[dir];
             while(c--){
                 y+=dy[dir] ,x+=dx[dir];
                 if(x === -1 || zeroCount === 2) return extractArr;
                 if(map[y][x]){
                     extractArr.push(map[y][x]);
                     map[y][x] = 0;
                     zeroCount = 0;
                 }
                 else zeroCount++;
             }
         }
         count.forEach((num,index)=> count[index]+=2);
     }
}
const insert = (groupArr,map) =>{
    const [dy,dx] = [[0,1,0,-1],[-1,0,1,0]];
    let count = [1,1,2,2];
    let [y,x] = [Y,X];
    groupArr.reverse();
    while(true){
        for(let dir=0; dir<4; dir++){
            let c = count[dir];
            while(c--){
                y+=dy[dir] ,x+=dx[dir];
                if(x === -1 || !groupArr.length) return ;
                map[y][x] = groupArr.pop();
            }
        }
        count.forEach((num,index)=> count[index]+=2);
    }
}
const magic = (map,d,s) =>{
    for(let i=1; i<=s; i++){
        let [ny,nx] = [Y+dy[d]*i,X+dx[d]*i];
        map[ny][nx] = 0;
    }
}
const solution = (map,command) =>{
    command.reverse();
    let sum = 0;
    while(command.length){
        const [d,s] = command.pop();
        magic(map,d,s);
        const extractArr = extract(map);
        const [score,explodedArr] = explode(extractArr);
        sum+=score;
        const groupArr = makeGroup(explodedArr);
        insert(groupArr,map);
    }
    console.log(sum);
}
solution(map,command);