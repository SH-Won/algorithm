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
    const playTime =transform_time(play_time);
    const advTime = transform_time(adv_time);
    let times = Array(playTime).fill(0);
    // let advSum = times[advTime-1];
    // let advStart = 0 ;
    for(let i=0; i<logs.length; i++){
        const [start,end] = logs[i].split('-');
        const [startTime,endTime] = [transform_time(start),transform_time(end)];
        // console.log(startTime,endTime);
        times[startTime]++;
        times[endTime]--;
    }
    for(let i=1; i<=playTime; i++){
        times[i] += times[i-1];
    }
    for(let i=1; i<=playTime; i++){
        times[i] += times[i-1];
    }
    let advSum = times[advTime-1];
    let advStart = 0 ;
    for(let i=advTime-1; i<playTime; i++){
        if( advSum < times[i] - times[i-advTime]){

            advStart = i - advTime + 1;
            advSum = times[i] - times[i-advTime]
        }
    }
    // console.log(advStart);
    return getDigitalTime(advStart);
}
const [play_time,adv_time,logs] = ["02:03:55","00:14:15",["01:20:15-01:45:14", "00:40:31-01:00:00", "00:25:50-00:48:29", "01:30:59-01:53:29", "01:37:44-02:02:30"]];
console.log(solution(play_time,adv_time,logs));