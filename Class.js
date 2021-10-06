// const N = 4;
// // class 는 호이스팅 안됨
// // class Love {
// //     constructor(y,x){
// //         this.y = y;
// //         this.x = x;
// //     }
// //     spread(){
// //        distance.forEach(([my,mx])=>{
// //            const [ny,nx] = [this.y+my , this.x+mx];
// //            if(!isValidPos(ny,nx) || board[ny][nx] ) return
// //            board[ny][nx] = new Love(ny,nx);
// //        })
// //     }
// // }
// Love.prototype.spread =function() {
//     distance.forEach(([my,mx])=>{
//         const [ny,nx] = [this.y+my , this.x+mx];
//         if(!isValidPos(ny,nx) || board[ny][nx] ) return
//         board[ny][nx] = new Love(ny,nx);
//     })
// }


// const distance = [[1,0],[-1,0],[0,1],[0,-1]];
// const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N)

// let loves = [new Love(0,0),new Love(3,3),new Love(0,3),new Love(3,0)];
// //Love.prototype.isValidPos = isValidPos;
// //Love.prototype.distance = distance;

// let board = Array.from({length:N},()=>Array(N).fill(0));
// //Love.prototype.board = board;
// loves[0].spread(); // 객체의 스코프는 코드 문맥상인가? 이게 어떻게 렉시컬 스코프이지?
// loves[1].spread(); // 함수를 호출한 시점이 여기 이므로 board 와 distance isValidPos 를 참조 할수 있는것 인가?
// loves[2].spread();
// loves[3].spread();
// // 객체를 만들고 class 에서 사용하는 함수들은 함수 선언 전에 선언 되어 있으면 모두 스코프에 포함됨

// console.log(board);




// function Love(y,x){
//     this.y = y;
//     this.x = x;
    
// }

const n = 'sh won';
const sayName = () =>{
    console.log(n);
    console.log(n);
}

const h = () =>{
    const n = 'sssssss';
    sayName.call(this);
    return console.log(1);
}
h();

