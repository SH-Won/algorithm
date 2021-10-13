// const input = [
// '7 1',
// '0 0 0 0 0 0 0',
// '3 2 1 3 2 3 0',
// '2 1 2 1 2 1 0',
// '2 1 1 0 2 1 1',
// '3 3 2 3 2 1 2',
// '3 3 3 1 3 3 2',
// '2 3 2 2 3 2 3',
// '2 2'
// ]
// const input = [
// '7 4',
// '0 0 0 2 3 2 3',
// '1 2 3 1 2 3 1',
// '2 3 1 2 3 1 2',
// '1 2 3 0 2 3 1',
// '2 3 1 2 3 1 2',
// '3 1 2 3 1 2 3',
// '1 2 3 1 2 3 1',
// '1 3',
// '2 2',
// '3 1',
// '4 3'
// ]
// const input = [
// '7 4',
// '1 1 1 2 2 2 3',
// '1 2 2 1 2 2 3',
// '1 3 3 2 3 1 2',
// '1 2 2 0 3 2 2',
// '3 1 2 2 3 2 2',
// '3 1 2 1 1 2 1',
// '3 1 2 2 2 1 1',
// '1 3',
// '2 2',
// '3 1',
// '4 3'
// ]
const input = [
'7 7',
'1 1 1 2 2 2 3',
'1 2 2 1 2 2 3',
'1 3 3 2 3 1 2',
'1 2 2 0 3 2 2',
'3 1 2 2 3 2 2',
'3 1 2 1 1 2 1',
'3 1 2 2 2 1 1',
'1 3',
'2 2',
'3 1',
'4 3',
'1 3',
'1 1',
'1 3'
]
//const fs =require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
let map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
const command = Array.from({length:M},(_,i)=>input[i+N+1].split(' ').map(Number));
const dy = [0,-1,1,0,0];
const dx = [0,0,0,-1,1];
let sum = 0;

const extract = () =>{
    let [y,x] = [Math.floor(N/2),Math.floor(N/2)];
    let count = [1,1,2,2];
    let array = [];
    let exploded = [];
    let group = [];
    let flag = 0;
    const dy = [0,0,1,0,-1];
    const dx = [0,-1,0,1,0];
    while(true){
        for(let dir=1; dir<=4; dir++){
            
            for(let c=0; c<count[dir-1]; c++){
                
                let [ny,nx] = [y+dy[dir],x+dx[dir]];
              //  console.log(ny,nx,map[ny][nx]);
                if(nx === -1 ){
                    y=ny , x =nx ;
                    break;
                }
                if(!map[ny][nx]){

                    flag++;
                    y=ny , x=nx;
                    continue;
                }
                
                array.push(map[ny][nx]);
                y=ny , x=nx;
                flag = 0;
            }
            if(x === -1){

                break;
            }
        }
        if(x === -1){

            break;
        }
        count.forEach((num,index) => count[index]+=2)
    }
    map.forEach(array => array.fill(0));

    while(true){
    let explode = false;
    for(let i=0; i<array.length; i++){
        const number = array[i];
        let j=i+1;

        let count = 1;
        // if(!array[j]){
        //     explode = true;
        //     break;
        // }
        while(array[j] && number === array[j]){
            count++;
            j++;
        }
        if(count < 4){
            for(let k=i; k<j; k++){
                exploded.push(array[k]);
            }
        }
        else{
           sum+= number * (count);
           explode = true;
        }
        i = j-1;
    }
    if(!explode) break;
    //console.log(exploded);
    array = exploded.map(num => num);
   // console.log(array);
    exploded = [];
  }
 
  for(let i=0; i<exploded.length; i++){
      const number = exploded[i];
      let count = 1;
      let j=i+1;
      while(number === exploded[j]){
          count++;
          j++;
      }
      group.push(count);
      group.push(number);
      i = j-1;
  }
  return group;

}

const removeMarble = (d,s) =>{
    let [y,x] = [Math.floor(N/2),Math.floor(N/2)];
    for(let i=0; i<s; i++){
        const [ny,nx] = [y+dy[d],x+dx[d]];
        map[ny][nx] = 0;
        y=ny, x=nx;
        
    }
}
const insert =(group) =>{
    let [y,x] = [Math.floor(N/2),Math.floor(N/2)];
    let count = [1,1,2,2];
    const dy = [0,0,1,0,-1];
    const dx = [0,-1,0,1,0];
    let i=0;
    while(true){
        for(let dir=1; dir<=4; dir++){
            for(let c=0; c<count[dir-1]; c++){
                let [ny,nx] = [y+dy[dir],x+dx[dir]];
                if(nx === -1 ){
                    y = ny , x = nx;
                    break;
                }
                map[ny][nx] = group[i];
                y=ny , x=nx;
                i++;
            }
            if(x === -1) break;
        }
        if(x === -1) break;
      count.forEach((num,index) => count[index]+=2);
    }
}
let i=0;
while(i < command.length){
    
    const [d,s] =command[i];
    removeMarble(d,s);
    const group = extract();
   // console.log('---------');
    insert(group);
    i++
}

console.log(sum);