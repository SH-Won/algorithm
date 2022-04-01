// * 호이스팅 *
// var로 선언된 변수, 함수 선언문으로 선언된 함수는 모두 스코프의 최상단으로 이끌어져 올라온다.
// 허나, 함수표현식은 호이스팅이 되지않는다.
// const 와 let은 호이스팅이 되지 않는다고 생각하지만, 사실은 그렇지 않다.
// var 은 선언과 초기화가 동시에 되고, 호이스팅이 되기 때문에, 변수 선언전에 var(변수) 를 찾아도 undefined가 출력된다.
// let , const 는 var 와 다르게 선언만 될뿐, 초기화와 할당은 해당되는 코드에서 되기 때문에 변수 선언전의 let,const(변수)를 찾으면 refference error 가 출력된다.

// var 는 선언과 초기화가 동시에 이루어지고, 할당은 해당 코드에 도달했을때 이루어 진다. 스코프의 최상단으로 호이스팅된다.
console.log(a)  // 즉, undefined 가 출력된다 ;
var a = 1;
// const , let 은 선언단계 초기화단계 할당단계가 3단계로 이루어진다.
//console.log(b)  // 즉, 아직 초기화가 되지않았고, 선언만 된 상태이므로, reference Error ;
const b = 2;
console.log(b) // 선언 초기화 할당이 된상태이므로 2를 출력한다.
{
    // 아래의 console.log(a) 는 reference Error 가 발생하는데.
    // 만약에 const 가 호이스팅이 안된다면, 상위 스코프의 var a 변수를 참조해야 할것이다.
    // 하지만 reference Error 가 발생했다는 것은, 같은 블록스코프에 있는 const a  가 블록 스코프 최상단으로 호이스팅 되었다는 뜻이다.
    // 즉 const,let 은 해당 스코프의 최상단으로 호이스팅 된다.
    console.log(a); 
    const a = 1;
}

// 함수레벨 스코프

function print(a){
    console.log(a);
}
print(1) // 1이 출력됨
// 블록레벨 스코프
{
    const a = 2;
    console.log(a); // 2 가 출력됨
}