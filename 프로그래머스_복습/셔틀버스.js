const [n,t,m,timetable] = [1,1,5,["08:00", "08:01", "08:02", "08:03"]];
//const [n,t,m,timetable] =[2,10,2,["09:10", "09:09", "08:00"]];
//const [n,t,m,timetable] = [10,60,45,["23:59","23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59"]];
const solution = (n,t,m,timetable) =>{
    const bus = Array.from({length:n},(_,i)=> 540+i*t);
    timetable.forEach((time,index)=>{
        const [hour,minute] = time.split(':');
        timetable[index] = parseInt(hour)*60 + parseInt(minute);
    })
    timetable.sort((a,b)=>a-b);
    
    let answer ;
    for(let i=0; i<n; i++){
        const crew = timetable.filter(time => time <= bus[i]);
        if(i === n-1){
            
           const conTime = crew.length >= m ? crew[m-1]-1 : bus[i];
           const [hour,minute] = [Math.floor(conTime / 60), conTime % 60];
           answer = `${hour < 10 ? "0"+hour : hour}:${minute <10 ? "0"+minute : minute}`

        }
        else{
            const crewOnBus = crew.length > m ? m : crew.length;
            timetable.splice(0,crewOnBus);
        }
    }
    return answer
}
console.log(solution(n,t,m,timetable));