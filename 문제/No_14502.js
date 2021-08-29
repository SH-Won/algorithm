// const input =[
//     '7 7',
// '2 0 0 0 1 1 0',
// '0 0 1 0 1 2 0',
// '0 1 1 0 1 0 0',
// '0 1 0 0 0 0 0',
// '0 0 0 0 0 1 1',
// '0 1 0 0 0 0 0',
// '0 1 0 0 0 0 0'
// ]
// const input =[
//     '4 6',
// '0 0 0 0 0 0',
// '1 0 0 0 0 2',
// '1 1 1 0 0 2',
// '0 0 0 0 0 2',

// ]
const input =[
    '8 8',
'2 0 0 0 0 0 0 2',
'2 0 0 0 0 0 0 2',
'2 0 0 0 0 0 0 2',
'2 0 0 0 0 0 0 2',
'2 0 0 0 0 0 0 2',
'0 0 0 0 0 0 0 0',
'0 0 0 0 0 0 0 0',
'0 0 0 0 0 0 0 0',
]
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(num => +num);
let lab = Array.from({length:N},(_,i)=>input[i+1].split(' '));
const virusPos = [];
for(let i=0; i<N; i++){
    for(let j=0; j<M; j++){
        if(lab[i][j] ==='2') virusPos.push([i,j]);
    }
}


let maxSafety = 0;
buildWall(0,3);
console.log(maxSafety)


function buildWall(index,count){
   
    if(count === 0){
         let copyLab = Array.from({length:N},()=>Array(M));
         for(let i=0; i<N; i++){
             for(let j=0; j<M; j++){
                 copyLab[i][j] = lab[i][j];
             }
         }

        
        let newLab = spreadVirus(copyLab);
        let count = checkSafty(newLab);
        
        maxSafety = Math.max(maxSafety,count);
        
       return;
    }
    
    
       for(let i=index; i<M*N; i++){
           const [y,x] = [Math.floor(i/M), i % M];
         
           if(lab[y][x] !=='0') continue;
           
           lab[y][x] ='1'
           //const nextLab = [...curLab];
           
           buildWall(i+1,count-1);           
          // console.log(lab);
          //console.log(curLab);
          lab[y][x] ='0';

        }
    
    function spreadVirus(checkLab){
        
        let queue = [...virusPos];
        const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
        const distance = [[1,0],[-1,0],[0,1],[0,-1]];
        while(queue.length){
            const [cy,cx] = queue.shift();
            
            distance.forEach(([my,mx])=>{
                const [ny,nx] =[cy+my,cx+mx];
                if(!isValidPos(ny,nx) || checkLab[ny][nx] !== '0') return;
                queue.push([ny,nx]);
                checkLab[ny][nx] = '2';
            })
    
        }
        return checkLab;
    
    }
    function checkSafty(labArr){
        let count =0;
        for(let i=0; i<N; i++){
            for(let j=0; j<M; j++){
                if(labArr[i][j] ==='0') count++;
            }
        }
        
        return count;
    }

}

