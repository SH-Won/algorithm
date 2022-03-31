// 클로저는 함수와 함수가 선언된 렉시컬 환경의 조합이다.

function Clock(time){
    let currentTime = time;
    const pass = (addTime) => currentTime+=addTime;
    const getTime = () => currentTime;
    return{
        pass,
        getTime
    }
}
const clock = Clock(10);
clock.pass(10);
console.log(clock.getTime());
clock.pass(20);
console.log(clock.getTime());
console.log(clock.currentTime) // undefined;
// 함수가 이미 실행되어 종료되어도, 함수내부의 지역변수에 도달 할 수 있다.
// 최신상태 유지가 가능하다