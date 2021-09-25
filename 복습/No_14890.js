//const input = ['6 2','3 3 3 3 3 3','2 3 3 3 3 3','2 2 2 3 2 3','1 1 1 2 2 2','1 1 1 3 3 1','1 1 2 3 3 2']
// const input = [
//     '6 2',
//     '3 2 1 1 2 3',
// '3 2 2 1 2 3',
// '3 2 2 2 3 3',
// '3 3 3 3 3 3',
// '3 3 3 3 2 2',
// '3 3 3 3 2 2'
// ]
// const input =[
//     '6 3',
// '3 2 1 1 2 3',
// '3 2 2 1 2 3',
// '3 2 2 2 3 3',
// '3 3 3 3 3 3',
// '3 3 3 3 2 2',
// '3 3 3 3 2 2',
// ]
// const input = [
//     '6 1',
// '3 2 1 1 2 3',
// '3 2 2 1 2 3',
// '3 2 2 2 3 3',
// '3 3 3 3 3 3',
// '3 3 3 3 2 2',
// '3 3 3 3 2 2',
// ]
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,L] = input[0].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));

const solution = () =>{
    let count = 0;
    const isPossible = (load) =>{
        let count = 1;
        for(let i=0; i<load.length-1; i++){
            if(load[i] === load[i+1]) count++;
            else if(load[i]-1 === load[i+1] && count >=0) count= 1-L;
            else if(load[i]+1 === load[i+1] && count >=L) count =1;
            else return false;
        }
        return count >=0 ;
    }
    for(let i=0; i<N; i++){
        if(isPossible(map[i])) count++;
        if(isPossible(map.map(array=> array[i]))) count++;
    }
    return console.log(count);
}
solution();