// 클로저에 대해 좀더 자세하게 알아보자.

// 먼저 클로저는 함수와 함수가 선언된 렉시컬 환경의 조합이다.
// 이 말뜻이 뭐냐하면,

function func(){
    var ref = 'ref';
    function closure(){
        console.log(ref);
    }
    return closure;
}
var test1 = func();
test1();
// test1 이라는 변수에 내부함수를 리턴하는 func 를 호출했다.
// func 는 콜스택에 쌓이고, 함수가 실행되면, 함수 컨텍스트가 생성되고, 렉시컬환경이 생긴다.
// 변수객체, 스코프체인, this 가 결정되고, func 의 환경레코드에는 ref , function closure 가 있다.
// 내부함수를 리턴하면서 func 의 컨텍스트가 소멸되어도 여전히 ref 를 참조할 수 있다.
// 이렇게 클로저는 호출되었을때의 스코프를 참조하는것이 아니라,
// 함수가 선언된 렉시컬환경에서의 스코프를 참조한다.

function calc(initialNumber){
    var value = initialNumber;
    function getNumber(){
        return value;
    }
    function add(number){
        value+=number;
    }
    function minus(number){
        value-=number;
    }
    return{
        getNumber,add,minus
    }
}
const calc1 = calc(0);
const calc2 = calc(2);
calc1.add(2);
calc2.add(2);
// + - 를 수행하는 calc 함수를 만들어서, 각각 2 씩 더해주었다.
console.log(calc1.getNumber()); // 2 출력
console.log(calc2.getNumber()); // 4 출력

// calc1 은 처음시작 숫자가 0 이고 calc2 는 처음시작 숫자가 2 이고,
// 각각 2씩 더해주었다.
// 각각 2,4 를 출력하는데, 클로저는 렉시컬 환경을 공유하는것이 아니라, 각각 독립된 렉시컬 환경을 가진다.
// 또한 calc 의 value 에 접근 할수 있는방법은 오로지 클로저인 getNumber, add ,minus 함수 뿐이다.
// 이렇게 클로저는 전역변수의 사용을 억제하고, 변수를 의도치않게 바꾸게되어 발생하는 오류를 막을 수 있다.

const array = Array(5);
for(var i=0; i<array.length; i++){
    array[i] = function(){
        return i;
    }
}
for(var ii=0; ii<array.length; ii++){
    console.log(array[ii]());
}

// 길이가 5인 array 배열의 i 를 리턴하는 함수를 할당시키고 각각의 함수를 실행시켰다.
// 결과는 0,1,2,3,4 의 출력을 기대할 수 있겠지만, 결과는 5,5,5,5,5 이다.
// 이유가 뭘까?
// i 는 전역변수이다. 각각의 배열속의 함수들은 i를 리턴하므로 전역변수인 i 의 값을 참조한다.
// i 를 for 루프를 통해 5까지 증가되었으므로, array 의 각각의 함수를 호출했을때, 모두 i=5 를 참조하므로, 5,5,5,5,5 의 결과가 나오는것이다.

// 그렇다면 어떻게 원하는 결과인 0,1,2,3,4 를 출력하게 할 수 있을까?
// 클로저를 이용하여 독립적인 렉시컬환경을 만들어줘야한다.

const array1 = Array(5);
for(var j=0; j<array1.length; j++){
    array1[j] = (function(value){
        return function(){
            return value;
        }
    }(j));
}
for(var jj=0; jj<array1.length; jj++){
    console.log(array1[jj]());
}
// 첫번째 방법으로 즉시실행함수의 반환값으로 클로저 함수를 반환하는 방법이 있다.
// 즉시실행함수에 의해 반환된 함수는 각각의 독립된 렉시컬 환경을 가지게 된다.
const array2 = Array(5);
for(let k=0; k<array2.length; k++){
    array2[k] = function(){
        return k;
    }
}
for(let k=0; k<array2.length; k++){
    console.log(array2[k]());
}
// 두번째방법으론 ES6 의 let 이용하는것이다.

const array3 = Array(5).fill().map((v,i) => () => i );
array3.forEach(func => console.log(func()));

// 세번째 방법으론 고차함수를 이용하는 것이다.

// 자바스크립트의 컨텍스트가 어떻게 실행되는지 이해하고 있다면,
// 클로저는 이해하기가 수월하다.
// 또한 렉시컬 스코프는 코드문맥에 선언된 자리에서 결정 되기때문에,
// 함수를 호출 할때마다 바뀌는 것이 아니다.
// 클로저는 자바스크립트에서 매우 중요하기 때문에, 컨텍스트, 스코프와 함께 연관지어 공부해야한다.
// 클로저는 전역변수를 억제하고, 최신상태를 유지하고 최신상태를 참조할수 있기때문에, 매우 중요하나
// 클로저를 이용하여 참조 가능한 변수(지역변수)가 있다면, 메모리에서 지울수 없으므로, 메모리가 그만큼 필요한 단점이있다.
// 언제나 모든것이 그렇듯, 정확히 이해하고 상황에 맞게 쓰는게 중요하다.

