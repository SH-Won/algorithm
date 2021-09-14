//const input =['1 1 1','1','1 1 1'];
//const input =['5 2 1','2 3 2 3 2','2 3 2 3 2','2 3 2 3 2','2 3 2 3 2','2 3 2 3 2','2 1 3','3 2 3']
// const input =[
//     '5 2 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 1 3',
// '3 2 3',
// ]
// const input =[
//     '5 2 3',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 1 3',
// '3 2 3',
// ]
// const input =[
//         '5 2 4',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 1 3',
// '3 2 3',
// ]
// const input =[
//     '5 2 6',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 3 2 3 2',
// '2 1 3',
// '3 2 3',
// ]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let index = 0;
const [N,M,K] = input[index++].split(' ').map(num =>+num);
const nutrients = Array.from({length:N},()=>input[index++].split(' ').map(num =>+num));
const treeInfo = Array.from({length:M},()=>input[index++].split(' ').map(num =>+num));
const groundNutrients =Array.from({length:N},()=>Array(N).fill(5));
treeFinance(groundNutrients,K);
function treeFinance(groundNutrients,K){
    let tree = Array.from({length:N},()=>Array.from({length:N},()=>[]));
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
    const distance = [[1,0],[-1,0],[0,1],[0,-1],[-1,-1],[-1,1],[1,-1],[1,1]];
    for(let i=0; i<M; i++){
        const [y,x,age] = treeInfo[i];
        tree[y-1][x-1].push({age});
    }
    const spring_summer = ()=>{
        for(let y=0; y<N; y++){
            for(let x=0; x<N; x++){
                if(tree[y][x].length){
                    tree[y][x].sort((a,b)=>a.age-b.age);
                   
                    let length = tree[y][x].length;
                    for(let i=0; i<tree[y][x].length; i++){
                        const {age} = tree[y][x][i];
                        if(age > groundNutrients[y][x]) break;
                        groundNutrients[y][x]-= age;
                        tree[y][x][i].age++;
                        length --;
                    }
                    while(length--){
                        const {age} = tree[y][x].pop();
                        groundNutrients[y][x]+=Math.floor(age/2);
                    }
                }
            }
        }
    }
    const fall_winter = () =>{
        for(let y=0; y<N; y++){
            for(let x=0; x<N; x++){
                if(tree[y][x].length){
                    const length = tree[y][x].length;
                    for(let i=0; i<length; i++){
                        const {age} = tree[y][x][i];
                        if(age % 5 !==0) continue;
                        distance.forEach(([my,mx])=>{
                            const [ny,nx] = [y+my,x+mx];
                            if(!isValidPos(ny,nx)) return;
                            tree[ny][nx].push({age:1});
                        })
                    }
                }
            }
        }

        for(let y=0; y<N; y++){
            for(let x=0; x<N; x++){
                groundNutrients[y][x] += nutrients[y][x];
            }
        }

    }

    while(K--){
        spring_summer();
        fall_winter();
    }

    const treeNumber = tree.reduce((acc,cur)=>{
         return acc+=cur.reduce((acc,cur)=> acc+=cur.length ,0);
    },0)
    
    return console.log(treeNumber);
}