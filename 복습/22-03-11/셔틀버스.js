
const solution = (n,t,m,timetable) =>{
     const bus = Array.from({length:n},(_,i) => 540+(i*t));
     const time = timetable.map(time => time.split(':').reduce((acc,cur,idx) => acc+=(idx === 0 ? cur*60 : cur*1),0)).sort((a,b) => a-b);
     for(let i=0; i<bus.length; i++){
         const busTime = bus[i];
         const ridableCount = time.filter(t => t <= busTime).length;
         const onBus = ridableCount >= m ? m : ridableCount;
         if(i === n-1){
             const conTime = onBus !== m ? busTime : time[m-1]-1;
             const [hour,minute] = [Math.floor(conTime/60) , conTime % 60]; 
             return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}`:minute}`
         }
         else{
             time.splice(0,onBus);
         }
     }
}
// console.log(solution(1,1,5,["08:00", "08:01", "08:02", "08:03"]))
// console.log(solution(2,10,2,["09:10", "09:09", "08:00"]))
console.log(solution(2,1,2,["09:00", "09:00", "09:00", "09:00"]))