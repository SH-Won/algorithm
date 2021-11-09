
const solution = (lines) => {
    let logPoints = [];
    let ranges = [];
    for(let i=0; i<lines.length; i++){
        const line = lines[i].split(" ");
        const [hour,minute,sec] = line[1].split(":");
        const processTime = line[2].slice(0,-1);        
        const end = (+hour * 3600) + (+minute * 60) + (+sec);
        const start = + (end - processTime + 0.001).toFixed(3); 
         
        logPoints.push(start,end);
        ranges.push([start,end]);
    }
    logPoints.sort((a,b)=>a-b);
    let maxCount = 0;
    for(let i=0; i<logPoints.length; i++){
        let count = 0;
        const [startRange,endRange] = [logPoints[i],logPoints[i]+1];
        for(let j=0; j<ranges.length; j++){
            const [start,end] = ranges[j];
            if( (start >= startRange && start < endRange) || 
                (end >=startRange && end < endRange) ||
                (start < startRange && end > endRange)) count++;
        }
        maxCount = Math.max(maxCount,count);
    }
    return maxCount;
}
// const lines =[
//     "2016-09-15 01:00:04.002 2.0s",
// "2016-09-15 01:00:07.000 2s"
// ];
const lines = [
    "2016-09-15 20:59:57.421 0.351s", "2016-09-15 20:59:58.233 1.181s", "2016-09-15 20:59:58.299 0.8s", "2016-09-15 20:59:58.688 1.041s", "2016-09-15 20:59:59.591 1.412s", "2016-09-15 21:00:00.464 1.466s", "2016-09-15 21:00:00.741 1.581s", "2016-09-15 21:00:00.748 2.31s", "2016-09-15 21:00:00.966 0.381s", "2016-09-15 21:00:02.066 2.62s"
]
console.log(solution(lines));