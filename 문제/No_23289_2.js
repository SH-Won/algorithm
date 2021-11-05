const dy = [0,0,-1,1];
const dx = [1,-1,0,0];
const controlTemper = (map,wall) =>{
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<map.length && x<map[0].length);
    let newMap = Array.from({length:map.length},()=>Array(map[0].length).fill(0));
    for(let y=0; y<map.length; y++){
        for(let x=0; x<map[0].length; x++){
            if(!map[y][x]) continue;
            let disCount = 0;
            const temper = map[y][x];
            for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(!isValidPos(ny,nx) || temper <= map[ny][nx] || wall.has(`${y}${x}${ny}${nx}`)) continue;
                const nextTemper = map[ny][nx];
                disCount+=Math.floor((temper - nextTemper) / 4)
                newMap[ny][nx]+=Math.floor((temper - nextTemper) / 4);
            }
            newMap[y][x]+=(temper - disCount);
        }
    }
    
    return newMap;
}
const array = [
    [5,18,70],[23,46,0],[0,2,20]
]
const wall = new Set(["0102","0201",'2021','2120','2111','1121'])

console.log(controlTemper(array,wall));