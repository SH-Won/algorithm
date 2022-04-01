// 자바스크립트에서 this 는 어떻게 호출되었는지에 따라 달라진다.
// 일반적으로 일반함수,콜백함수,내부함수 의 this 는 전역(global) 을 가라킨다.

// 1. 객체의 메소드의 this는 객체 자신을 가리킨다.
const obj = {
    name : 'javascript',
    title : 'this',
    getName : function(){
        console.log(this.name);
    },
    getTitle : function(){
        function printTitle(){
            console.log(this.title);
        }
        printTitle();
    }
}
obj.getName() // javascript 출력

// 2. 내부함수의 this 는 전역을 가리킨다.
obj.getTitle(); // undefined 출력;

const obj2 = {
    name : 'javascript',
    title : 'this',
    getName : function(){
        console.log(this.name);
    },
    getTitle : function(){
        const printTitle = () =>{
            console.log(this.title);
        }
        printTitle();
    }
}
// 3. ES6 의 화살표 함수를 이용하여 내부함수,콜백함수의  this 를 바인딩하기.
obj2.getTitle() // this 출력

//4. call, apply, bind 를 이용하여 this 를 바인딩 하기.

function print(a,b){
    console.log(`${this.name} ${a} ${b}`);
}
const obj3 = {
    name:'obj3',
}
const obj4 = {
    name:'obj4',
}
print() // undefined 출력
print.call(obj3,1,2); // obj3 1 2 출력
print.apply(obj4,[1,2]) // obj4 1 2 출력 call 과다르게 다음 파라미터는 배열로 들어가야한다.
const bindPrint = print.bind(obj3,1,2); // bind 는 this를 바인딩한 함수를 반환한다.
bindPrint(); // obj3 1 2 출력

//5. 생성자 함수의 this;
// 생성자 함수는 암묵적으로 this 객체를 만들고, 인스턴스에 this를 바인당하고 this를 반환한다.

function Person(name,age){
    this.name = name;
    this.age = age;
}
function getInfo(){
    console.log(`${this.name} ${this.age}`);
}
function getInfo1(){
    getInfo.call(this);
}
Person.prototype.getInfo = getInfo;

const sh = new Person('seongho',100);
const sm = new Person('somi',99);
sh.getInfo(); // seongho 100 출력
sm.getInfo(); // somi 99 출력

Person.prototype.getInfo1 = getInfo1;
sh.getInfo1(); //seongho 100 출력
sm.getInfo1(); //somi 99 출력






