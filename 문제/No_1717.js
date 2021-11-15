
// const input = ['7 8','0 1 3','1 1 7','0 7 6','1 7 1','0 3 7','0 4 2','0 1 1','1 1 1'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const a = 1;
const b = 1;
console.log(a>b ? 1 : 2);
const getParent = (parent,i) =>{
    if(parent[i] === i) return i;
    return parent[i] = getParent(parent,parent[i]);

}
const findParent = (parent,a,b) =>{
    a = getParent(parent,a);
    b = getParent(parent,b);
    return a === b ? true : false;
}
const unionParent = (parent,a,b) =>{
    a = getParent(parent,a);
    b = getParent(parent,b);
    parent[b] = a;
}

const solution = (input) =>{
    const [n,m] = input[0].split(' ').map(Number);
    const command = Array.from({length:m},(_,i)=>input[i+1].split(' ').map(Number));
    let parent = Array.from({length:n+1},(_,i)=> i );
    let answer = "";
    for(let i=0; i<m; i++){
        const [c,a,b] = command[i];
        if(c === 0 ){
            unionParent(parent,a,b);
        } 
        else {
            const isUnion = findParent(parent,a,b);
            isUnion ? answer+=`YES\n` : answer+=`NO\n`
        }
    }
    console.log(answer.trim());
    console.log(parent);
}


const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
const input = [];
rl.on("line",(line)=> input.push(line))
.on("close",()=>{
    solution(input);
    process.exit();
});




