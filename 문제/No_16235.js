//const input =['1 1 4','1','1 1 1'];
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
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let index=0;
const [N,M,K] = input[index++].split(' ').map(num =>+num);
const nutrients = Array.from({length:N},()=>input[index++].split(' ').map(num => +num));
const treeInfo = Array.from({length:N},()=>Array.from({length:N},()=>[]));
const groundNutrients = Array.from({length:N},()=>Array(N).fill(5));

for(let i=0; i<M; i++){
    let [y,x,age] = input[index++].split(' ').map(num => +num);
    
   treeInfo[y-1][x-1].push({age});
    
}

const treeFinance = (treeInfo,curNutrients,K) =>{
     const distance = [[1,0],[-1,0],[0,1],[0,-1],[-1,-1],[-1,1],[1,-1],[1,1]];
     const isValidPos =(y,x)=>(y>=0 && x>=0 && y<N && x<N);
     //let bredTree = Array.from({length:N},()=>Array.from({length:N},()=>[]));
    //봄에는 나무가 자신의 나이만큼 양분을 먹고 나이 +1 증가한다.
     const breed = () =>{
         for(let cy=0; cy<N; cy++){
             for(let cx=0; cx<N; cx++){
                 if(treeInfo[cy][cx].length !==0){
                   for(let i=0; i<treeInfo[cy][cx].length; i++){
                       const {age} = treeInfo[cy][cx][i];
                       if(age % 5 ===0){
                           for(let j=0; j<distance.length; j++){
                               const [ny,nx] = [cy+distance[j][0],cx+distance[j][1]];
                               if(!isValidPos(ny,nx)) continue;
                               treeInfo[ny][nx].push({age:1});
                           }
                       }
                   }  
                    
                 }
             }
         }
     }
     const addNutrients = ()=>{
         for(let y=0; y<N; y++){
             for(let x=0; x<N; x++){
                 curNutrients[y][x] +=nutrients[y][x];
             }
         }
     }
     //1년마다
     while(K--){
         //봄,여름
         for(let cy=0; cy<N; cy++){
             for(let cx=0; cx<N; cx++){
                 if(treeInfo[cy][cx].length !==0){
                     let length = treeInfo[cy][cx].length;
                     
                     treeInfo[cy][cx].sort((a,b)=>a.age-b.age);
                     
                     for(let i=0; i<treeInfo[cy][cx].length; i++){
                         const {age} = treeInfo[cy][cx][i];
                         if( age > curNutrients[cy][cx]){
                              break;
                         }
                         curNutrients[cy][cx]-=age;
                         treeInfo[cy][cx][i].age +=1
                         length--;
                     }
                     while(length--){
                         const {age} = treeInfo[cy][cx].pop();
                         curNutrients[cy][cx] += Math.floor(age/2);
                     }
                 }

             }
         }
         //가을
         breed();
         //겨울
         addNutrients();
     }
     let sum = treeInfo.reduce((acc,cur)=>{
         return acc+=cur.reduce((acc,cur)=>acc+=cur.length,0);
     },0)
    
     return console.log(sum);
}
treeFinance(treeInfo,groundNutrients,K);


