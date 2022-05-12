// 프로토타입 체인을 이해하기 위해선 관계를 이해하고 있어야한다.
console.log(Object.__proto__ === Function.prototype); // true
console.log(Array.__proto__ === Function.prototype) //true
console.log(Object.prototype.__proto__ === null) // true
// 프로토타입체인의 끝은 null 이라는 사실을 알수 있다.

console.log(Function.prototype.__proto__ === Object.prototype); // true

// 생성자 함수를 만들어서 관계를 살펴보자.
function Parent(name){
    this.name = name;
}
const parent = new Parent('par');
console.log(parent.__proto__ === Parent.prototype); // true
console.log(parent.constructor === Parent) // true;
console.log(parent.__proto__.__proto__ === Object.prototype); //true
console.log(Parent.__proto__ === Function.prototype); // true;
console.log(Parent.__proto__.__proto__ === Object.prototype); // true

function Child(name,age){
    this.name = name;
    this.age = age;
}
// 생성자 함수의 Parent 의 메소드를 추가하고 그 메소드를 Child 가 사용할수 있게 상속을 해본후 관계를 파악해보자
Parent.prototype.sayName = function(){ console.log(this.name) };

parent.sayName(); // par 이 출력이 잘된다.
Child.prototype = Object.create(Parent.prototype); // 상속을 해보자.
const child = new Child('chi',20);
child.sayName(); // chi 출력
console.log(child.constructor) // Parent 이다.
// 무언가 이상하다. child 의 constructor 는 Child 가 되야한다.
// 이유는 child.__proto__ 로 참조 할수 있는 Child.prototype 이 Parent.prototype 이기때문에
// child.constructor 는 Parent 인 것이다.
Child.prototype.constructor = Child; // Child 로 바꿔주도록하자.
// 이제 Child 에 새로운 메소드를 추가해보자
Child.prototype.sayAge = function() { console.log(this.age)};
console.log(child.constructor) // Child 로 출력이 잘된다.
child.sayAge(); // 20 으로 출력이 잘된다.

// parent.sayAge();  // parent 는 Child 의 메소드를 사용할수 없다.
child.sayName(); // 하지만 child는 Parent 의 메소드를 사용 할 수 있다.

console.log(child.__proto__ === Child.prototype); // true
console.log(child.__proto__.__proto__ === Parent.prototype); //true
// 프로토타입이 체인처럼 연걸되 있는 것을 볼수 있다.
console.log(child.__proto__.__proto__.__proto__ === Object.prototype); // true
console.log(child.__proto__.__proto__.__proto__.__proto__ === null) // true
// 프로토타입체인의 제일 끝은 null 이다.
console.log(parent.__proto__.__proto__ === Object.prototype) // true
console.log(parent.constructor.__proto__  === Function.prototype) // true


// 객체 지향 프로그래밍을 해보자.
