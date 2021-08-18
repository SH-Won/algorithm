const places =[["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]];

const n = 5;
const isValid = (y,x) => (y>=0 && x>=0 && y<n && x<n)
const isCorona = (place,y,x) => {
    const distance = [[1,0],[-1,0],[0,1],[0,-1]];
    let count = 2;
    let queue = [[y,x]];
    let visited = Array.from({length:n},()=>Array(n).fill(false));
    visited[y][x] = true;
    while(count-- && queue.length){
        let length = queue.length;
     
       
        while(length--){
            const [curY,curX] = queue.shift();
            
            distance.forEach(([y,x])=>{
                const [nextY,nextX] = [curY+y,curX+x];

                if(!isValid(nextY,nextX)|| visited[nextY][nextX]  || place[nextY][nextX] ==='X')
                return;

                queue.push([nextY,nextX]);
                visited[nextY][nextX] =true;
            })
            // for(let i=0; i<distance.length; i++){
            //     const [ny,nx] = [curY+distance[i][0] , curX+distance[i][1]];
            //     if(!isValid(ny,nx) || visited[ny][nx] || place[ny][nx] ==='X'){
            //         continue;
            //     }
            //     queue.push([ny,nx]);
            //     visited[ny][nx] = true;
            // }
        }

        let isPerson = queue.some(([y,x]) => place[y][x] === 'P');
        if(isPerson) return isPerson

    }
    return false;

}
const isCheck = (places,place) =>{

    for(let i=0; i<n; i++){
        for(let j=0; j<n; j++){
            if(place[i][j] === 'P' && isCorona(place,i,j)){
                places.push(0);
                return places;
            }
            
        }
    }
    places.push(1);
    return places;

}

console.log(solution(places));

function solution(places){
    return places.reduce(isCheck,[])

}