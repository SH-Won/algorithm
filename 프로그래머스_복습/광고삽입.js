const getDigitalTime = (sec) =>{
    let hour = sec / 3600 >> 0;
    let minute = (sec / 60 >> 0) % 60;
    let second = sec % 60;
    hour = hour < 10 ? `0${hour}` : hour;
    minute = minute < 10 ? `0${minute}` :minute;
    second = second < 10 ? `0${second}` : second;
    return `${hour}:${minute}:${second}`
}
const getSec = (digitalTime) =>{
    const [hour,minute,second] = digitalTime.split(':').map(Number);
    return hour*3600 + minute*60 + second;
}

const solution = (play_time,adv_time,logs) =>{
    const playTime = getSec(play_time);
    const advTime = getSec(adv_time);
    let times = Array(playTime).fill(0);
    for(let i=0; i<logs.length; i++){
        const [start,end] = logs[i].split('-');
        const [startTime,endTime] = [getSec(start),getSec(end)];
        times[startTime]++;
        times[endTime]--;
    }
    for(let i=1; i<=playTime; i++){
        times[i]+=times[i-1];
    }
    for(let i=1; i<=playTime; i++){
        times[i]+=times[i-1];
    }
    let playSum = times[advTime-1];
    let advStart = 0;
    for(let i=advTime-1; i<playTime; i++){
        if(playSum < times[i] - times[i-advTime]){
            playSum = times[i] - times[i-advTime];
            advStart = i - advTime + 1;
        }
    }
    return getDigitalTime(advStart);
}
const [play_time,adv_time,logs] = ["02:03:55","00:14:15",["01:20:15-01:45:14", "00:40:31-01:00:00", "00:25:50-00:48:29", "01:30:59-01:53:29", "01:37:44-02:02:30"]];
console.log(solution(play_time,adv_time,logs));

let string = 'ab0c';
console.log(string.replace(/[0-9]/g,""));
console.log(string)
console.log('foo010bar020.zip'.search(/[0-9]/g));
console.log('foo010bar020.zip'.search(/[a-z]/g,))
let array = ['bcs','acs'];
array.sort((a,b)=> a.localeCompare(b));
console.log(array);