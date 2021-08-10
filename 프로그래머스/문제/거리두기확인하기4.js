const places =[["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]];



const n = 5;
const isPos = (y,x) => (y >=0 && x>=0 && y<n && x<n)
const isCovid = (place,y,x) =>{
    let visited = Array.from({length:n},()=>Array(n).fill(false));
    visited[y][x] =true;
    const distance = [[1,0],[-1,0],[0,1],[0,-1]]
    let count = 2;
    let queue = [];
    queue.push([y,x]);

    while(queue.length && count--){
        let length  = queue.length;
       
        while(length--){
        const [cy,cx] = queue.shift();
         for(let i=0; i<distance.length; i++){
            const [ny,nx] = [cy+distance[i][0] , cx+distance[i][1]];
            if(!isPos(ny,nx) || visited[ny][nx] || place[ny][nx] ==='X'){
                continue;
            }
            queue.push([ny,nx]);
            visited[ny][nx] = true;
        }
      }
    //   let isPerson = queue.reduce((isPerson,[y,x])=>{
    //     return place[y][x] === 'P' || isPerson
    //   }
    //    ,false)
       let isPerson = queue.some(([y,x]) => place[y][x] ==='P');
       if(isPerson) return isPerson

    }
    return false;

}

const checkPlace = (answer,place) =>{
    for(let i=0; i<place.length; i++){
        for(let j=0; j<place.length; j++){
            if(place[i][j] ==='P' && isCovid(place,i,j)){
                answer.push(0);
                return answer;
            }
        }
    }
    answer.push(1);
    return answer;
}

const solution = (places) =>{

    return places.reduce(checkPlace,[]);

}
console.log(solution(places))
