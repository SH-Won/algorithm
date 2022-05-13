//자바스크립트를 이용하여 DOM 에 이벤트를 부여할때 어떻게 동작하는지 알아보자.


// 먼저 DOM 을 불러오도록하자
const elements = document.querySelectorAll('div');
// html 에 DOM 구조를 보면 root(div) -> first (div) -> second (div) -> third (div)
// 이렇게 트리구조로 되어있다.

// 불러온 모든 div에 클릭하면 자신의 class 명을 console 에 찍는 이벤트를 부여해보자.

function onClick(e){
    console.log(e.currentTarget.className);
}
// * 이벤트 버블링 *
// elements.forEach(element => element.addEventListener('click',onClick));

// 제일 하위 element 인 third 를 클릭하면
// third , second , first ,root 로 4개가 출력이된다.
// 왜 하위 element 인 third 를 클릭했는데, 상위 element 까지 쭉 타고 올라가서 출력이 될까?
// 이유는 브라우저가 이벤트를 감지하는 방식 때문이다.
// 브라우저는 특정 화면 요소에서 이벤트가 발생하면, 그 이벤트를 최상위 element 까지 전파시킨다.
// 그러나 만약에 third 에만 이벤트가 달려있다면, third ,second ,first ,root 의 결과는 나오지않고 third 만 출력하게 된다.
// 이와 같이 하위 element 에서 상위 element 로 이벤트가 전파되는 방식을 이벤트 버블링(Event Bubbling) 이라고 한다.

// 그러면 상위 element 에서 하위 element 로 전파 되는 방식은 없을까?

// *이벤트 캡쳐링 *
elements.forEach(element => element.addEventListener('click',onClick, {capture:true})) // capture 의 default 는 false 입니다.
// 제일 하위 element 인 third 를 클릭하면, root , first ,second, third 순으로 출력이된다.
// 이렇게 가장 상위 element 에서 버블링과 반대로 이벤트를 탐색하는것을 이벤트 캡쳐링이라고한다.


// *이벤트 위임*
// 만약, 새로운 element 를 추가 하게 되었을때는 어떻게 동작할까?
// 먼저 버튼을 여러개 가지고있는 list 를 만들어보자.

const list = document.createElement('ul');
for(let i=0; i<3; i++){
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.innerText = `${i+1}`
    li.appendChild(btn);
    list.appendChild(li);
}
document.body.appendChild(list);

// 각각의 버튼에 자기자신의 text 를 출력하는 이벤트를 부여해보도록하자.
// list.childNodes.forEach(li => li.firstElementChild.addEventListener('click' , (e) => console.dir(e.target.innerText)))
list.addEventListener('click',e =>{
    if(e.target.tagName !== 'BUTTON') return;
    console.log(e.target.innerText);
})
// 각각의 버튼을 클릭했을때, 자기자신의 text를 잘 출력한다.
// 새로운 버튼을 추가하면 또 이벤트를 부여해야하는걸까?
// 새로운 버튼을 추가해보자.
const li4 = document.createElement('li');
const btn4 = document.createElement('button');
btn4.innerText = '4';
li4.appendChild(btn4);
list.appendChild(li4);
// 버튼 4 를 눌렀을때 자신의 text 인 4를 출력하지않는다.
// 이렇게 새로운 element가 추가 될때마다, 이벤트를 부여하는것은 매우 번거롭고 비효율적이다.
// 이런 번거롭고 비효율적인 것을 해결할 수 있는것이 이벤트 위임이다.

// 최상위 element 에만 이벤트를 부여한다.
// 48 라인으로 돌아가서. 최상위 element에 이벤트를 부여해보자

// 각각의 버튼을 눌렀을때 각각의 text가 잘 출력이된다.
const li5 = document.createElement('li');
const btn5 = document.createElement('button');
btn5.innerText = '5';
li5.appendChild(btn5);
list.appendChild(li5);

// 새로운 버튼을 추가시켜도 이젠 이벤트가 동작이 잘된다.
// 이벤트 위임은 매우 효율적이므로 반드시 알아둬야할 개념이다.




