const isValidPos = (x,y) => (x>=-5 && x<=5 && y>=-5 && y<=5);
const solution = (dirs) =>{
    const d = {
        'U':[1,0], 'D':[-1,0], 'L':[0,-1], 'R':[0,1]
    }
    let visited = new Set();
    let [x,y] = [0,0];
    for(let i=0; i<dirs.length; i++){
        const dir = dirs[i];
        const [dx,dy] = d[dir];
        const [nx,ny] = [x+dx,y+dy]; 
        if(!isValidPos(nx,ny)) continue;
        visited.add(`${x},${y},${nx},${ny}`);
        visited.add(`${nx},${ny},${x},${y}`); 
        [x,y] = [nx,ny];
    }
    return visited.size / 2
}
console.log(solution("ULURRDLLU"))