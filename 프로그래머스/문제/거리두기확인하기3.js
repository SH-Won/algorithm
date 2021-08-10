const places =[["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]];
console.log(solution(places))

function solution(places){
    let answer =[];
    for(let i=0; i<places.length; i++){
        answer.push(isCovid(places[i]))
        
    }
  return answer;
}


function isCovid(place){
    let visited = Array.from({length:place.length},()=>Array(place.length).fill(false));
    //console.log(place);
   let isDistance = 1;
   
        loop:for(let i=0; i<place.length; i++){
          for(let j=0; j<place[i].length; j++){
            if(place[i][j] ==='P' && bfs([i,j])){
                isDistance =0;
                break loop
            }
        }
    }
   

    return isDistance 

 function bfs(start){

    let queue = [start];
    
    
    let isPerson ;
    let count = 0;
    const distance = [[1,0],[-1,0],[0,1],[0,-1]];
    visited[start[0]][start[1]]=true;
    
    while(queue.length && count <2 ){
        isPerson =false;
        
        const [curY,curX] =queue.shift();
        
          for(let i=0; i<distance.length; i++){
            const [nextY,nextX] = [curY+distance[i][0],curX+distance[i][1]];
            
            if(nextY<0 || nextX<0 || nextY >=place.length || nextX >=place.length){
                continue
            }
            
            if(!visited[nextY][nextX] && place[nextY][nextX] ==='P'){
                
                isPerson = true; 
                break;
            }
            if(!visited[nextY][nextX]  && place[nextY][nextX] === 'O'){
                queue.push([nextY,nextX]);
               // visited[nextY][nextX];
            }
          }
        
         if(isPerson) return true;
         console.log(count);
          count++;
    }

    return false;
} 
}