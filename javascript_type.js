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
// matrix[0] 과 part 는 서로 다른 메모리 주소를 가지고 있다