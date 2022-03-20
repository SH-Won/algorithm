const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const isLoad = (load,L) =>{
    let count = 1;
    for(let i=0; i<load.length - 1; i++){
        if(load[i] === load[i+1]) count++;
        else if(load[i] + 1 === load[i+1] && count >= L) count = 1;
        else if(load[i] - 1 === load[i+1] && count >= 0) count = 1-L;
        else return false;
    }
    return count >= 0
}
const solution = input =>{
    const [N,L] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i) => input[i+1].split(' ').map(Number));
    let path = 0;
    for(let y=0; y<N; y++){
        const column = map.map(row => row[y]);
        if(isLoad(map[y],L)) path++;
        if(isLoad(column,L)) path++;
    }
    console.log(path);
}
solution(input);