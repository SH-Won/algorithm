

// 문제 해설
// 주어진 5×5 크기의 대기실을 다음과 같은 그래프로 볼 수 있습니다.

// 하나의 칸을 정점으로 봅니다.
// 모든 칸에는 상하좌우 인접한 칸으로의 간선이 있습니다.
// 단, 파티션이 있는 칸에서 나오거나 파티션이 있는 칸으로 들어가는 간선은 없습니다.
// 그러면 이 문제는 사람이 있는 정점에서 거리 2 이내에 다른 사람이 있는 정점이 있는지를 검사하는 그래프 탐색 문제로 볼 수 있습니다.

// 따라서 사람이 있는 정점들에서 시작하는 깊이 우선 탐색(DFS) 또는 너비 우선 탐색(BFS) 알고리즘을 사용하면 해결이 가능합니다. 이때, 거리 2 이내만 확인하면 된다는 점에 유의하여 구현해야 합니다.

// 이 방법 이외에도, 거리 2 이내까지만 확인하면 문제를 풀 수 있기 때문에 이중 반복문을 사용해서 직접 한 칸씩 확인하는 것도 충분히 가능한 방법입니다.


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
                

                if(Math.abs(Y)===1 && Math.abs(X) ===1){
                    if(places[curY+Y][curX] !=='X' && places[curY][curX+X] !=='X'){
                        check = false;
                        break;
                    }
                }

                if(Math.abs(Y) === 2 ){
                   if(places[(nextY+curY)/2][curX] !=='X'){
                       check = false;
                       break;
                   }
                    

                }
                if(Math.abs(X) ===2 ){
                    if(places[curY][(nextX+curX)/2] !=='X'){
                        check = false;
                        break;
                    }

                }
                
            }
            
            

            // return check === true ? 1 : 0;

        }

        
        return check === true ? 1 : 0;
    }
    return answer;
    
}