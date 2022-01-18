const solution = (id_list,report,k)=>{
    let answer = Array(id_list.length).fill(0);
    let idMap = new Map();
    let reportMap = new Map();
    for(let i=0; i<id_list.length; i++){
        const id = id_list[i];
        idMap.set(id,i);
    }
    for(let i=0; i<report.length; i++){
        const [id,reportId] = report[i].split(' ');
        if(reportMap.has(reportId)){
            const ids = reportMap.get(reportId).add(id);
            reportMap.set(reportId,ids);
        }else{
            reportMap.set(reportId,new Set().add(id));
            
        }
    }
    for(let [key,value] of reportMap){
        if(value.size >= k){
            for(let user of value){
                answer[idMap.get(user)]++;
            }
        }
    }
    return answer;
}

console.log(solution(["muzi", "frodo", "apeach", "neo"],["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"],2))
// console.log(solution(["con", "ryan"],["ryan con", "ryan con", "ryan con", "ryan con"],3))