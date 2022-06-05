// 자바스크립트의 원시타입
// String , Number, boolean ,undefiend , boolean , Symbol , null

let a = 1;
let b = a;
console.log(a,b) // 1 1 출력
// 모든 원시값은 불변하여 변형 할 수가 없다.
// b 에 a 를 할당 ->  a 에 해당되는 1이 b 에 그대로 같은 값이 새롭게 할당됨.

let str = 'string';
console.log(str.toUpperCase()) // STRING 출력
str.toUpperCase();
console.log(str) // string 출력
// 변수의 값을 재할당은 할수 있으나, 할당된 원시 값은 변형 시킬 수 없다
str[0] = 't';
console.log(str); // string 출력

// 자바스크립트 참조타입
const arr = [1,2,3,4];
const arr1 = arr;
arr[0] = 2; // 첫번째 인덱스의 값을 2로 변경
console.log(arr,arr1) // [2,2,3,4] [2,2,3,4] 출력
// arr1 에 arr 을 할당. arr의 [1,2,3,4] 의 값이 그대로 복사 되는 것이아니다.
// [1,2,3,4] 를 가르키고 있는 메모리 주소를 arr 에 할당했고,
// arr1 에는 arr이 가르키고 있는 [1,2,3,4] 의 주소가 할당 된것이다.
// 즉 arr1 와 arr 은 같은 주소를 바라보고 있다.
// 그러므로 arr의 원소들을 바꾸면 같은 주소인 arr1 의 원소도 똑같이 바뀌게 되는것이다.
arr1[0] = 1;
console.log(arr,arr1); // [1,2,3,4] [1,2,3,4] 출력

let obj = {'a' : 1, 'b' : 2};
let obj1 = obj;
obj['a'] = 2;
console.log(obj,obj1); // 위의 배열과 같은 원리
// 하지만 obj1 을 직접적으로 할당했을시 obj 와 obj1이 가르키는 주소의 값이 다르기 때문에
// 둘은 같은 주소를 공유하고 있지않는다.
obj1 = {'a':3, 'b':4};
console.log(obj,obj1);

const matrix = [[1,2,3],[4,5,6],[7,8,9]];
const part = matrix[0];
console.log(matrix[0] === part); // true 출력
// matrix[0] 과 part 는 같은 메모리주소를 공유
matrix[0] = [10,11,12];
console.log(part);  // [1,2,3] 출력
// matrix[0] 과 part는 같은 메모리주소를 가지고 있었지만, matrix[0]을 새롭게 할당했으므로,
// matrix[0] 과 part 는 서로 다른 메모리 주소를 가지고 있다.


// 래퍼 객체
const string = 'string';
console.log(string.length); // 6 출력;
// 래퍼 객체는 String, Number , Boolean 이 있다.
// 자바스크립트는 string 이라는 변수의 프로퍼티인 length 에 도달하기위해
// 오토박싱(auto boxing) 을 하여 임시적으로 string 을 new String('string') 으로 만든다.
// new String('string')으로 만든 임시 객체는
// { 0:'s' , 1:'t' , 2:'r' , ..... , length: 6} 인데.
// 여기서 필요한 프로퍼티인 length 에 도달하고 나서 임시 객체는 사라진다.
// 여기서 중요한 부분은 string 변수의 'string' 의 원시값에 전혀 변동을 주지 않는다는 점이다.

// 문제

const createObj = (obj) =>{
    obj.gender = 'male';
    obj = {
        name: 'jenny',
        gender: 'female'
    }
    return obj;
}

const person1 = {name:'seong ho', gender:'female'};
const person2 = createObj(person1);

// 결과는 어떻게 될까?
// createObj 함수의 인자인 obj 는 person1 과 같은 주소를 가지게되고
// 같은 주소를 가진 obj 의 프로퍼티를 변경하면 person1 의 프로퍼티도 동시에 바뀐다.
// 그리고 나서 obj 의 주소를 아예 다른 객체를 바라보는 주소로 바꾸고 person2 에 리턴을 한다.
// 결과는 다음과같다.
console.log(person1); // { name: 'seong ho', gender: 'male' }
console.log(person2); // { name: 'jenny', gender: 'female' }

// 자바스크립트의 원시타입(Primitive Type)

// String, Number, Boolean, undefined , null , Symbol 로 총 6가지이다.

// 나머지는 모두 객체이다, 물론 함수도 객체이다.

//    1. Call by Value

//   모든 원시값은 불변하여 변형 할수 없다.

// let a = 1;
// let b = a;
// console.log(a,b) // 1 1 출력

//  변수 b에 a 의 값 1을 할당하였다.
//  변수의 a 의 할당된 값(value) 이 a에 그대로 복사

// let str = 'string';
// console.log(str.toUpperCase()) // STRING 출력
// str.toUpperCase();
// console.log(str) // string 출력
// str[0] = 't';
// console.log(str); // string 출력 

// 변수 str 의 'string' 을 할당 
// 'string'은 문자열이므로 원시타입 String 에 해당
// toUpperCase() 내장 함수를 실행해도 str 불변
// 'string' 의 첫 문자 s 를 t로 바꾸어도 str 불변

 

// ※ 자바스크립트의 원시타입은 값을 변화 시킬 수 없다



//   2. Call by Reference

// 객체는 모두 참조 타입이다. 원시 타입은 변수가 값 자체를 저장하고 있지만, 객체는 주소를 저장한다.

// const arr = [1,2,3,4];
// const arr1 = arr;
// arr[0] = 2; // 첫번째 인덱스의 값을 2로 변경
// console.log(arr,arr1) // [2,2,3,4] [2,2,3,4] 출력

// arr 변수에 배열 [1,2,3,4] 를 할당
// arr1 변수에 arr 할당
// arr 의 첫번째 인덱스의 값을 2로 재할당
// 출력 결과 arr 과 arr1 이 모두 바뀌었다.

// 예를 들어, arr 에 저장된 주소가 address1 이라고 하자.

// arr1 에는 arr 을 할당 했기에 address1 이 저장된다.

// 메모리(heap)에 address1 로 참조 할 수 있는 진짜 값  [1,2,3,4] 가 존재한다.

// arr 자체를 변경하게 되면 주소의 값이 달라지므로, arr 과 arr1은 다른 주소를 가지고 있겠지만,

// arr 의 원소를 바꾸면 같은 주소를 바라보는 arr1 도 arr 과 똑같이 바뀌게 되는 것이다.

// let obj = {'a' : 1, 'b' : 2};
// let obj1 = obj;
// obj['a'] = 2;
// console.log(obj,obj1); // 위의 배열과 같은 원리

// 원시타입을 제외한 모든 객체는 참조타입이다

// obj1 = {'a':3, 'b':4};
// console.log(obj,obj1);

// 위에서 말했듯이 obj1 에 아예 다른 주소를 할당하면, obj 와 obj1 은 다른 주소이므로 출력값이 다르다.



// 래퍼 객체 (Wrapper Object)

// const string = 'string';
// console.log(string.length); // 6 출력;

// 래퍼 객체는 String, Number , Boolean 이 있다.

// 자바스크립트는 string 이라는 변수의 프로퍼티인 length 에 도달하기 위해 ,오토박싱(auto boxing) 을 하여 임시적으로 string 을 new String('string') 으로 만든다.

// new String('string')으로 만든 임시 객체는 { 0:'s' , 1:'t' , 2:'r' , ..... , length: 6} 인데.

// 여기서 필요한 프로퍼티인 length 에 도달하고 나서 임시 객체는 사라진다.

// 여기서 중요한 부분은 string 변수의 'string' 의 원시값에 전혀 변동을 주지 않는다는 점이다.



// 문제 ) 다음 콘솔의 결과는 어떻게 될까요?

// const createObj = (obj) =>{
//     obj.gender = 'male';
//     obj = {
//         name: 'jenny',
//         gender: 'female'
//     }
//     return obj;
// }


// const person1 = {name:'seong ho', gender:'female'};
// const person2 = createObj(person1);

//   요약

// 자바스크립트에서 원시 타입은 그 값을 그대로 복사한다

// String, Number, null , Boolean 값 , undefined , Symbol(ES6) 를 제외한 모든 객체는 참조형태 이므로 항상 이 개념을 숙지해서 코드를 적어야 한다.

// 자바스크립트의 원시 타입을 제외하면 모든 것은 객체이다.

// 자바스크립트의 String Number boolean 은 원시 타입 이면서 래퍼 객체이다.

// 원시 타입을 다른 변수에 할당 할 때 그 값을 그대로 복사하지만,

// 객체를 다른 변수에 할당 할 때는 그 값을 복사하는 것이 아니라 실제 객체를 바라보고 있는 주소를 복사한다.



// 문제 답)
// 결과는 어떻게 될까?
// createObj 함수의 인자인 obj 는 person1 과 같은 주소를 가지게되고
// 같은 주소를 가진 obj 의 프로퍼티를 변경하면 person1 의 프로퍼티도 동시에 바뀐다.
// 그리고 나서 obj 의 주소를 아예 다른 객체를 바라보는 주소로 바꾸고 person2 에 리턴을 한다.
// 결과는 다음과같다.
// console.log(person1); // { name: 'seong ho', gender: 'male' }
// console.log(person2); // { name: 'jenny', gender: 'female' }