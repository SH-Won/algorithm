
const corona = [["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]];

console.log(solution(corona));
function solution(places){
    let answer = [];

    for(let i=0; i<places.length; i++){
        answer.push(bfs(places[i]));
    }

    function bfs(place){

        let start =[];
        let check =true;

        for(let i=0; i<place.length; i++){
            let index = -1;
            while(true){
                index = place.indexOf('P',index+1);

                if(index === -1) break;

                start.push([i,index]);
            }
        }
        let queue = [...start];
        while(queue.length && check){
           
            const [curY,curX] = queue.shift();

            [[curY+1,curX],[curY-1,curX],[curY,curX+1],[curY,curX-1]]
            .forEach(([y,x])=>{
                if(y<0|| x<0 ||  y>=place.length || x>=place.length) return

                if(place[y][x] ==='P'){
                     check= false;
                     
                }
            })
            [[curY+2,curX],[curY-2,curX],[curY,curX+2],[curY,curX-2]]
            .forEach(([y,x])=>{
                if(y<0|| x<0 ||  y>=place.length || x>=place.length) return
               
                if(place[y][x] === 'P'){
                     const Y = y - curY;
                     const X = x - curX;
                     if(place[curY+Y+1][X] !== 'X'){
                         check = false;
                         
                     }


            }})

            [[curY+1,curX+1],[curY+1,curX-1],[curY-1,curX+1],[curY-1,curX-1]]
            .forEach(([y,x])=>{
                if(y<0|| x<0 ||  y>=place.length || x>=place.length) return
                if(place[y][x] ==='P'){
                    const Y = y-curY;
                    const X = x=curX;
                    if(place[curY+Y][curX] !=='X' && place[curY][curX+X] !=='X'){
                        check =false;
                        
                    }
                }
                
            })
        }

        return check === true ? 1 : 0

    }
    return answer;
    
}