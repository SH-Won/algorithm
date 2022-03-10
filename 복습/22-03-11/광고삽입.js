const getDigitalTime = (second) =>{
    let h = Math.floor(second / 3600);
    let m = Math.floor(second / 60) % 60;
    let s = second % 60
    h = h < 10 ? "0"+h : h;
    m = m < 10 ? "0"+m : m;
    s = s < 10 ? "0"+s : s;
    return h+":"+m+":"+s;
}
const transform_time = (digitalTime) =>{
    const [hour,minute,second] = digitalTime.split(':')
    return (hour*3600 + minute*60 + second*1);
}
const solution = (play_time,adv_time,logs) =>{
    const [playTime,advTime] = [transform_time(play_time),transform_time(adv_time)];
    const times = Array(playTime+1).fill(0);
    for(let i=0; i<logs.length; i++){
        const [start,end] = logs[i].split('-');
        const [startTime,endTime] = [transform_time(start),transform_time(end)];
        times[startTime]++ , times[endTime]--; 
    }
    for(let i=1; i<=playTime; i++) times[i]+=times[i-1];
    for(let i=1; i<=playTime; i++) times[i]+=times[i-1];

    let maxAdv = times[advTime-1];
    let advStartTime = 0;
    for(let i=advTime; i<=playTime; i++){
        if(times[i] - times[i-advTime] > maxAdv){
           maxAdv = times[i] - times[i-advTime];
           advStartTime = i-advTime+1;
        }
    }
    return getDigitalTime(advStartTime);
}
// console.log(solution("02:03:55","00:14:15",["01:20:15-01:45:14", "00:40:31-01:00:00", "00:25:50-00:48:29", "01:30:59-01:53:29", "01:37:44-02:02:30"]))
// console.log(solution("99:59:59","25:00:00",["69:59:59-89:59:59", "01:00:00-21:00:00", "79:59:59-99:59:59", "11:00:00-31:00:00"]))
// console.log(solution("50:00:00","50:00:00",["15:36:51-38:21:49", "10:14:18-15:36:51", "38:21:49-42:51:45"]))