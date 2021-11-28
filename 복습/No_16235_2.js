// const input =['1 1 1','1','1 1 1'];
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
const [N,M,K] = input[0].split(' ').map(Number);
const A = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
const dy = [-1,-1,-1,0,0,1,1,1];
const dx = [-1,0,1,-1,1,-1,0,1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
const solution = (K) =>{
    let field = Array.from({length:N}, ()=>Array.from({length:N},()=>[]));
    let nutrients = Array.from({length:N},()=>Array(N).fill(5));
    for(let i=0; i<M; i++){
        const [y,x,age] = input[i+N+1].split(' ').map(Number);
        field[y-1][x-1].push(age);
    }
    
    const spring_summer = () =>{
        for(let y=0; y<N; y++){
            for(let x=0; x<N; x++){
                if(field[y][x].length){
                    field[y][x].sort((a,b)=>a-b);
                    let length = field[y][x].length;
                    let i=0;
                    
                    while(nutrients[y][x] >= field[y][x][i] && length--){
                        nutrients[y][x]-=field[y][x][i];
                        field[y][x][i]++;
                        i++;
                    }
                    while(length--){
                        const age = field[y][x].pop();
                        nutrients[y][x]+=Math.floor(age/2);
                    }
                }
            }
        }
    }
    const autumn_winter = () =>{
        for(let y=0; y<N; y++){
            for(let x=0; x<N; x++){
                if(field[y][x].length){
                    for(let i=0; i<field[y][x].length; i++){
                        const age = field[y][x][i];
                        if(age % 5 !==0) continue;
                        for(let dir=0; dir<8; dir++){
                            const [ny,nx] = [y+dy[dir],x+dx[dir]];
                            if(!isValidPos(ny,nx)) continue;
                            field[ny][nx].push(1);
                        }
                    }
                }
                nutrients[y][x] +=A[y][x];
            }
        }
    }

    while(K--){
        spring_summer();
        autumn_winter();
        
    }
    const tree = field.reduce((acc,cur)=>acc+=cur.reduce((acc,cur) => acc+=cur.length ,0),0);
    console.log(tree);
}
solution(K);