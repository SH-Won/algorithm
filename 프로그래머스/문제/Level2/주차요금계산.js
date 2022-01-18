
const solution = (fee,records) =>{
    const [basicTime,basicFee,unitTime,unitFee] = fee;
    let info = {};
    for(let i=0; i<records.length; i++){
        const [time,carNum,state] = records[i].split(' ');
        const minutes = time.split(':').reduce((acc,cur,i)=>acc+= i===0 ? cur*60 : cur *1 ,0);
        if(state === 'IN'){
           if(info[carNum]){
              info[carNum].inTime = minutes , info[carNum].out = false;
           }
           else info[carNum] = {inTime:minutes,out:false,time:0};
        }
        else{
           info[carNum].time += (minutes - info[carNum].inTime);
           info[carNum].out = true;
        }
    }
    let answer = [];
    const result = Object.entries(info).sort();
    for(let i=0; i<result.length; i++){
        let {inTime,out,time} = result[i][1];
        if(!out) time += (1439 - inTime);
        let totalFee = basicFee;
        if(time - basicTime > 0){
           const addTime = time-basicTime;
           totalFee += Math.ceil(addTime / unitTime) * unitFee;
        }
        answer.push(totalFee);
    }
    return answer;
}
// console.log(solution([180, 5000, 10, 600],["05:34 5961 IN", "06:00 0000 IN", "06:34 0000 OUT", "07:59 5961 OUT", "07:59 0148 IN", "18:59 0000 IN", "19:09 0148 OUT", "22:59 5961 IN", "23:00 5961 OUT"]))
// console.log(solution([120, 0, 60, 591],["16:00 3961 IN","16:00 0202 IN","18:00 3961 OUT","18:00 0202 OUT","23:58 3961 IN"]));
console.log(solution([1,461,1,10],["00:00 1234 IN"]))