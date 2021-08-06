const tickets = [["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]];

console.log(solution(tickets));
function solution(tickets){
    let visited = Array(tickets.length).fill(false);
    let answer = [];
    

    dfs(0,"ICN",[]);
    function dfs(count,airport,path){
        
        
        let totalPath = [...path,airport];
         
        if(count === tickets.length){
          // console.log(totalPath);

          answer.push(totalPath);
          return;
        }
        //console.log(visited);
        
        
     
        for(let i=0; i<tickets.length; i++){
            if(!visited[i]){
            if(tickets[i][0] ===airport){
                visited[i] = true;
                
                    const [from,to] = tickets[i];
                    dfs(count+1,to,totalPath);
                    visited[i]=false
                    
                
            }
           } 
            // visited[i]=0 을 여기다 작성하면 안되는이유
           // 다음 dfs(count+1) 에서도 for문은 0부터 시작하므로 모든 visited 배열을 초기화함.
             
          }
        
    
    
  }
            
            //  if(!visited[i] && tickets[i][0]===airport){
                 
                 
                 
            //      visited[i] =true;
             
                
                 
            //  }
              
            
        
    

        

    

    return answer.sort()[0];
}