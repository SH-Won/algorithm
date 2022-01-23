const secondToTime = (second) =>{
    let h = second / 3600 >> 0;
    let m = (second / 60) % 60  >>0;
    let s = second % 60 >> 0;
    h = h < 10 ? '0'+h : h;
    m = m < 10 ? '0'+m : m;
    s = s < 10 ? '0'+s : s;
    return h+':'+m+':'+s
}
const timeToSecond = (digitalTime) =>{
    const [hour,minute,second] = digitalTime.split(':');
    return hour * 3600 + minute * 60 + second * 1;
}
const solution = (play_time,adv_time,logs) =>{
    const [playTime,advTime] = [timeToSecond(play_time),timeToSecond(adv_time)];
    let time = Array(playTime+1).fill(0);
    for(let i=0; i<logs.length; i++){
        const [startTime,endTime] = logs[i].split('-');
        time[timeToSecond(startTime)]++;
        time[timeToSecond(endTime)]--;
    }
    for(let i=1; i<=playTime; i++) time[i] += time[i-1];
    for(let i=1; i<=playTime; i++) time[i] += time[i-1];

    let advSum = time[advTime-1];
    let advStart = 0;
    for(let i=advTime-1; i<playTime; i++){
        if(advSum < time[i] - time[i-advTime]){
            advSum = time[i] - time[i-advTime];
            advStart = i - advTime + 1;
        }
    }
    return secondToTime(advStart);
}