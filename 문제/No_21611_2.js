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
//]
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
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const map = Array.from({length:N}, (_,i)=>input[i+1].split(' ').map(Number));
const command = Array.from({length:M},(_,i)=>input[i+1+N].split(' ').map(Number));
const dy = [0,-1,1,0,0];
const dx = [0,0,0,-1,1];
const my = [0,1,0,-1];
const mx = [-1,0,1,0];
const [y,x] = [Math.floor(N/2), Math.floor(N/2)];

const extract = (map) =>{
    let array = [];
    let count = [1,1,2,2];
    let [ny,nx] = [y,x];
    let zeroCount = 0;
    while(true){
        for(let dir=0; dir<4; dir++){
            for(let i=0; i<count[dir]; i++){
                [ny,nx] = [ny+my[dir],nx+mx[dir]];
                
                if(nx === -1 || zeroCount ===2) return array;
                if(!map[ny][nx]){
                    zeroCount++;
                    continue;
                }
                array.push(map[ny][nx]);
                zeroCount =0;
            }
        }
        count.forEach((num,index) => count[index]+=2 );
    }
}
const explode = (extractArray) =>{
    let array = [];
    let sum = 0;
    while(true){
        let count = 1;
        let temp = extractArray[0];
        for(let i=1; i<=extractArray.length; i++){
           if(temp === extractArray[i]){
               count++;
           }
           else{
               if(count < 4){
                  for(let j=i-count; j<i; j++){
                      array.push(extractArray[j])
                  }
               }
               else sum += temp * count;
               temp = extractArray[i];
               count=1;
           }
        }
        if(extractArray.length === array.length) return [sum,array];
        extractArray = array.map(num => num);
        array = [];
        
    }
}
const makeGroup = (explodedArray) =>{
    let array = [];
    let count = 1;
    let temp = explodedArray[0];
    for(let i=1; i<=explodedArray.length; i++){
        if(temp === explodedArray[i]) count++;
        else{
            array.push(count);
            array.push(temp);
            count = 1;
            temp =explodedArray[i];
        }
    }
    return array
}
const insert = (group,map) =>{
    let count = [1,1,2,2];
    let [ny,nx] = [y,x];
    let i=0;
    while(true){
        for(let dir=0; dir<4; dir++){
            for(let c=0; c<count[dir]; c++){
                [ny,nx] = [ny+my[dir],nx+mx[dir]];
                if(nx === -1 || i >= group.length ) return 
                map[ny][nx] = group[i];
                i++;  
            }
        }
        count.forEach((num,index) => count[index]+=2 );
    }
}
const removeMarble = (d,s,map) =>{
    let [ny,nx] = [y,x];
    for(let i=0; i<s; i++){
        [ny,nx] = [ny+dy[d],nx+dx[d]];
        map[ny][nx] = 0;
    }
}

const solution = (map,command) =>{
    let sum = 0;
    let i=0;
    while(i < command.length){
        const [d,s] = command[i];
        removeMarble(d,s,map);
        const extractArray = extract(map);
        map.forEach(row => row.fill(0));
        const [explodedSum,explodedArray] = explode(extractArray);
        sum +=explodedSum;
        const group = makeGroup(explodedArray);
        insert(group,map);
        i++;
    }
    return console.log(sum);
}
solution(map,command);