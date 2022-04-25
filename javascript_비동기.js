// 자바스크립트에는 비동기적으로 수행되는 것들이 있다.
// 예를 들어 내장되어있는 setTimeOut 함수나, 실제 api 에서 데이터를 받아오는 fetch 함수 등
// 코드를 위에서 아래로 동기적으로 수행되지않고,
// 비동기함수들을 만나면 백그라운드로 보내지고, 데이터를 받아오거나 약속된 시간이 되면,
// task queue 에 들어가게 된다.
// 이때 이벤트루프는 call stack 과 task queue 를 확인하면서, call stack 이 비어있다면,
// task queue 에 있는 것들을 하나씩 call stack에 올린다.


const a = 1, b = 2 , c= 3;

// console.log(a);
// setTimeout(() =>{
//     console.log(b);
// },1000);
// console.log(c);

// 위 코드의 실행의 결과값이 1 , 1초 후에 2 , 그다음 3이 출력될 것이라고 예상할수 있지만,
// setTimeout 함수는 비동기 함수이기때문에 결과값은 1 3 2 가 된다.
// setTimeout 함수의 시간을 0 으로 두고 하여도 일단 비동기 함수는 백그라운드로 보내지고 콜스택에 console.log(c) 가 남아있기때문데
// 결과는 1 3 2 가 된다.

// const getData = (callback) =>{
//     const data = 1;
//     callback(data);
// }
// const isValid = (data,callback) =>{
//     callback(data);
// }
// const printData = (data) => console.log(data);

// getData((data) =>{
//     isValid(data,()=>{
//         printData(data)
//     })
// })
// 위코드를 보면 콜백함수를 인자로 넘기고 또 그안의 콜백함수의 인자로 콜백함수로 넘기고,
// 이런식의 콜백함수를 계속 호출하는 방식은 가독성을 해칠뿐 아니라, 콜백지옥으로 나중에 코드를 관리하는데도 어려움이 생기게된다.
// 더군다나, 만약 getData의 변수인 data가 api로 불러오는 데이터일 경우에 언제 데이터를 다 가져올 수 있을지도, 정확히 알수가 없다.

// const getData = (callback) =>{
//     let data ;
//     setTimeout(() =>{
//         data = 1;
//     },1000);
//     callback(data);
// }
// const isValid = (data,callback) =>{
//     callback(data);
// }
// const printData = (data) => console.log(data);

// getData((data) =>{
//     isValid(data,()=>{
//         printData(data)
//     })
// })

// 위코드는 데이터를 불러오는데 1초가 걸린다고 가정했을때이다, 비동기 이기때문에 undefined 가 출력이 될것이다.
// 이와같이 비동기적으로 수행되는 여러가지 상황이 복합적으로 중첩이 되어있을때,
// 원하는 값들이 언제 어떻게 얻을 수 있는지 시간이 보장이 되질 못한다.
// 이런 비동기를 반드시 처리를 해줘야한다.

// const getData =  (url) =>{
//     return new Promise((res,rej)=>{ // res는 성공 rej 에러;
//         setTimeout(()=>{
//             res(url);
//         },1000)
//     })
// }

// const data1 = getData('비동기1');
// const data2 = getData('비동기2');

// 만약 위 data1 과 data2 의 두가지의 변수를 이용하여 어떤 것을 실행시켜야할때,
// 하나라도 원하는 값을 가져오지 못한다면, 실행시킬 수 없다.
// 또한 데이터를 가져오는 상황에서는 이데이터가 언제 몇초가 걸릴지 보장할수 없다.
// 이렇게 원하는 데이터를 가져오는것을 보장할수 있도록 ES6 에는 Promise 라는것이 존재한다.
// resolve 는 성공, reject 는 실패,

// data1.then(data => console.log(data)); // 비동기1 출력
// data2.then(data => console.log(data)); // 비동기2 출력
// then 메소드를 이용하여 깔끔하게 코드를 적을수 있다.
// 또한, .catch 메소드를 통해 rej 되었을때 에러 처리가 가능하다.

// aysnc await
// setTimeout 은 프로미스를 반환하지 않기 때문에 코드를 조금 변경

const fetchData = (timeDelay) => new Promise((res)=>{
    setTimeout(()=>{
        res([1,2,3,4]);
    },timeDelay)
}).then(result => result);

const getData = async () =>{
    console.log(1);
    const data = await fetchData(2000);
    console.log(data);
    console.log(2);
}
getData();
// async await 를 이용하여 비동기 함수를 동기적으로 수행시킬 수 있다.





