// 동영상 재생시간 = 재생이 종료된 시각 - 재생이 시작된 시각
const getDigitalTime = (second) =>{
    const h = second / 3600 >>0
    const m =  ((second % 3600) / 60) >>0;
    const s = second % 60;
    return `${h < 10 ? '0'+h : h}:${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
}
const getSecond = (timeString) =>{
    const [hour,minute,second] = timeString.split(':');
    return 3600 * hour + 60 *minute + 1*second;
}
const solution = (play_time,adv_time,logs) =>{
    const playTime = getSecond(play_time);
    const advTime = getSecond(adv_time);
    let times = Array(playTime).fill(0);
    for(let i=0; i<logs.length; i++){
        const [start,end] = logs[i].split('-');
        const [startSec,endSec] = [getSecond(start),getSecond(end)];
        times[startSec]++;
        times[endSec]--; 
    }
    for(let i=1; i<=playTime; i++){
        times[i]+= times[i-1];
    }
    for(let i=1; i<=playTime; i++){
        times[i]+= times[i-1];
    }
    
    let max = times[advTime-1];
    let insertTime =0;
    for(let i=advTime-1; i<playTime; i++){
        if(times[i] - times[i-advTime] > max){
             max = times[i] - times[i-advTime];
             insertTime = i - advTime + 1;
            
        }
    }
    return getDigitalTime(insertTime);
}
console.log(solution("02:03:55","00:14:15",["01:20:15-01:45:14", "00:40:31-01:00:00", "00:25:50-00:48:29", "01:30:59-01:53:29", "01:37:44-02:02:30"]))
console.log(NaN < 1);