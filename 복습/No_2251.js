const input = '8 9 10'
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim();

const getAmountC = (A,B,C) =>{
    let amount = Array(C+1).fill(false);
    let visited = Array.from({length:A+1},()=>Array(B+1).fill(false));
    visited[0][0] = true;
    let queue = [[0,0,C]];
    while(queue.length){
        const [a,b,c] = queue.shift();
        if(a === 0) amount[c] = true;
        // a -> b
        if(a+b > B){
           if(!visited[a+b-B][B]){
               visited[a+b-B][B] = true;
               queue.push([a+b-B,B,c]);
           }
        }
        else{
           if(!visited[0][a+b]){
               visited[0][a+b] = true;
               queue.push([0,a+b,c])
           }
        }
        // a->c
        if(a+c > C){
            if(!visited[a+c-C][b]){
                visited[a+c-C][b] = true;
                queue.push([a+c-C,b,C]);
            }
        }
        else{
            if(!visited[0][b]){
                visited[0][b] = true;
                queue.push([0,b,a+c]);
            }
        }
        // b -> a
        if(b+a > A){
            if(!visited[A][b+a-A]){
                visited[A][b+a-A] = true;
                queue.push([A,b+a-A,c]);
            }
        }
        else{
            if(!visited[b+a][0]){
                visited[b+a][0] = true;
                queue.push([b+a,0,c]);
            }
        }
        // b -> c
        if(b+c > C){
            if(!visited[a][b+c-C]){
                visited[a][b+c-C] = true;
                queue.push([a,b+c-C,C]);
            }
        }
        else{
            if(!visited[a][0]){
                visited[a][0] = true;
                queue.push([a,0,b+c]);
            }
        }
        // c -> a
        if(c+a > A){
            if(!visited[A][b]){
                visited[A][b] = true;
                queue.push([A,b,c+a-A]);
            }
        }
        else{
            if(!visited[a+c][b]){
                visited[a+c][b] = true;
                queue.push([a+c,b,0]);
            }
        }
        // c -> b
        if(c+b > B){
            if(!visited[a][B]){
                visited[a][B] = true;
                queue.push([a,B,c+b-B]);
            }
        }
        else{
            if(!visited[a][c+b]){
                visited[a][c+b] = true;
                queue.push([a,c+b,0]);
            }
        }
    }
    return amount;
}
const solution = (input) =>{
    const [A,B,C] = input.split(' ').map(Number);
    const answer = getAmountC(A,B,C).reduce((acc,cur,index) => cur ? acc+=`${index} ` : acc ,"");
    console.log(answer.trim());
}
solution(input);