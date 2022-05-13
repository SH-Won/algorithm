// 9:00 부터 n회 t분 간격 버스
// 9:00 에 버스가 도착하면 9:00 도착한 크루도 탑승 가능
// 귀찮은 콘은 최대한 늦게 출근하고 싶어함 근데 출근은 꼭 해야함
const solution = (n,t,m,timetable) =>{
    const bus = Array.from({length:n},(_,i) => 540 + (i*t));
    timetable = timetable.map(time => time.split(':').reduce((acc,cur,idx) => acc+=(+cur * 60 / Math.pow(60,idx)),0)).sort((a,b) => a-b);
    for(let i=0; i<n; i++){
        const ridable = timetable.filter(time => time <= bus[i]);
        const crewCount = ridable.length >= m ? m : ridable.length;
        if(i === n-1){
            const conTime = crewCount === m ? timetable[m-1]-1 : bus[i];
            const [hour,minute] = [Math.floor(conTime / 60) , conTime % 60];
            return `${hour < 10 ? '0'+hour : hour}:${minute < 10 ? '0'+minute : minute}`
        }
        else timetable.splice(0,crewCount);
    }
}