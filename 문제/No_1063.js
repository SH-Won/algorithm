const input = [
'A1 A2 5',
'B',
'L',
'LB',
'RB',
'LT'
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const pos = input[0].split(' ');

const solution = () =>{
    let [ky,kx] = [parseInt(pos[0][1]),pos[0][0].charCodeAt()-65];
    let [sy,sx] = [parseInt(pos[1][1]),pos[1][0].charCodeAt()-65];
    const N = +pos[2];
    const commands = Array.from({length:N},(_,i)=>input[i+1]);
    const map ={
        'R':[0,1],'L':[0,-1],'B':[-1,0],'T':[1,0],
        'RT':[1,1],'LT':[1,-1],'RB':[-1,1],'LB':[-1,-1]
    }
    const isValidPos = (y,x) => (y>=1 && x>=0 && y<=8 && x<8);
    for(let i=0; i<commands.length; i++){
         const com = commands[i];
         const [ny,nx] = [ky+map[com][0],kx+map[com][1]];
         if(!isValidPos(ny,nx)) continue;
         if(ny === sy && nx === sx){
             const [nsy,nsx] = [sy+map[com][0],sx+map[com][1]];
             if(!isValidPos(nsy,nsx)) continue;
             sy = nsy , sx = nsx;
         }
         ky = ny, kx = nx;
    }
    const king = `${String.fromCharCode(kx+65)}${ky}`;
    const stone = `${String.fromCharCode(sx+65)}${sy}`;

    console.log(`${king}\n${stone}`); 
}
solution();

