const solution = (user_id,banned_id) =>{
    let banList = new Set();
    let banned = Array(user_id.length).fill(false);
    let banInfo = banned_id.map(info => {
        let array = [];
      loop:for(let i=0; i<user_id.length; i++){
            const userId = user_id[i];
            if(userId.length !== info.length) continue;
             for(let j=0; j<info.length; j++){
                if(info[j] === '*') continue;
                if(info[j] !== userId[j]) continue loop;
            }
            array.push(i);
        }
        return array;
    })

    let banIds = Array(banInfo.length);

    const makeBanList = (count) =>{
        if(count === banInfo.length){
            const ids  = [...banIds].sort((a,b)=>a-b);
            banList.add(ids.join(','));
            return;
        }
        for(let i=0; i<banInfo[count].length; i++){
            const id = banInfo[count][i];
            if(!banned[id]){
                banned[id] = true;
                banIds[count] = id;
                makeBanList(count+1);
                banned[id] = false;
            }
        }
    }
    makeBanList(0);
    return banList.size;
}
//const [user_id,banned_id] = [["frodo", "fradi", "crodo", "abc123", "frodoc"],["fr*d*", "abc1**"]]
// const [user_id,banned_id] = [["frodo", "fradi", "crodo", "abc123", "frodoc"],["*rodo", "*rodo", "******"]];
// const [user_id,banned_id] = [["frodo", "fradi", "crodo", "abc123", "frodoc"],["fr*d*", "*rodo", "******", "******"]];
console.log(solution(user_id,banned_id));