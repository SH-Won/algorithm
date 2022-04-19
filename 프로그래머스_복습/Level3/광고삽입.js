const getDigitalTime = (seconds) =>{
    const hour = Math.floor(seconds / 3600);
    const minute = Math.floor(seconds / 60) % 60;
    const second = seconds % 60;
    return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}`: minute}:${second < 10 ? `0${second}` : second}`
}
const getSeconds = (time) =>{
    const [hour,minute,second] = time.split(':');
    return hour*3600 + minute*60 + second*1;
}
const solution = (play_time,adv_time,logs) =>{
    const times = Array(getSeconds(play_time)+1).fill(0);
    const advTime = getSeconds(adv_time);
    logs.forEach(log =>{
        const [start,end] = log.split('-')
        times[getSeconds(start)]++;
        times[getSeconds(end)]--;
    })
    
    for(let i=1; i<times.length; i++) times[i]+=times[i-1];
    for(let i=1; i<times.length; i++) times[i]+=times[i-1];

    let maxTime = times[advTime-1];
    let answer = 0;
    for(let i=advTime; i<times.length; i++){
        if(times[i] - times[i-advTime] > maxTime){
            maxTime = times[i] - times[i-advTime];
            answer = i - advTime + 1;
        }
    }
    return getDigitalTime(answer);
}
// console.log(solution('02:03:55','00:14:15',["01:20:15-01:45:14", "00:40:31-01:00:00", "00:25:50-00:48:29", "01:30:59-01:53:29", "01:37:44-02:02:30"]))
console.log(solution('99:59:59','25:00:00',["69:59:59-89:59:59", "01:00:00-21:00:00", "79:59:59-99:59:59", "11:00:00-31:00:00"]))