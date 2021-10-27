const nine = [20,7,23,19,10,15,25,8,13]
//const fs =require('fs');
//const nine = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);
let seven = Array(7);

const dfs = (index,count,sum) =>{
    if(sum > 100) return;
    if(count === 7){
        if(sum === 100) process.exit(console.log(seven.sort((a,b)=>a-b).join('\n')));
        return
    }
    for(let i=index; i<9; i++){
        if(count === 0 && i===3) break;
        const nextSum = sum + nine[i];
        seven[count] = nine[i];
        dfs(i+1,count+1,nextSum);
    }
}
dfs(0,0,0);
