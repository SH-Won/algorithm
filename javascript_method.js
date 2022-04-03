const array = [1,2,3,4];
const obj = {a:1,b:2,c:3,d:4};
// map
// map 메소드는 새로운 배열을 반환함, 콜백함수를 이용하여 원소를 원하는대로 조작할수 있음
const mapArr = array.map(el => el); 
console.log(array === mapArr) // false;

//filter
