// https://programmers.co.kr/learn/courses/30/lessons/12978

const N =5;
const road = [[1,2,1],[2,3,3],[5,2,2],[1,4,2],[5,3,1],[5,4,2]];
const K = 3;

const solution = (N,road,K) =>{
    
    let vTree = Array.from({length:N+1},()=>[]);
    let vDist = Array(N+1).fill(Infinity);
    for(let i=0; i<road.length; i++){
        const [cVilage,nVilage,distance] = road[i];
        vTree[cVilage].push({nVilage,distance});
        vTree[nVilage].push({nVilage:cVilage,distance});
    }
    console.log(vTree);
     
    const bfs = (start) =>{
        let queue = [[start,0]];
        vDist[start] = 0;
        
        

        while(queue.length){
            const [cVilage,cDist] = queue.pop();
       
            
            for(let i=0; i<vTree[cVilage].length; i++){
                const {nVilage,distance} =vTree[cVilage][i];
                if(vDist[nVilage] > cDist+distance){
                    queue.push([nVilage,cDist+distance]);
                    vDist[nVilage]= cDist+distance;
                }
            }
        }

    }
    bfs(1);
    return vDist.filter(num => num <=K).length;
}

console.log(solution(N,road,K));