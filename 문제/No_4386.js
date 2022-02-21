// const input = ['3','1.0 1.0','2.0 2.0','2.0 4.0']
const input = ['6','4 1','5 8','2 1','8 4','2 9','1 4'];
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getParent = (parent,x) =>{
    if(parent[x] === x) return x;
    return parent[x] = getParent(parent,parent[x]);
}
const findParent = (parent,a,b) =>{
    a = getParent(parent,a);
    b = getParent(parent,b);
    return a === b;
}
const unionParent = (parent,a,b) =>{
    a = getParent(parent,a);
    b = getParent(parent,b);
    a < b ? parent[b] = a  : parent[a] = b;
}

const solution = input =>{
     const n = +input[0];
     const stars = Array.from({length:n},(_,i) => input[i+1].split(' ').map(Number));
     const path = [];
     for(let i=0; i<stars.length-1; i++){
        const [x1,y1] = stars[i];
         for(let j=i+1; j<stars.length; j++){
             const [x2,y2] = stars[j];
             const distance = Math.sqrt(Math.abs(x1-x2)**2 + Math.abs(y1-y2)**2);
             path.push({from:i,to:j,distance});
         }
     }
     path.sort((a,b) => a.distance - b.distance);
     let parent = Array(n).fill().map((v,i) => i);
     let answer = 0;
     for(let i=0; i<path.length; i++){
         const {from,to,distance} = path[i];
         if(!findParent(parent,from,to)){
             answer += distance;
             unionParent(parent,from,to);
         }
     }
     console.log(answer.toFixed(2));
}
solution(input);