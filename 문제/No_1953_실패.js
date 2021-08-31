//const input = ['5','1 3','1 5','2 1 4','1 3','1 2'];
const input =['4','1 2','1 1','1 1','1 1'];
//const input =['4','1 3','1 4','1 4','0']
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const inputArr = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(num =>+num));
let personArr = Array.from({length:N+1},()=>[]);
for(let i=0; i<inputArr.length; i++){
    personArr[i+1].push(...inputArr[i].slice(1))
}
let visited = Array(N+1).fill(false);
let team1 = [1];
let team2 = [];
console.log(personArr);
//visited[1]=true;
dfs(1);
console.log(team1);
console.log(team2)


function dfs(person){

    if(!team1.includes(person)){
        
    }
    
    for(let i=0; i<personArr[person].length; i++){
        const hatePerson = personArr[person][i];
       
        if(!visited[hatePerson]){
         team2.push(hatePerson);
        visited[hatePerson]=true;
        }
    }

    for(let i=1; i<=N; i++){
        if(!visited[i]){
            dfs(i);
        }

    }
    
    
}