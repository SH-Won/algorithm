// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const input=[
    '2','10 8 17','0 0','1 0','1 1','4 2','4 3','4 5',
    '2 4','3 4','7 4','8 4','9 4','7 5','8 5','9 5',
    '7 6','8 6','9 6','10 10 1','5 5']
let index =0;
let T = +input[index++];

while(T--){
    let [column,row,carbageCount] = stringToNumArr(input[index++]);
    let yard = Array.from({length:row},() =>Array(column).fill(0))
    let count =0;
    while(carbageCount--){
        const [x,y]= stringToNumArr(input[index++]);
        yard[y][x] = 1;
    }
    for(let i=0; i<yard.length; i++){
        let index = -1;
        while(true){
        index = yard[i].indexOf(1,index+1);
        if(index === -1) break;
        bfs(i,index);
        count++;
        }
      
    }
    console.log(count);

    function bfs(y,x){
        let queue = [[y,x]];

        while(queue.length){
            const [curY,curX] = queue.shift();
            
            [[curY+1,curX],[curY-1,curX],[curY,curX+1],[curY,curX-1]]
            .forEach(([y,x])=>{
                if(y<0 || x<0 || y>=row || x>=column) return;
                if(yard[y][x]){
                    queue.push([y,x]);
                    yard[y][x]=0;
                }
            })
            
        }
    }
}


function stringToNumArr(arr){
    return arr.split(' ').map(num=>+num);
}