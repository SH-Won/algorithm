const places = [["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]];

const isCovid = (place,y,x) =>{
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<5 && x<5);
    const distance = [[1,0],[-1,0],[0,1],[0,-1]];
    let visited = Array.from({length:5},()=>Array(5).fill(false));
    let queue = [[y,x]];
    visited[y][x] = true;
    let depth =2;
    while(queue.length && depth--){
        let length = queue.length
        while(length--){
            const [cy,cx] =queue.shift();
            
            distance.forEach(([y,x])=>{
                const [ny,nx] = [cy+y,cx+x];
                if(!isValidPos(ny,nx) || visited[ny][nx] || place[ny][nx] ==='X')
                return
                queue.push([ny,nx]);
                visited[ny][nx] = true;
            })

        }
        let isPerson = queue.some(([y,x])=> place[y][x] ==='P');
        if(isPerson) return isPerson
    }
    return false;
}
const checkCovid = (places,place) =>{

    for(let i=0; i<5; i++){
        for(let j=0; j<5; j++){
            if(place[i][j] ==='P' && isCovid(place,i,j)){
                places.push(0)
                return places;
            }
        }
    }
    places.push(1);
    return places
}

//console.log(solution(places));


function solution(places){
    return places.reduce(checkCovid,[]);
}