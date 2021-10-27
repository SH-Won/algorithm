//const fs = require('fs');
//const [A,B,C] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);
const [A,B,C] = [8,9,10];
let visited = Array.from({length:A+1},()=>Array(B+1).fill(false));

const bfs = (A,B,C) =>{
    visited[0][0] = true;
    let queue = [[0,0,C]];
    let water = Array(C+1).fill(false);
    while(queue.length){
        const [a,b,c] = queue.shift();
        if(a === 0) water[c] = true;
        // a -> b
        if(a+b > B ){
            if(!visited[a+b-B][B]){
            visited[a+b-B][B] = true;
            queue.push([a+b-B,B,c]);
            }
        }
        else{
            if(!visited[0][a+b]){
                visited[0][a+b] = true;
                queue.push([0,a+b,c]);
            }
        }
        
        // b -> a
        if(b+a > A ) {
            if(!visited[A][b+a-A]){
            visited[A][b+a-A] = true;
            queue.push([A,b+a-A,c]);
            }
        }
        else{
            if(!visited[a+b][0]){
                visited[a+b][0] = true;
                queue.push([a+b,0,c]);
            }
        }

        // c -> a
        if(a+c > A ){
            if(!visited[A][b]){
            visited[A][b] = true;
            queue.push([A,b,a+c-A]);
            }
        }
        else{
            if(!visited[a+c][b]){
                visited[a+c][b] = true;
                queue.push([a+c,b,0]);
            }
        }
        // c -> b
        if(b+c > B ){
            if(!visited[a][B]){
            visited[a][B] = true;
            queue.push([a,B,b+c-B]);
            }
        }
        else{
            if(!visited[a][b+c]){
                visited[a][b+c] = true;
                queue.push([a,b+c,0]);
            }
        }
        // a -> c
        if(!visited[0][b]){
            visited[0][b] = true;
            queue.push([0,b,a+c]);
        }
         // b -> c
         if(!visited[a][0]){
            visited[a][0] = true;
            queue.push([a,0,b+c]);
        }
    }
    let answer = "";
    for(let i=0; i<water.length; i++){
        if(water[i]) answer+=`${i} `;
    }
    console.log(answer);
}
bfs(A,B,C);