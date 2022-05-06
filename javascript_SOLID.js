// Javascript 에서도 SOLID 원칙 ... ?

// 서로간의 종속성을 최소한으로 해둔다면, 변경이 발생 했을때, 다른 영역에 
// 영향을 주지 않고 변경 할 수 있다.
// 변경에 유연한 구조를 만든다면, 훨씬 더 좋은 코드를 작성 할수 있을 것이다.

// 함수형 프로그래밍에서의 SOLID (?);

// 1. S - Single responsibility principle (단일 책임 원칙)

// 함수는 오직 하나의 책임을 져야한다.
// ex) 가위,칼 이 모두 붙어있는 만능도구 vs 가위
// 1개의 함수는 1개의 역할만 수행하므로 만능도구는 x 가위 o

// ex ) 3의 배수의 숫자만 콘솔에 찍어보도록하자.

const array = Array(30).fill().map((v,i)=> i+1);
const printNumber = (array) =>{
    return array.filter(isTripled).forEach(num => console.log(num));
}
const isTripled = (number) =>{
    return number % 3 === 0;
}
printNumber(array);

// 매개함수로 쓰일수 있는것들은 쪼개주는게 좋다
// filter(...) , map(...) , sort(...) , forEach(...), some(...) 등등


// 2. O - Open/Closed Principle 개방/폐쇄 원칙
// 확장에는 열려있으나, 변경에는 닫혀있어야한다.
// ex) 컴퓨터에는 수많은 부품이 들어간다.


