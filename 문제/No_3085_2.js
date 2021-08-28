//const input = ['3','CCP','CCP','PPC'];
// const input =['4','PPPP','CYZY','CCPY','PPCC']
//const input =['5','YCPZY','CYZZP','CCPPP','YCYZC','CPPZZ']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input[0];
let candy = Array.from({length:N},(_,i)=>input[i+1].split(''));

const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
const distance = [[1,0],[-1,0],[0,1],[0,-1]];
let answer =0;
for(let y=0; y<N; y++){
    for(let x=0; x<N; x++){
        
        distance.forEach(([my,mx])=>{
            const [ny,nx] = [y+my,x+mx];
            if(!isValidPos(ny,nx) || candy[ny][nx] === candy[y][x]) return;
            let max = swap(y,x,ny,nx)
            answer = Math.max(answer,max);
        })
    }
}
console.log(answer);

function swap(cy,cx,ny,nx){
    [candy[cy][cx],candy[ny][nx]] = [candy[ny][nx],candy[cy][cx]];
    let max = maxCandy(candy);
    [candy[cy][cx],candy[ny][nx]] = [candy[ny][nx],candy[cy][cx]];
    return max;
}
function maxCandy(candyMatrix){
    let max = 0;
    let count =1;
    for(let y=0; y<N; y++){
        for(let x=1; x<N; x++){
            if(candyMatrix[y][x] === candyMatrix[y][x-1]){
                count++;
            }
            else{
                max = Math.max(max,count);
                count =1;
            }
        }
        max=Math.max(max,count);
        count =1;
    }
    for(let x=0; x<N; x++){
        for(let y=1; y<N; y++){
            if(candyMatrix[y][x] === candyMatrix[y-1][x]){
                count++
            }
            else{
                max=Math.max(max,count);
                count =1;
            }
        }
        max=Math.max(max,count);
            count =1;
        
    }
    return max;

}

