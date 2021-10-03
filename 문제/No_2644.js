// const input = ['9','7 3','7','1 2','1 3','2 7','2 8','2 9','4 5','4 6'];
//const input = ['9','8 6','7','1 2','1 3','2 7','2 8','2 9','4 5','4 6']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = () =>{
    const n = +input[0];
    const [person1,person2] = input[1].split(' ').map(Number);
    const m = +input[2];
    let kinship = Array.from({length:n+1},()=>[]);
    let visited = Array(n+1).fill(false);
    for(let i=0; i<m; i++){
        const [parent,child] = input[i+3].split(' ').map(Number);
        kinship[parent].push(child);
        kinship[child].push(parent);
    }
    const bfs = (person1,person2) =>{
        visited[person1] = true;
        let queue = [[person1,0]];
        while(queue.length){
            const [person,degree] =queue.shift();
            if(person === person2) return console.log(degree);
            
            for(let i=0; i<kinship[person].length; i++){
                const nextPerson = kinship[person][i];
                if(!visited[nextPerson]){
                    visited[nextPerson] = true;
                    queue.push([nextPerson,degree+1]);
                }
            }
        }
       return console.log(-1);
    }
    bfs(person1,person2);
} 
solution();