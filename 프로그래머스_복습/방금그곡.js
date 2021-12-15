const solution = (m,musicinfos) =>{
    let answer ='(None)';
    let maxTime = 0;
    m = m.replace(/C#/g,'c')
         .replace(/D#/g,'d')
         .replace(/F#/g,'f')
         .replace(/G#/g,'g')
         .replace(/A#/g,'a')
    
    for(let i=0; i<musicinfos.length; i++){
        let [start,end,title,melody] = musicinfos[i].split(',');
        const [sHour,sMinute] = start.split(':');
        const [eHour,eMinute] = end.split(':');
        const time = (60 * eHour + 1*eMinute) - (60 *sHour + 1*sMinute);
        melody = melody.replace(/C#/g,'c')
                       .replace(/D#/g,'d')
                       .replace(/F#/g,'f')
                       .replace(/G#/g,'g')
                       .replace(/A#/g,'a');
        melody = melody.repeat(Math.ceil(time / melody.length)).substring(0,time);
        console.log(melody);
        if(time > maxTime && melody.includes(m)){
            maxTime = time;
            answer = title;
        }
    }
    return answer;
}
console.log(solution("CC#BCC#BCC#BCC#B",["03:00,03:30,FOO,CC#B", "04:00,04:08,BAR,CC#BCC#BCC#B"]))