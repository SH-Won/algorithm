const input = ['6','5 2 3 4 1 2','2 2 4','4 1 3 6 5','2 4 2','2 1 3','1 2','1 2']
//const input = ['6','1 1 1 1 1 1','2 2 4','4 1 3 6 5','2 4 2','2 1 3','1 2','1 2']
//const input = ['6','10 20 10 20 30 40','0','0','0','0','0','0']
//const input = ['6','2 3 4 5 6 7','2 2 3','2 1 3','2 1 2','2 5 6','2 4 6','2 4 5'];

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = () =>{
    const N = +input[0];
    const population = [0,...input[1].split(' ').map(Number)];
    const adj = Array.from({length:N+1},()=>[]);
    let visited = Array(N+1).fill(false);
    
    for(let i=1; i<=N; i++){
       const area = input[i+1].split(' ').map(Number);
       for(let j=1; j<area.length; j++){
           adj[i].push(area[j]);
       }
    }
    const resetVisit = () =>{
        visited.fill(false);
        visited[0] = true;
    }

    const bfs =(start,group)=>{
        
        
        visited[start] = true;
        if(group.length === 1) return population[start];
        let sum = 0;
        let queue = [start];
        while(queue.length){
            const cArea = queue.shift();
            sum+=population[cArea];
            for(let i=0; i<adj[cArea].length; i++){
                const nArea = adj[cArea][i];
                let flag = false;
                for(let j=0; j<group.length; j++){
                    const target = group[j];
                    if(!visited[target] && target === nArea){
                        flag = true;
                        break;
                    } 
                }
                if(flag){
                    visited[nArea] = true;
                    queue.push(nArea);
                }
            }
        }
        return sum;
    }
    
    const divide = () =>{
        let firstGroup ;
        let min = Infinity;
        
        const getSecondGroup = (firstGroup) =>{
            let secondGroup = [];
            for(let i=1; i<=N; i++){
                let index = firstGroup.indexOf(i);
                if(index !==-1) continue;
                secondGroup.push(i);
            }
           return secondGroup;
        }
        const dfs = (count,limit,index) =>{
            if(count === limit){ 
                const secondGroup = getSecondGroup(firstGroup);
                const firstSum = bfs(firstGroup[0],firstGroup);
                const secondSum = bfs(secondGroup[0],secondGroup);
                if(visited.some(area => !area)) return resetVisit();
                min = Math.min(min,Math.abs(firstSum - secondSum));
                return resetVisit();
            }
            for(let i=index; i<=N; i++){
                if( N % 2 === 0 && limit === Math.floor(N/2) && count===0 && i===2) break;
                firstGroup[count] = i;
                dfs(count+1,limit,i+1);
            }
        }

        for(let i=1; i<=Math.floor(N/2); i++){
            firstGroup=Array(i);
            dfs(0,i,1);
        }
       return console.log(min);
    }
    
    const init = () =>{
    let group = Array(N).fill(0).map((num,index)=>num = index+1);
    let sumArr = [];
    for(let i=1; i<=N; i++){
        if(!visited[i]){
            const sum = bfs(i,group);
            sumArr.push(sum);
        }
     }
     resetVisit();
     switch(sumArr.length){
         case 1 : return divide();
         case 2 : return console.log(Math.abs(sumArr[0]-sumArr[1]));
         default : return console.log(-1);
     }
   }
   init();
}
solution();