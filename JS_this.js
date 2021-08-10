// // 화살표함수의 this는 항상 상위 스코프의 this 이다.
// // 자바스크립트의 this는 함수를 어떻게 호출하느냐에 따라 달라진다

// function Person(name,age){
//     this.name = name;
//     this.age = age;
//     this.sayName = function(){
//         console.log(this.name)
//     }
// }
// const obj ={
//     name:"성호",

// }
// const person1 = new Person("지은",31);
// person1.sayName.call(obj);

// function Car(name,speed){
//     this.name = name;
//     this.speed = speed;
// }
// function getSpeed(){
//     console.log(this.speed);
// }
// Car.prototype.getSpeed = function (){
//     getSpeed.call(this);
// }
// const sonata = new Car("sonata",40);
// sonata.getSpeed();

const array = [1,2,3,4,5];

//let isArr = array.reduce((isArr,num)=>{console.log(num); return num===2 || isArr} ,false)
let isArr = array.some(num => {console.log(num); return num===2});
console.log(isArr);