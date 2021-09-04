const [N,K] = [300,2];
//const fs = require('fs');
//const [N,K] =fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(num =>+num);

const bfs = (N,K) =>{
    if(N <=10) return -1
    // const swap = (array,one,another) =>{
    //     let temp = [...array];
    //     [temp[one],temp[another]] = [temp[another],temp[one]];
    //     return temp;
    // }
    let visited = Array.from({length:1000001},()=>Array(K+1).fill(false));
    let queue =[[N,0]];
    let maxNumber = -1;
    while(queue.length){
        
        const [number,count] = queue.shift();
        if(count === K){
            if(number > maxNumber) maxNumber = number;
            continue;
        }
        const division = number.toString().split('')
        
        for(let i=0; i<division.length-1; i++){
            for(let j=i+1; j<division.length; j++){
                let temp = [...division];
                [temp[i],temp[j]]  = [temp[j],temp[i]]; 
                if(temp[0] ==='0') continue; 
                const swapNumber = parseInt(temp.join(''))
                temp =null;
                if(visited[swapNumber][count+1]) continue;
                visited[swapNumber][count+1] = true;
                queue.push([swapNumber,count+1]);

            }
        }

    }
    return maxNumber;
}
const answer = bfs(N,K);
console.log(answer);