const solution = (n,t,m,timetable) =>{
    let bus = Array.from({length:n},(_,i)=> 540 + i*t);
    let crew = Array.from({length:timetable.length},(_,i)=>{
        const [hour,minute] = timetable[i].split(':');
        return 60 * hour + 1 * minute;
    }).sort((a,b)=>a-b);

    for(let i=0; i<bus.length; i++){
        const crewOnBus = crew.filter(time => time <= bus[i]);
        if(i === bus.length -1){
            const conTime = crewOnBus.length >= m ? crew[m-1]-1 : bus[i];
            const [hour,minute] = [conTime / 60 >>0 , conTime % 60];
            return `${hour < 10 ? '0'+hour : hour}:${minute < 10 ? '0'+minute : minute}`
        }
        else{
            const crewCount = crewOnBus.length >= m ? m : crewOnBus.length;
            crew.splice(0,crewCount);
        }
    }
}
// console.log(solution(1,1,5,["08:00", "08:01", "08:02", "08:03"]))
// console.log(solution(2,10,2,["09:10", "09:09", "08:00"]))
// console.log(solution(2,1,2,["09:00", "09:00", "09:00", "09:00"]))
// console.log(solution(1,1,5,["00:01", "00:01", "00:01", "00:01", "00:01"]))
// console.log(solution(1,1,1,["23:59"]))
console.log(solution(10,60,45,["23:59","23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59"]))