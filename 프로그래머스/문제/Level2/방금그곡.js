console.log(solution("CC#BCC#BCC#BCC#B",["03:00,03:30,FOO,CC#B", "04:00,04:08,BAR,CC#BCC#BCC#B"]))

function solution(m, musicinfos) {
    let answer = '';

    let musicLength = 0;
    m = m.replace(/C#/g,'c')
         .replace(/D#/g,'d')
         .replace(/F#/g,'f')
         .replace(/G#/g,'g')
         .replace(/A#/g,'a')
    
    
    musicinfos.forEach(info =>{
        let [start,end,title,melody] = info.split(',');
        const [startHour,startMinute] = start.split(':').map(num =>+num);
        const [endHour,endMinute]=end.split(':').map(num => +num);
        let time= (endHour-startHour) *60 + (endMinute-startMinute);
        melody = melody.replace(/C#/g,'c')
                       .replace(/D#/g,'d')
                       .replace(/F#/g,'f')
                       .replace(/G#/g,'g')
                       .replace(/A#/g,'a')
        
        let melodyStr ='';
        let i=0;
        while(time--){
            
            melodyStr+=melody[i % melody.length]
            i++
        }
        

        if(melodyStr.includes(m)){
            if(melodyStr.length > musicLength){
                answer = title;
                musicLength=melodyStr.length;
            }
        }
        
        
    })
    return answer==="" ? '(None)': answer;
}