//const input = ['5','YCPZY','CYZZP','CCPPP','YCYZC','CPPZZ']
//const input = ['5','CPCPC','CPCPC','CPCPC','CPCPC','CPCPC']
const input =['3','CCC','CCC','CCP'];
//const input =['3','CCP','CCP','PPC']
//const input =['4','PPPP','CYZY','CCPY','PPCC'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
let candy = Array.from({length:N},(_,i)=>input[i+1].split(''));

const distance = [[1,0],[-1,0],[0,1],[0,-1]]
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);

let answer = 0;
maxLineCandy(candy);
for(let y=0; y<N; y++){
    for(let x=0; x<N; x++){
        
        distance.forEach(([my,mx])=>{
            const [ny,nx] = [y+my,x+mx];
            //console.log(ny,nx);
            if(!isValidPos(ny,nx) || candy[y][x] === candy[ny][nx]) return

             swap(y,x,ny,nx);
            
        })
        

    }
}
// CCC
// CCC
// CCP
//console.log(answer === 0 ? N : answer);
console.log(answer);
function swap(cy,cx,ny,nx){

        [candy[cy][cx],candy[ny][nx]] = [candy[ny][nx],candy[cy][cx]];
        maxLineCandy(candy);
        [candy[cy][cx],candy[ny][nx]] = [candy[ny][nx],candy[cy][cx]];
       

    
        // maxLineCandy(cy,cx,ny,nx);
        // [candy[cy][cx],candy[ny][nx]] = [candy[ny][nx],candy[cy][cx]];
        // maxLineCandy(cy,cx,ny,nx);
        // [candy[cy][cx],candy[ny][nx]] = [candy[ny][nx],candy[cy][cx]];
       


}
function maxLineCandy(candy){
    // console.log(candy.join('\n'));
    // console.log('-----------')
    let max = 1;
    let rootCandy ;

    for(let y=0; y<N; y++){
        
        rootCandy = candy[y][0];
        console.log(rootCandy);
        for(let x=1; x<N; x++){
            if(rootCandy === candy[y][x]){
                max++;
            }
            else{
                rootCandy = candy[y][x]
                max > answer ? answer=max : answer;
                max =1;
            }
        }
           max >answer ? answer=max :answer;
            max=1
    }
    max =1;
    for(let x=0; x<N; x++){
        rootCandy = candy[0][x];
        for(let y=1; y<N; y++){
            if(rootCandy === candy[y][x]){
                max++;
            }
            else{
                rootCandy === candy[y][x];
                max > answer ? answer=max : answer;
                max =1;
            }
        }
        max >answer ? answer=max :answer;
            max=1
    }
}

// function maxLineCandy(cy,cx,ny,nx){
  
//     if(cy === ny){
        
//         let max = 1;
//         for(let x=cx; x<=nx; x++){
//             let rootCandy = candy[0][x]
//             for(let y=1; y<N; y++){
//                 if(rootCandy === candy[y][x]){
//                     max++;
//                 }
//                 else{
//                      rootCandy = candy[y][x];
//                      max > answer ? answer=max : answer;
//                      max = 1;
//                 }

                

//             }
//             max > answer ? answer=max : answer;
//             max=1;
//         }
//    }
//    else if(cx === nx){
//        let max = 1;
//        for(let y=cy; y<=ny; y++){
//            let rootCandy = candy[y][0];
//            for(let x =1; x<N; x++){
//                if(rootCandy === candy[y][x]){
//                    max++;
//                }
//                else{
//                    rootCandy =candy[y][x];
//                    max > answer ? answer=max : answer;
//                      max = 1;
//                }
               
//            }
//            max > answer ? answer=max : answer;
//            max=1;
//        }
//    }

// }
