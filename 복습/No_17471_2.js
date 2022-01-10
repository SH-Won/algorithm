// const input = ['6','5 2 3 4 1 2','2 2 4','4 1 3 6 5','2 4 2','2 1 3','1 2','1 2']
// const input = ['6','1 1 1 1 1 1','2 2 4','4 1 3 6 5','2 4 2','2 1 3','1 2','1 2']
// const input = ['6','10 20 10 20 30 40','0','0','0','0','0','0']
const input = ['6','2 3 4 5 6 7','2 2 3','2 1 3','2 1 2','2 5 6','2 4 6','2 4 5']

// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const findArea = (start,edge,population,visited,group) =>{
     visited[start] = true;
     let queue = [start];
     let sum = 0;
     while(queue.length){
         const area = queue.shift();
         sum += population[area];
         for(let i=0; i<edge[area].length; i++){
             const nArea = edge[area][i];
             for(let j=0; j<group.length; j++){
                 const target = group[j];
                 if(!visited[nArea] && target === nArea){
                    queue.push(nArea);
                    visited[nArea] = true;
                    break;
                 }
             }
         }
     }
     return sum;
}
const divide = (N,edge,population) =>{
    let visited = Array(N).fill(false);
    let firstGroup = [];
    let min = Infinity;
    const makeGruop = (index,count,limit) =>{
        if(count === limit){
            visited.fill(false);
            const secondGroup = Array(N).fill().map((v,i) => i).filter(num => !firstGroup.includes(num));
            const sum1 = findArea(firstGroup[0],edge,population,visited,firstGroup);
            const sum2 = findArea(secondGroup[0],edge,population,visited,secondGroup);
            if(visited.some(area => !area)) return;
            min = Math.min(min , Math.abs(sum1-sum2));
            return;
        }
        for(let i=index; i<N; i++){
           if(N % 2 === 0 && limit === Math.floor(N/2) && count === 0 && i === 1) break;
           firstGroup.push(i);
           makeGruop(i+1,count+1,limit);
           firstGroup.pop();
        }
    }
    for(let i=1; i<=Math.floor(N/2); i++){
        makeGruop(0,0,i);
    }
    return console.log(min);
}
const solution = (input) =>{
    const N = +input[0];
    const population = input[1].split(' ').map(Number);
    const edge = Array.from({length:N},(_,i)=>{
        const [n,...adj] = input[i+2].split(' ').map(num => +num -1);
        return n === -1 ? [] : [...adj];
    })
    let sumArr = [];
    let visited = Array(N).fill(false);
    for(let i=0; i<N; i++){
        if(!visited[i]){
            const sum = findArea(i,edge,population,visited,Array(N).fill().map((v,i) => i));
            sumArr.push(sum);
        }
    }
    switch(sumArr.length){
        case 1 : return divide(N,edge,population);
        case 2 : return console.log(Math.abs(sumArr[0] - sumArr[1]));
        default : return console.log(-1);
    }
}
solution(input);