// const input = [
// '4 2 0 0 8',
// '0 2',
// '3 4',
// '5 6',
// '7 8',
// '4 4 4 1 3 3 3 2',
// ]
// const input = [
// '3 3 1 1 9',
// '1 2 3',
// '4 0 5',
// '6 7 8',
// '1 3 2 2 4 4 1 1 3'
// ]
// const input = [
// '2 2 0 0 16',
// '0 2',
// '3 4',
// '4 4 4 4 1 1 1 1 3 3 3 3 2 2 2 2'
// ]
// const input = [
//     '3 3 0 0 16',
//     '0 1 2',
//     '3 4 5',
//     '6 7 8',
//     '4 4 1 1 3 3 2 2 4 4 1 1 3 3 2 2',
//     ]

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [dy,dx] = [[0,0,-1,1],[1,-1,0,0]];
const [EAST,WEST,NORTH,SOUTH] = [0,1,2,3];
const [U,E,W,S,N,D] = [0,1,2,3,4,5];
const moveDice = (dir,dice) =>{
    if(dir === EAST){
       [dice[E],dice[D]] = [dice[D],dice[E]];
       [dice[E],dice[U]] = [dice[U],dice[E]];
       [dice[U],dice[W]] = [dice[W],dice[U]];
    }
    else if(dir === WEST){
       [dice[W],dice[D]] = [dice[D],dice[W]];
       [dice[W],dice[U]] = [dice[U],dice[W]];
       [dice[U],dice[E]] = [dice[E],dice[U]];
    }
    else if(dir === NORTH){
       [dice[N],dice[D]] = [dice[D],dice[N]];
       [dice[N],dice[U]] = [dice[U],dice[N]];
       [dice[U],dice[S]] = [dice[S],dice[U]];
    }
    else if(dir === SOUTH){
       [dice[S],dice[D]] = [dice[D],dice[S]];
       [dice[S],dice[U]] = [dice[U],dice[S]];
       [dice[U],dice[N]] = [dice[N],dice[U]];
    }
}
const solution = (input) =>{
    let [N,M,y,x,K] = input[0].split(' ').map(Number);
    let map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    let command = input[N+1].split(' ').map(num => +num -1).reverse();
    let dice = Array(6).fill(0); // 0 위 1 2 3 4 동서남북 5 아랫면
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
    let answer = ''
    while(command.length){
        const dir = command.pop();
        const [ny,nx] = [y+dy[dir],x+dx[dir]];
        if(!isValidPos(ny,nx)) continue;
        y = ny , x= nx;
        moveDice(dir,dice);
        if(!map[y][x]) map[y][x] = dice[D];
        else dice[D] = map[y][x] , map[y][x] = 0;
        
        answer+=`${dice[U]}\n`;
    }
    console.log(answer.trim());
}
solution(input);