//const [user_id,banned_id] = [["frodo", "fradi", "crodo", "abc123", "frodoc"],["fr*d*", "abc1**"]]
//const [user_id,banned_id] = [["frodo", "fradi", "crodo", "abc123", "frodoc"],["*rodo", "*rodo", "******"]];
const [user_id,banned_id] = [["frodo", "fradi", "crodo", "abc123", "frodoc"],["fr*d*", "*rodo", "******", "******"]];


const solution = (user_id,banned_id) => {
    let vertex = banned_id.length;
    let banMap = new Set();
    const edge = banned_id.reduce((acc,cur,index)=>{
      loop:for(let i=0; i<user_id.length; i++){
            if(user_id[i].length !== cur.length) continue;
            for(let j=0; j<user_id[i].length; j++){
                if(cur[j] === '*') continue;
                if(user_id[i][j] !== cur[j]) continue loop;
            }
            acc[index].push(i);
        }
        return acc;

    },Array.from({length:vertex},()=>[]));
    let visited = Array(user_id.length).fill(false);
    let ban = Array(vertex);

    const dfs = (count) =>{
        if(count === vertex){
            const banList = [...ban].sort((a,b)=>a-b).join('');
            banMap.add(banList);
            return;
        }
        for(let i=0; i<edge[count].length; i++){
            const user = edge[count][i];
            if(!visited[user]){
                visited[user] = true;
                ban[count] = user;
                dfs(count+1);
                visited[user] = false;
            }
        }
    }
    dfs(0);
    // console.log(banMap)
    return banMap.size;
}
solution(user_id,banned_id);