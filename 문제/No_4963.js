const input =[
    '1 1',
'0',
'2 2',
'0 1',
'1 0',
'3 2',
'1 1 1',
'1 1 1',
'5 4',
'1 0 1 0 0',
'1 0 0 0 0',
'1 0 1 0 1',
'1 0 0 1 0',
'5 4',
'1 1 1 0 1',
'1 0 1 0 1',
'1 0 1 0 1',
'1 0 1 1 1',
'5 5',
'1 0 1 0 1',
'0 0 0 0 0',
'1 0 1 0 1',
'0 0 0 0 0',
'1 0 1 0 1',
'0 0',
]

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let inputIndex = 0;
let answer ='';
while(1){
    const [w,h] = input[inputIndex++].split(' ').map(num => +num);
    if(w === 0 && h===0) break;
    
    let map =Array.from({length:h},()=>input[inputIndex++].split(' '));
    const isValidPos =(y,x) => (y >=0 && x>=0 && y<h && x<w);
    const distance = [[1,0],[-1,0],[0,1],[0,-1],[-1,1],[-1,-1],[1,1],[1,-1]];
    let count =0;
    for(let i=0; i<h; i++){
        for(let j=0; j<w; j++){
            if(map[i][j] ==='1'){
                count++;
                dfs(i,j);
            }
        }
    }
    function dfs(y,x){
        map[y][x] = '2';
        distance.forEach(([my,mx])=>{
              const [ny,nx] = [y+my,x+mx];
              if(!isValidPos(ny,nx) || map[ny][nx] !=="1") return
              dfs(ny,nx);
        })
    }
    answer+=`${count}\n`
   
    

}
console.log(answer.trim());