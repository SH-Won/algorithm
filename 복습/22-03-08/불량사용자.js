const solution = (user_id,banned_id) =>{
    const candidate = banned_id.reduce((acc,banId,idx)=>{
    loop:for(let i=0; i<user_id.length; i++){
            const userId = user_id[i];
            if(userId.length !== banId.length) continue;
            for(let j=0; j<banId.length; j++){
                if(banId[j] === '*') continue;
                if(banId[j] !== userId[j]) continue loop;
            }
            acc[idx].push(i);   
        }
        return acc;
    },Array.from({length:banned_id.length},()=>[]));

    const ban = new Set();
    const list = [];
    const already = Array(user_id.length).fill(false);
    const dfs = (count) =>{
        if(count === banned_id.length){
           const banInfo = [...list].sort((a,b) => a-b).join(' ');
           ban.add(banInfo);
           return;
        }
        for(let i=0; i<candidate[count].length; i++){
            const banId = candidate[count][i];
            if(!already[banId]){
               already[banId] = true;
               list.push(banId);
               dfs(count+1);
               list.pop();
               already[banId] = false;
              }
        }
    }
    dfs(0);
    return ban.size;
}
console.log(solution(["frodo", "fradi", "crodo", "abc123", "frodoc"],["fr*d*", "abc1**"]))