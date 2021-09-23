//const input = ['6','5 2 3 4 1 2','2 2 4','4 1 3 6 5','2 4 2','2 1 3','1 2','1 2']
//const input = ['6','1 1 1 1 1 1','2 2 4','4 1 3 6 5','2 4 2','2 1 3','1 2','1 2']
//const input = ['6','10 20 10 20 30 40','0','0','0','0','0','0']
//const input = ['6','2 3 4 5 6 7','2 2 3','2 1 3','2 1 2','2 5 6','2 4 6','2 4 5'];
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let index = 0;
const N = +input[index++];
const population = [0,...input[index++].split(' ').map(Number)];
const adjacent = Array.from({length:N+1},()=>[]);
let visited =Array(N+1).fill(false);
for(let i=1; i<=N; i++){
    const array = input[index++].split(' ').map(Number);
    for(let j=1; j<array.length; j++){
        adjacent[i].push(array[j]);
    }
}

// const subPopulation = (firstGroup,secondGroup) =>{
//     const sum1 = firstGroup.reduce((acc,cur)=>acc+=population[cur],0);
//     const sum2 = secondGroup.reduce((acc,cur)=>acc+=population[cur],0);
//     return Math.abs(sum1-sum2);
// }

const bfs = (start,group) =>{
    let queue = [start];
    visited[start] = true;
    let sum = 0;
    if(group.length ===1) return population[start];
    while(queue.length){
        const cArea = queue.shift();
        sum+=population[cArea];
       
        for(let i=0; i<adjacent[cArea].length; i++){
            const nArea = adjacent[cArea][i];
            let flag = false;
            for(let j=0; j<group.length; j++){
                const target = group[j];
                if(visited[target]) continue;
                if(target === nArea){
                    flag = true;
                    break;
                }
            }
            if(flag && !visited[nArea]){
                visited[nArea] = true;
                queue.push(nArea);
            }
        }
      
        
        // 2    1 2 6 
    }
    return sum;
}
const divide = () => {
    let firstGroup ;
    let min = Infinity;
    
    const getSecondGroup = (firstGroup) =>{
        let secondGroup = [];
        for(let i=1; i<=N; i++){
            let index = firstGroup.indexOf(i);
            if(index !==-1)  continue;
            secondGroup.push(i);
        }
        return secondGroup;
    }
    const combination = (count,limit,index) =>{
        if(count === limit){
            const secondGroup = getSecondGroup(firstGroup);
            visited.fill(false);
            visited[0] =true;
            const sum1 = bfs(firstGroup[0],firstGroup);
            const sum2 = bfs(secondGroup[0],secondGroup);
            
            if(visited.some(boolean => boolean === false)) return;
             visited.fill(false);
             visited[0] =true;
            
            return min = Math.min(min,Math.abs(sum1-sum2));
        }
    
        for(let i=index; i<=N; i++){
            if( N % 2 === 0 && limit === Math.floor(N/2) && count===0 && i===2) break;
            firstGroup[count] = i;
            combination(count+1,limit,i+1);
            
        }

    }
    for(let i=1; i<=Math.floor(N/2); i++){
        firstGroup = Array(i);
        combination(0,i,1);
        
    }
    return console.log(min);
}

const solution = () =>{
    let array = Array(N).fill(0).map((num,index)=> num=index+1);
    let sumArray = [];
    for(let i=1; i<=N; i++){
        if(!visited[i]){
            const sum = bfs(i,array);
            sumArray.push(sum);
        }
    }
    
    visited.fill(false);
    visited[0] = true;
    switch(sumArray.length){
        case 1 : return divide();
        case 2 : return console.log(Math.abs(sumArray[0]-sumArray[1]));
        default : return console.log(-1);
    }
}
solution();
