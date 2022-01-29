const getDigitalTime = (second) =>{
    const h = second / 3600 >> 0;
    const m = (second / 60) % 60 ;
    const s = second % 60 ;
    return `${h < 10 ? '0'+h : h}:${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}` 
}
const getSecond = (digitalTime) =>{
    const [h,m,s] = digitalTime.split(':');
    return h*3600 + m*60 + s*1;
}
const solution = (play_time,adv_time,logs)=>{
    const playTime = getSecond(play_time);
    const advTime = getSecond(adv_time);
    let times = Array(playTime+1).fill(0);
    for(let i=0; i<logs.length; i++){
        const [start,end] = logs[i].split('-');
        times[getSecond(start)]++;
        times[getSecond(end)]--;
    }
    for(let i=1; i<=playTime; i++) times[i] +=times[i-1];
    for(let i=1; i<=playTime; i++) times[i] +=times[i-1];
    
    let advStart = 0;
    let sum = times[advTime-1];
    for(let i=advTime-1; i<=playTime; i++){
        if(times[i] - times[i-advTime] > sum){
            sum = times[i] - times[i-advTime];
            advStart = i - advTime + 1
        }
    }
    return getDigitalTime(advStart);
}

