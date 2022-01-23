const solution = record =>{
    let nicMap = new Map();
    for(let i=0; i<record.length; i++){
        const [state,id,nic] = record[i].split(' ');
        if(state === 'Leave') continue;
        else nicMap.set(id,nic);
    }
    let answer = [];
    for(let i=0; i<record.length; i++){
        const [state,id,nic] = record[i].split(' ');
        if(state === 'Change') continue;
        state === "Enter" ? answer.push(`${nicMap.get(id)}님이 들어왔습니다.`) : answer.push(`${nicMap.get(id)}님이 나갔습니다.`)
    }
    return answer;
}
console.log(solution(["Enter uid1234 Muzi", "Enter uid4567 Prodo","Leave uid1234","Enter uid1234 Prodo","Change uid4567 Ryan"]))