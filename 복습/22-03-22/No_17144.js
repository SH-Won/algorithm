const fs =require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = input =>{
    const [R,C,T] = input[0].split(' ').map(Number);
    let map = Array.from({length:R},(_,i) => input[i+1].split(' ').map(Number));
    let robot;
    for(let x=0; x<C; x++){
        if(map[0][x] === -1){
            robot = {x1:x, x2:x+1};
            break;
        }
    }
    
}