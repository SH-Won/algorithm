const input = ['A1','B3','A5','C6','E5','F3','D2','F1','E3','F5','D4','B5','A3','B1','C3','A2','C1','E2','F4','E6','C5','A6','B4','D5','F6','E4','D6','C4','B6','A4','B2','D1','F2','D3','E1','C2']
//const input = ['A1','C2','E3','F5','D4','B3','A1','C2','E3','F5','D4','B3','A1','C2','E3','F5','D4','B3','A1','C2','E3','F5','D4','B3','A1','C2','E3','F5','D4','B3','A1','C2','E3','F5','D4','B3'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const order = Array.from({length:36},(_,i)=>{
    const [y,x] = [input[i][1]-1,input[i][0].charCodeAt()-65];
    return [y,x];
})

let visited = Array.from({length:6},()=>Array(6).fill(false));

const knightTour = () =>{
    const [sy,sx] = order[0];
    visited[sy][sx] = true;
    for(let i=1; i<order.length; i++){
        const [py,px] =order[i-1];
        const [cy,cx] = order[i];
        if(visited[cy][cx]) return 'Invalid';
        visited[cy][cx] = true;
        const dy = Math.abs(cy-py);
        const dx = Math.abs(cx-px);
        if(!(dy === 2 && dx ===1 ) && !(dy ===1 && dx===2) ) return 'Invalid';
    }
    
    const [ly,lx] = order[35];
    const dy = Math.abs(ly-sy);
    const dx = Math.abs(lx-sx);
    if(!(dy === 2 && dx ===1 ) && !(dy ===1 && dx===2) ) return 'Invalid';
    return 'Valid';
}
const answer = knightTour();
// console.log(visited);
console.log(answer);