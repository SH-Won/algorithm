

function solution(places){
    let answer = [];
    let visited = [];

    for(let i=0; i<places.length; i++){
        let start = startArr(places[i])
        visited = Array(start.length).fill(false);
        dfs(places[i],start,start[0]);
    }

    


    function dfs(places,startArr,start){

        const [curY,curX] = start;
        


        for(let i=0; i<startArr.length; i++){
            if(!visited[i]){
            const [y,x] = startArr[i];


            }

        }

    }
    function startArr(place){
        let start = [];
        let index =-1;
       
            for(let i=0; i<place.length; i++){
                while(true){
                index = place[i].indexOf('P',index+1);
                if(index === -1) break;
                start.push([i,index]);
                }
            }
        }
        return start;
    }
