const solution = (n,t,m,timetable) =>{
    let bus = Array.from({length:n},(_,i)=> 540 + i*t);
    let crews = Array.from({length:timetable.length},(_,i)=>{
        const [hour,minute] = timetable[i].split(':');
        return hour*60 + minute*1;
    }).sort((a,b)=>a-b);
    for(let i=0; i<bus.length; i++){
        const rideable = crews.filter(crew => crew <= bus[i])
        if(i === bus.length-1){
           const conTime = rideable.length >=m ? crews[m-1]-1 : bus[i];
           const [hour,minute] = [conTime / 60 >>0 ,conTime % 60];
           const answer = `${hour < 10 ? "0"+hour : hour}:${minute < 10 ? "0"+minute : minute}`;
           return answer;
        }
        else{
            const crewOnBus = rideable.length >= m ? m : rideable.length;
            crews.splice(0,crewOnBus);
        }
    }
}