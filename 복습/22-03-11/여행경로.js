const solution = tickets =>{
    const answer = [];
    const path = [];
    const visited = Array(tickets.length).fill(false);
    
    const findPath = (count,airport) =>{
        if(count === tickets.length ){
            answer.push([...path,airport]);
            return;
        }
        for(let i=0; i<tickets.length; i++){
            if(visited[i]) continue;
            const [cur,next] = tickets[i];
            if(cur !== airport) continue;
            visited[i] = true;
            path.push(cur);
            findPath(count+1,next);
            path.pop();
            visited[i] = false;
        }
    }
    findPath(0,"ICN");
    return answer.sort()[0];
}