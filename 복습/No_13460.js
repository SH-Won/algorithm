// const input = [
// '10 6',
// '######',
// '#BO.##',
// '#...##',
// '###.##',
// '##...#',
// '###..#',
// '###R##',
// '#.#..#',
// '##.#.#',
// '######',
// ] //ans2
// const input = [
// '5 9',
// '#########',
// '#.##....#',
// '#..R..###',
// '#O#B##..#',
// '#########',
// ] //ans 2
// const input = [
//     '8 7',
//     '#######',
//     '##.####',
//     '#.##.B#',
//     '##...R#',
//     '###..O#',
//     '##..#.#',
//     '#####.#',
//     '#######',
// ] //ans 6
// const input =[
// '9 9',
// '#########',
// '##.R..###',
// '##..#####',
// '###.#.#.#',
// '##.B#.#.#',
// '#.....###',
// '#.O..#.##',
// '###..####',
// '#########',
// ] //ans2
// const input = [
// '7 5',
// '#####',
// '###O#',
// '#...#',
// '##.##',
// '##..#',
// '#.BR#',
// '#####',
// ] //ans4
// const input = [
//     '6 10',
// '##########',
// '##O..#..##',
// '#.#.##.###',
// '#.#..B..R#',
// '#######.##',
// '##########',
// ] //ans 5
// const input = [
// '8 5',
// '#####',
// '#.###',
// '#...#',
// '#...#',
// '#O.##',
// '#.###',
// '#.RB#',
// '#####',
// ] //ans2
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const board = Array.from({length:N},(_,i)=>input[i+1].split(''));

const solution = () =>{
    const marble = {ry:null,rx:null,by:null,bx:null};
    const hall = {y:null,x:null};
    const dy = [0,0,-1,1];
    const dx = [-1,1,0,0];
    const [left,right,up,down] = [0,1,2,3];
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            if(board[y][x] === 'O') hall.y = y , hall.x = x
            else if(board[y][x] ==='R') marble.ry = y , marble.rx = x;
            else if(board[y][x] ==='B') marble.by = y , marble.bx = x;
        }
    }

    const gameStart = (start) =>{
        let min = 0;
        // fall[0] = red , fall[1] = blue
        let fall = Array.from({length:4},()=>[false,false]);
        let isFinish = false;
        let queue = [[start.ry,start.rx,start.by,start.bx,0]];
        while(queue.length){
            const [ry,rx,by,bx,count] = queue.shift();
            if(count >=10) return -1;
            // if(isFinish) return min;
            for(let dir=0; dir<4; dir++){
                fall[dir].fill(false);
                let marble =[[ry,rx],[by,bx]]
                for(let i=0; i<marble.length; i++){
                    const [my,mx] = marble[i];
                    let [ny,nx] = [my+dy[dir],mx+dx[dir]];
                    while(board[ny][nx] !=='#'){
                        if(ny === hall.y && nx === hall.x){
                           fall[dir][i] = true;
                           break;
                        }
                        ny+=dy[dir];
                        nx+=dx[dir];
                    }
                    marble[i] = [ny-dy[dir],nx-dx[dir]];
                }
                if(fall[dir].some(el => el)){
                    if(!isFinish && (fall[dir][0] && !fall[dir][1])){
                        return count+1;
                    }
                    continue;
                }
                if(marble[0][0] === marble[1][0] && marble[0][1] === marble[1][1]){
                    if(dir === left) rx < bx ? marble[1][1]++ : marble[0][1]++;
                    else if(dir ===right) rx < bx ? marble[0][1]-- : marble[1][1]--;    
                    else if(dir ===up) ry < by ? marble[1][0]++ : marble[0][0]++;
                    else if(dir ===down) ry < by ? marble[0][0]-- : marble[1][0]--;
                }
                if(marble[0][0] === ry && marble[0][1]===rx && marble[1][0] === by && marble[1][1] === bx) continue;
                queue.push([...marble[0],...marble[1],count+1]);
            }

        }
        return -1
    }
    const minTime = gameStart(marble);
    console.log(minTime);
}
solution();