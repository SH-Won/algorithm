const solution = lines =>{
    const logPoints = [];
    const startEndPoints = [];
    lines.forEach(line =>{
        const [ ,time,workTime] = line.split(' ');
        const sec = time.split(':').reduce((acc,cur,idx) => acc+= (+cur * (3600 / Math.pow(60,idx))) ,0);
        const workSec = workTime.slice(0,-1) * 1;
        const [start,end] = [(sec-workSec+0.001).toFixed(3) * 1, sec];
        logPoints.push(start,end);
        startEndPoints.push([start,end]);
    })
    let answer = 0;
    for(let i=0; i<logPoints.length; i++){
        let count = 0;
        //     /    /
        const [startRange,endRange] = [logPoints[i],logPoints[i]+1];
        for(let j=0; j<startEndPoints.length; j++){
            const [startTime,endTime] = startEndPoints[j];
            if((startTime >= startRange && startTime < endRange) ||
               (endTime >= startRange && endTime < endRange) ||
               (startTime < startRange && endTime > endRange)
            ) count++;
        }
        answer = Math.max(count,answer);
    }
    return answer;
}
console.log(solution( [
    "2016-09-15 01:00:04.001 2.0s",
    "2016-09-15 01:00:07.000 2s"
    ]))