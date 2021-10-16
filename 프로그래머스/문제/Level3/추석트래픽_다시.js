const lines = [
    "2016-09-15 01:00:04.001 2.0s",
    "2016-09-15 01:00:07.000 2s"
    ]


const solution = (lines) =>{
    let startEndPoint = [];
    let logPoint = [];
    let maxCount = 0;
    for(let i=0; i<lines.length; i++){
        const line = lines[i].split(" ");
        const endSec = Number(line[1].substring(0,2)) * 3600 +
                       Number(line[1].substring(3,5)) * 60 +
                       Number(line[1].substring(6,12));
        const processTime = Number(line[2].substring(0,line[2].length-1));
        const startSec = Number((endSec - processTime + 0.001).toFixed(3)); 
        startEndPoint.push([startSec,endSec]);
        logPoint.push(startSec,endSec);
    }
    logPoint.sort((a,b)=>a-b);
    for(let i=0; i<logPoint.length; i++){
        const [startRange,endRange] = [logPoint[i],logPoint[i]+1];
        let count = 0;
        for(let j=0; j<startEndPoint.length; j++){
            const [start,end] = [startEndPoint[j][0],startEndPoint[j][1]];
            if((start >= startRange && start < endRange) ||
               (end >=startRange && end < endRange) ||
               (start < startRange && end > endRange) ) count++;
        }
        maxCount = Math.max(maxCount,count);
    }
    return maxCount;
} 
solution(lines);