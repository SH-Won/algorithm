
const corona = [["OOXPO","OOPXO","OOOOO","OOOOO","OOOOO"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]];

console.log(solution(corona));

function solution(places){
    let answer = [];

    for(let i=0; i<places.length; i++){
        answer.push(bfs(places[i]));
    }

    function bfs(place){
        let check =true;
        let start =[];
        let places = Array.from({length:place.length},(_,i)=>place[i].split(""));

  
        

        for(let i=0; i<places.length; i++){
            let index = -1;
            while(true){
                index = places[i].indexOf('P',index+1);

                if(index === -1) break;

                start.push([i,index]);
            }
        }
    
        let queue = [...start];
        while(queue.length){
            
            
           
            const [curY,curX] = queue.shift();

            for(let i=0; i<queue.length; i++){
                const [nextY,nextX] = queue[i];
                
                const Y = nextY - curY; // -1 1 -1  1
                const X = nextX - curX; // -1 -1 1  1
                if( (Math.abs(Y) + Math.abs(X) ) > 2 ) continue;
                
                if( (Math.abs(Y) + Math.abs(X)) === 1 ){
                    
                    check =false;
                    break;
                }
                //대체 반례가 뭐야?? 짜증나 죽겠네
                

                // if(Math.abs(Y)===1 && Math.abs(X) ===1){
                //     if(places[curY+Y][curX] !=='X' && places[curY][curX+X] !=='X'){
                //         check = false;
                //         break;
                //     }
                // }

                // if(Math.abs(Y) === 2 ){
                //    if(places[(nextY+curY)/2][curX] !=='X'){
                //        check = false;
                //        break;
                //    }
                    

                // }
                // if(Math.abs(X) ===2 ){
                //     if(places[curY][(nextX+curX)/2] !=='X'){
                //         check = false;
                //         break;
                //     }

                // }
                
            }
            
            

            // return check === true ? 1 : 0;

        }

        
        return check === true ? 1 : 0;
    }
    return answer;
    
}