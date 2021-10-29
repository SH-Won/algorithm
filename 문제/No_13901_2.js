

const solution = () =>{
    const [R,C] = input[0].split(' ').map(Number);
    const k = +input[1];
    const dy = [-1,1,0,0];
    const dx = [0,0,-1,1];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<R && x<C);
    let visited = Array.from({length:R},()=>Array(C));
    for(let y=0; y<R; y++){
        for(let x=0; x<C; x++){
            visited[y][x] = false;
        }
    }
    let index = 2;
    let map = Array.from({length:R},()=>Array(C));
    for(let y=0; y<R; y++){
        for(let x=0; x<C; x++){
            map[y][x] = 0;
        }
    }
    for(let i=0; i<k; i++){
        const [y,x] =input[index++].split(' ').map(Number);
        map[y][x] = 1;
    }
    // console.log(map.map(row => row.join(' ')).join('\n'));
    const [sy,sx] = input[index++].split(' ').map(Number);
    const command = input[index].split(' ').map(num => +num -1);
    
    const bfs = () =>{
        visited[sy][sx] = true;    
        let queue = [[sy,sx,0]]
        while(queue.length){
            const [y,x,curDir] = queue.shift();
            let [cy,cx,dir] = [y,x,curDir];
            let count = 4;
            while(count--){
                const [ny,nx] = [cy+dy[command[dir]],cx+dx[command[dir]]];
                if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx]){
                    dir = dir+1 > 3 ? 0 : dir+1;
                    continue;
                }
                break;
            }
            if(count===-1 && curDir === dir) return console.log(y,x);
            let [ny,nx] = [cy+dy[command[dir]],cx+dx[command[dir]]];
            
            while(isValidPos(ny,nx) && !visited[ny][nx] && !map[ny][nx]){
               ny+=dy[dir] , nx+=dx[dir];
            }
            [ny,nx] = [ny-dy[command[dir]],nx-dx[command[dir]]];
            visited[ny][nx] = true;
            queue.push([ny,nx,dir+1 > 3 ? 0 : dir+1]);
        }
    }
    bfs(sy,sx,command,map);
}


const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});
let input = [];
rl.on("line",line =>{
    input.push(line)
}).on("close",()=>{
    solution(input)
    process.exit();
})



// 'use strict';

// var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// var solution = function solution() {
//     var _input$0$split$map = input[0].split(' ').map(Number);

//     var _input$0$split$map2 = _slicedToArray(_input$0$split$map, 2);

//     var R = _input$0$split$map2[0];
//     var C = _input$0$split$map2[1];

//     var k = +input[1];
//     var dy = [-1, 1, 0, 0];
//     var dx = [0, 0, -1, 1];
//     var isValidPos = function isValidPos(y, x) {
//         return y >= 0 && x >= 0 && y < R && x < C;
//     };
//     var visited = Array.from({ length: R }, function () {
//         return Array(C).fill(false);
//     });
//     var index = 2;
//     var map = Array.from({ length: R }, function () {
//         return Array(C).fill(0);
//     });
//     for (var i = 0; i < k; i++) {
//         var _input$split$map = input[index++].split(' ').map(Number);

//         var _input$split$map2 = _slicedToArray(_input$split$map, 2);

//         var y = _input$split$map2[0];
//         var x = _input$split$map2[1];

//         map[y][x] = 1;
//     }
//     // console.log(map.map(row => row.join(' ')).join('\n'));

//     var _input$split$map3 = input[index++].split(' ').map(Number);

//     var _input$split$map4 = _slicedToArray(_input$split$map3, 2);

//     var sy = _input$split$map4[0];
//     var sx = _input$split$map4[1];

//     var command = input[index].split(' ').map(function (num) {
//         return +num - 1;
//     });

//     var bfs = function bfs() {
//         visited[sy][sx] = true;
//         var queue = [[sy, sx, 0]];
//         while (queue.length) {
//             var _queue$shift = queue.shift();

//             var _queue$shift2 = _slicedToArray(_queue$shift, 3);

//             var y = _queue$shift2[0];
//             var x = _queue$shift2[1];
//             var curDir = _queue$shift2[2];
//             var cy = y;
//             var cx = x;
//             var dir = curDir;

//             var count = 4;
//             while (count--) {
//                 var _ny = cy + dy[command[dir]];

//                 var _nx = cx + dx[command[dir]];

//                 if (!isValidPos(_ny, _nx) || visited[_ny][_nx] || map[_ny][_nx]) {
//                     dir = dir + 1 > 3 ? 0 : dir + 1;
//                     continue;
//                 }
//                 break;
//             }
//             if (count === -1 && curDir === dir) return console.log(y, x);
//             var ny = cy + dy[command[dir]];
//             var nx = cx + dx[command[dir]];


//             while (isValidPos(ny, nx) && !visited[ny][nx] && !map[ny][nx]) {
//                 ny += dy[dir], nx += dx[dir];
//             }
//             var _ref = [ny - dy[command[dir]], nx - dx[command[dir]]];
//             ny = _ref[0];
//             nx = _ref[1];

//             visited[ny][nx] = true;
//             queue.push([ny, nx, dir + 1 > 3 ? 0 : dir + 1]);
//         }
//     };
//     bfs(sy, sx, command, map);
// };

// var readline = require('readline');
// var rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// var input = [];
// rl.on("line", function (line) {
//     input.push(line);
// }).on("close", function () {
//     solution(input);
//     process.exit();
// });