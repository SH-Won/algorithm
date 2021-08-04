 console.log(solution("hit","cog",["hot", "dot", "dog", "lot", "log", "cog"]))
//console.log(solution("hit","cog",["hot", "dot", "dog", "lot", "log"]))

function solution(begin,target,words){
    let visited = Array(words.length).fill(false);
    // 왜 visited 가 answer 아래로 가면 referenceError 가 나지?
    // 렉시컬 스코프에 의해 이미 bfs 가 정의됬을때 그위에 visited가 정의됬으니
    // 에러가 나지 않아야 하는게 맞지 않나.....
    let answer = words.includes(target) ? bfs(begin) : 0;
    

    function bfs(begin){
        
        let queue = [[begin,0]];
        
        while(queue.length){
             const [word,count] = queue.shift();
             

             if(word === target){
                 return count;
             }
             
            
            for(let i=0; i<words.length; i++){
                if(!visited[i] && checkEqual(word,words[i])){
                    
                    queue.push([words[i],count+1])
                    visited[i] = true;
                }
            }
        }
        return 0;
    }
    function checkEqual(word,comparison){
        let equalCount = 0;
        for(let i=0; i<word.length; i++){
            if(word[i]===comparison[i]){
                equalCount ++;
            }
        }
        return equalCount === word.length-1 ? true : false;

    }
    return answer;
    

}