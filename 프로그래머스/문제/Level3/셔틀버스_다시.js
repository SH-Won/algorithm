//const [n,t,m,timetable] = [1,1,5,["08:00", "08:01", "08:02", "08:03"]];
// const [n,t,m,timetable] =[2,10,2,["09:10", "09:09", "08:00"]];
const [n,t,m,timetable] = [10,60,45,["23:59","23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59"]];
const solution = (n,t,m,timetable) =>{
    const bus = Array(n).fill(0).map((_,i) => 540 + t*i);
    let answer ;
    timetable = timetable.map(string =>{
        const [hour,minute] = string.split(':').map(num => +num);
        return hour*60 + minute;
    });
    let crew = timetable.sort((a,b)=>a-b).filter(num => num <= bus[n-1]);
    for(let i=0; i<bus.length; i++){
        const count = crew.filter(time => time <= bus[i]).length;
        if( i === n-1){
            const conTime = count >= m ? crew[m-1] - 1 : bus[i];
            const [hour,minute] = [Math.floor(conTime / 60), conTime % 60];
            answer = `${hour < 10 ? "0"+hour : hour}:${minute < 10 ? "0"+minute : minute}`;
        }
        else{
           const crewOnBus = count >=m ? m : count;
           crew.splice(0,crewOnBus);
        }
    }
    return answer;
}
console.log(solution(n,t,m,timetable));