const [N,K] = [132,3];
//const fs = require('fs');
//const [N,K] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(num =>+num);
console.log( typeof Math.pow(10,2));

const bfs = (N,K) =>{
    let visited = Array.from({length:Math.pow(10,N.toString().split('').length)},()=>Array(K+1).fill(false));
    let max = -1;
    let queue =[[N,0]];
    visited[parseInt(N)][0] = true;
    while(queue.length){
        const [number,count] = queue.shift();
        if(count === K){
            max = Math.max(number,max);
            continue;
        }
        const numberString = number.toString().split('');

        for(let i=0; i<numberString.length-1; i++){
            for(let j=i+1; j<numberString.length; j++){
                if(i === 0 && numberString[j] === '0') continue;
                 let temp = [...numberString];
                 [temp[i],temp[j]] = [temp[j],temp[i]];
                 const nextNumber = parseInt(temp.join(''));
                 if(visited[nextNumber][count+1]) continue;
                 visited[nextNumber][count+1] = true;
                 queue.push([nextNumber,count+1]);
            }
        }
    }
    return console.log(max);
}
bfs(N,K);

