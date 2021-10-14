//const [user_id,banned_id] = [["frodo", "fradi", "crodo", "abc123", "frodoc"],["fr*d*", "abc1**"]]
//const [user_id,banned_id] = [["frodo", "fradi", "crodo", "abc123", "frodoc"],["*rodo", "*rodo", "******"]];
const [user_id,banned_id] = [["frodo", "fradi", "crodo", "abc123", "frodoc"],["fr*d*", "*rodo", "******", "******"]];
const solution = (user_id,banned_id) =>{
    let banList = new Set();
    const v = banned_id.length;
    const n = user_id.length;
    let banId = Array(v);
    let visited = Array(n).fill(false);
    const edge = banned_id.reduce((acc,id,index)=>{
        loop:for(let i=0; i<user_id.length; i++){
            if(id.length !== user_id[i].length) continue;
            for(let j=0; j<id.length; j++){
                if(id[j] ==='*' || id[j] === user_id[i][j]) continue;
                continue loop;
            }
            acc[index].push(i);
        }
        return acc;

    },Array.from({length:v},()=>[]))
    // console.log(edge);
    const dfs =(count) => {
         if(count === v){
             banList.add([...banId].sort((a,b)=>a-b).join(''));
             return;
         }
         for(let i=0; i<edge[count].length; i++){
             const id = edge[count][i];
             if(!visited[id]){
                 visited[id] = true;
                 banId[count]=id;
                 dfs(count+1);
                 visited[id] = false;
             }
         }
        
    }
    dfs(0);
    console.log(banList)
    return banList.size;
}
console.log(solution(user_id,banned_id));