const solution = (fees,records) =>{
    const info = new Map();
    for(let i=0; i<records.length; i++){
        const [time,carNumber,state] = records[i].split(' ');
        const curTime = time.split(':').reduce((acc,cur,i) => acc += (i === 0 ? cur*60 : cur*1),0);
        if(state === 'IN'){
            if(!info.has(carNumber)){
                info.set(carNumber,{parkTime:curTime,totalTime:0,out:false});

            }else{
                const {totalTime} = info.get(carNumber);
                info.set(carNumber,{parkTime:curTime,totalTime,out:false});
            }
        }
        else{
            let {parkTime,totalTime} = info.get(carNumber);
            totalTime += (curTime - parkTime);
            info.set(carNumber,{parkTime:null, totalTime, out: true});
        }
    }
    const [basicTime,basicFee,unitTime,unitFee] = fees;
    const result = Array.from(info).sort().reduce((acc,cur)=>{
       let {parkTime,totalTime,out} = cur[1];
       if(!out) totalTime += (1439 - parkTime);
       let totalFee = basicFee;
       if(totalTime <= basicTime) acc.push(totalFee);
       else{
           totalFee += ( Math.ceil((totalTime - basicTime) / unitTime) * unitFee);
           acc.push(totalFee);
       }
       return acc;
    },[]);
    return result;
}
console.log(solution([180, 5000, 10, 600],["05:34 5961 IN", "06:00 0000 IN", "06:34 0000 OUT", "07:59 5961 OUT", "07:59 0148 IN", "18:59 0000 IN", "19:09 0148 OUT", "22:59 5961 IN", "23:00 5961 OUT"]))