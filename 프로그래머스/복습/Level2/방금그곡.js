const m ="ABC"
const musicinfos = ["12:00,12:14,HELLO,C#DEFGAB", "13:00,13:05,WORLD,ABCDEF"]
console.log(solution(m,musicinfos))

function solution(m,musicinfos){
    let answer ="";
    let musicTime =0;
    m = m.replace(/C#/g,'c')
         .replace(/D#/g,'d')
         .replace(/F#/g,'f')
         .replace(/G#/g,'g')
         .replace(/A#/g,'a')


    for(let i=0; i<musicinfos.length; i++){
        let [start,end,mTitle,melody] =musicinfos[i].split(",");
        const [sHour,sMinute] = start.split(':').map(num =>+num);
        const [eHour,eMinute] = end.split(':').map(num =>+num);
        const time = (eHour - sHour) * 60 + (eMinute - sMinute);
        let fullMelody ='';
        melody = melody.replace(/C#/g,'c')
                       .replace(/D#/g,'d')
                       .replace(/F#/g,'f')
                       .replace(/G#/g,'g')
                       .replace(/A#/g,'a')
        for(let j=0; j<time; j++){
            fullMelody += melody[j % melody.length]
        }

        if(time > musicTime && fullMelody.includes(m)){
            answer = mTitle;
            musicTime = time;
        }
        
    }
    return answer==="" ? "(None)" : answer;
}