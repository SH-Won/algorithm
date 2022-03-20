// const input = ['3','2 2 2','4 4 4','8 8 8']
// const input = ['3','2 2 2','2 2 2','2 2 2'] //ans8
// const input =[
// '10',
// '16 16 8 32 32 0 0 8 8 8',
// '16 0 0 0 0 8 0 0 0 16',
// '0 0 0 0 0 0 0 0 0 2',
// '0 0 0 0 0 0 0 0 0 0',
// '0 0 0 0 0 0 0 0 0 0',
// '0 0 0 0 0 0 0 0 0 0',
// '0 0 0 0 0 0 0 0 0 0',
// '0 0 0 0 0 0 0 0 0 0',
// '0 0 0 0 0 0 0 0 0 0',
// '0 0 0 0 0 0 0 0 0 0'
// ] //ans64
// const input = [
// '5',
// '2 2 4 8 16',
// '0 0 0 0 0',
// '0 0 0 0 0',
// '0 0 0 0 0',
// '2 2 4 8 16',
// ]  //ans 64
// const input = [
// '7',
// '2 2 2 2 2 2 2',
// '2 0 2 2 2 2 2',
// '2 0 2 2 2 2 2',
// '2 0 2 2 2 2 2',
// '2 2 2 0 2 2 2',
// '2 2 2 2 2 2 0',
// '2 2 2 2 2 2 0',
// ] //ans 32
// const input = [
// '10',
// '0 0 64 32 32 0 0 0 0 0',
// '0 32 32 64 0 0 0 0 0 0',
// '0 0 128 0 0 0 0 0 0 0',
// '64 64 128 0 0 0 0 0 0 0',
// '0 0 64 32 32 0 0 0 0 0',
// '0 32 32 64 0 0 0 0 0 0',
// '0 0 128 0 0 0 0 0 0 0',
// '64 64 128 0 0 0 0 0 0 0',
// '128 32 2 4 0 0 0 0 0 0',
// '0 0 128 0 0 0 0 0 0 0',
// ] //ans 1024
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getMaxBlock = (dirArr,map) =>{
    const [LEFT,RIGHT,UP,DOWN] = [0,1,2,3];
    for(let i=0; i<dirArr.length; i++){
        const dir = dirArr[i];
        if(dir === LEFT){
            for(let y=0; y<map.length; y++){
                const row = map[y].filter(el => el);
                let idx = 0 , x = 0;
                while(idx < row.length){
                    if(row[idx] === row[idx+1]){
                        map[y][x] = row[idx] * 2;
                        idx+=2 , x++;
                    }
                    else{
                        map[y][x] = row[idx];
                        idx++ , x++;
                    }
                }
                while(x < map[y].length) map[y][x++] = 0;
            }
        }
        else if(dir === RIGHT){
            for(let y=0; y<map.length; y++){
                const row = map[y].filter(el => el).reverse();
                let idx = 0 , x = map[y].length - 1;
                while(idx < row.length){
                    if(row[idx] === row[idx+1]){
                        map[y][x] = row[idx] * 2;
                        idx+=2 , x--;
                    }
                    else{
                        map[y][x] = row[idx];
                        idx++ , x--;
                    }
                }
                while(x >= 0) map[y][x--] = 0;
            }
        }
        else if(dir === UP){
            for(let x=0; x<map[0].length; x++){
                const column = map.map(row => row[x]).filter(el => el);
                let idx = 0 , y = 0;
                while(idx < column.length){
                    if(column[idx] === column[idx+1]){
                        map[y][x] = column[idx] * 2;
                        idx+=2 , y++;
                    }
                    else{
                        map[y][x] = column[idx];
                        idx++, y++;
                    }
                }
                while(y < map.length) map[y++][x] = 0;
            }
        }
        else if(dir === DOWN){
            for(let x=0; x<map[0].length; x++){
                const column = map.map(row => row[x]).filter(el => el).reverse();
                let idx = 0 , y = map.length - 1;
                while(idx < column.length){
                    if(column[idx] === column[idx+1]){
                        map[y][x] = column[idx] * 2;
                        idx+=2 , y--;
                    }
                    else{
                        map[y][x] = column[idx];
                        idx++, y--;
                    }
                }
                while(y >= 0) map[y--][x] = 0;
            }
        }
    }
    return Math.max(...map.flat())
}
const solution = input =>{
    const N = +input[0];
    const map = Array.from({length:N},(_,i) => input[i+1].split(' ').map(Number));
    let max = 0;
    let dirArr = Array(5);
    const makeDir = (count) => {
         if(count === 5){
            const copyMap = map.map(row => [...row]);
            max = Math.max(max,getMaxBlock(dirArr,copyMap));
            return ;
         }
         for(let i=0; i<4; i++){
            dirArr[count] = i;
             makeDir(count+1);
         }
    }
    makeDir(0);
    console.log(max);
}
solution(input);