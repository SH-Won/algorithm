
const solution = (progresses,speeds) =>{
    let answer = [];
    while(progresses.length){
        const first = progresses[0];
        const days = Math.ceil ((100 - first) / speeds[0]);
        console.log(days);
        progresses.forEach((progress,index) => progresses[index]+=speeds[index]*days);
        console.log(progresses);
        let completedIndex = 0;
        while(progresses[completedIndex] >=100){
            completedIndex++;
        }
        progresses.splice(0,completedIndex);
        speeds.splice(0,completedIndex);
        answer.push(completedIndex);
    }
    return answer;
}
// console.log(solution([93,30,55],[1,30,5]));
console.log(solution([95,90,99,99,80,99],[1,1,1,1,1,1]))