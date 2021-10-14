const [user_id,banned_id] = [["frodo", "fradi", "crodo", "abc123", "frodoc"],["fr*d*", "abc1**"]]
const solution = (user_id,banned_id) =>{
    const n = user_id.length;
    const v = banned_id.length;
    const edge = banned_id.reduce((acc,id,index)=>{
        for(let i=0; i<user_id.length; i++){
            if(id.length !== user_id[i].length) continue;
            for(let j=0; j<id.length; j++){
                if(id[j] ==='*' || id[j] === user_id[i][j]) continue;
                break;
            }
            acc[index].push(i);
        }
        return acc;

    },Array.from({length:v},()=>[]))
    console.log(edge);
}
solution(user_id,banned_id);