//const input = ['4 3','0','2 1 2','1 3','3 2 3 4'];
//const input = ['4 0','1 1','4 1 2 3 4']
//const input = ['4 1','1 1','4 1 2 3 4']
//const input = ['4 5','1 1','1 1','1 2','1 3','1 4','2 4 1'];
//const input = ['10 9','4 1 2 3 4','2 1 5','2 2 6','1 7','1 8','2 7 8','1 9','1 10','2 3 10','1 4'];
//const input = ['8 5','3 1 2 7','2 3 4','1 5','2 5 6','2 6 8','1 8']
//const input = ['3 4','1 3','1 1','1 2','2 1 2','3 1 2 3'];
//const input = ['6 5','1 6','2 4 5','2 1 2','2 2 3','2 3 4','2 5 6']  //ans 0;
//                            4       1       2       3        5    
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = () =>{
    let index = 0;
    let count = 0;
    let check ;
    const [N,M] = input[index++].split(' ').map(Number);
    const truth = input[index++].split(' ').map(Number).slice(1);
    const party = Array.from({length:M},()=>input[index++].split(' ').map(Number).slice(1));
    let parent = Array(N+1).fill(0).map((num,index)=> num = index);
    const getParent = (parent,i) =>{
        if(parent[i] === i) return i;
        return parent[i] = getParent(parent,parent[i]);
    }
    const unionParent = (parent,a,b) =>{
        a = getParent(parent,a);
        b = getParent(parent,b);
        a < b ? parent[b] = a : parent[a] = b;
    }
    const findParent = (parent,a,b) =>{
        a = getParent(parent,a);
        b = getParent(parent,b);
        return a===b ? true : false;
    }
    for(let i=0; i<party.length; i++){
        for(let j=0; j<party[i].length-1; j++){
             const [a,b] = [party[i][j],party[i][j+1]];
             unionParent(parent,a,b);
        }
    }
    for(let i=0; i<party.length; i++){
        for(let j=0; j<party[i].length; j++){
            check = false;
            const person2 = party[i][j];
            for(let k=0; k<truth.length; k++){
                const person1 = truth[k];
                if(findParent(parent,person1,person2)){
                    count++;
                    check = true;
                    break;
                }
            }
            if(check) break;
        }
    }
    console.log(M-count);
}
solution();