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
//const fs =require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
const magic = Array.from({length:M},(_,i)=>input[i+N+1].split(' ').map(Number));
const md = [null,[-1,0],[1,0],[0,-1],[0,1]];
const ed = [[0,-1],[1,0],[0,1],[-1,0]];
const [Y,X] = [Math.floor(N/2),Math.floor(N/2)];

const explode = (marble) =>{
    let sum = 0;
    let explodedMarble = [];
    let exploable = true;
    while(exploable){
        let temp = marble[0];
        let count = 1;
        for(let i=1; i<=marble.length; i++){
            if(temp === marble[i]){
                count++;
            }
            else{
                if(count >=4){
                    sum+= temp*count;
                }
                else{
                    const remain = Array(count).fill(temp);
                    explodedMarble.push(...remain)
                }
                count = 1;
                temp = marble[i];
            }
        }
        exploable = marble.length !== explodedMarble.length ? true : false
        marble = explodedMarble.map(el => el);
        explodedMarble=[];
    }
   return [sum,marble];
}
const makeGroup = (explodedMarble) =>{
    let groupMarble = [];
    let current = explodedMarble[0];
    let count = 1;
    for(let i=1; i<=explodedMarble.length; i++){
        if(current === explodedMarble[i]) count++
        else{
            groupMarble.push(count,current);
            count = 1;
            current = explodedMarble[i];
        } 
    }
    return groupMarble
}
const extract = (map) =>{
    let count = [1,1,2,2];
    let emptyCount = 0;
    let marble = [];
    let [y,x] = [Y,X];
    while(true){
        for(let dir=0; dir<4; dir++){
           for(let c=0; c<count[dir]; c++){
               [y,x] = [y+ed[dir][0],x+ed[dir][1]];
               if(x === -1 || emptyCount ===2) return marble;
               if(!map[y][x]){
                   emptyCount++;
                   continue;
               }
               emptyCount = 0;
               marble.push(map[y][x]);
               
           }
        }
        count.forEach((num,index)=>count[index]+=2);
    }
}
const insert = (groupMarble,map) =>{
    groupMarble.reverse();
    
    let count = [1,1,2,2];
    let [y,x] = [Y,X];
    while(groupMarble.length){
        for(let dir=0; dir<4; dir++){
            for(let c=0; c<count[dir]; c++){
                [y,x] = [y+ed[dir][0],x+ed[dir][1]];
                if(x === -1) return;
                map[y][x] = groupMarble.pop();
                
            }
        }
        count.forEach((num,index)=>count[index]+=2);
    }
}
const throwIce = (d,s,map) =>{
    const dir = md[d];
    for(let i=1; i<=s; i++){
        let [ny,nx] = [Y+dir[0]*i , X+dir[1]*i];
        map[ny][nx] = null;
    }
}
const solution = (map) =>{
    let i=0;
    let sum = 0;
    while(i<magic.length){
        const [d,s] = magic[i];
        throwIce(d,s,map);
        const marble = extract(map);

        map.forEach(row => row.fill(null));
        const [score,explodedMarble] = explode(marble);
        sum+=score;
        const groupMarble = makeGroup(explodedMarble);
        insert(groupMarble,map)
        i++;
    }
   console.log(sum)
}
solution(map);


