const input = [
'4',
'500 500 500 500',
'1 4 3 -2',
'-2 1 4 3',
'3 -2 1 4',
'4 3 -2 1',
'1'
]
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = () =>{
    let index = 0;
    const N = +input[index++];
    const guilty = input[index++].split(' ').map(Number);
    const guiltyIndex = Array.from({length:N},()=>input[index++].split(' ').map(Number));
    const jimin = +input[index];

    let selected = Array(N).fill(false);
    let isDead = Array(N).fill(false);
    let order = Array(N-1).fill(false);
    let maxNight = 0;
    const mafiaGame = (order,guilty) =>{
        let night = 0;
    //    console.log(order);
        isDead.fill(false);
        while(order.length ){
            if(isDead[jimin]) return night;
            if((order.length + 1) % 2 === 0){
               const selectPeople = order.shift();
               isDead[selectPeople] = true;
               for(let i=0; i<order.length; i++){
                   const people = order[i];
                   guilty[people]+=guiltyIndex[selectPeople][people];
               }
               guilty[jimin]+=guiltyIndex[selectPeople][jimin];
               night++;
            }
            else{

                let maxGuilty = -Infinity;
                for(let i=0; i<order.length; i++){
                    const people = order[i];
                    maxGuilty = Math.max(maxGuilty,guilty[people]);
                }
                maxGuilty = Math.max(maxGuilty, guilty[jimin]);
                //console.log(maxGuilty);
                const selectPeople = guilty.findIndex((num,index)=> num === maxGuilty && !isDead[index]);
                //console.log(selectPeople);
                const removeIndex = order.indexOf(selectPeople);
                if(removeIndex === -1){
                    isDead[jimin] = true;
                }
                else{
                    order.splice(removeIndex,1);
                    isDead[selectPeople] = true;
                }
            }
            
        }
        return night;
    }

    const makeOrder = (count) => {
        if(count === N-1){
           //const copyGuiltyIndex = Array.from({length:N},(_,i)=> [...guiltyIndex[i]])
           const copyOrder = [...order];
           const copyGuilty = [...guilty]
           maxNight = Math.max(maxNight,mafiaGame(copyOrder,copyGuilty));
           return;
        }
        for(let i=0; i<N; i++){
            if(i === jimin) continue;
            if(!selected[i]){
                selected[i] = true;
                order[count] = i;
                makeOrder(count+1);
                selected[i] = false;
            }
        }
    }
    makeOrder(0);
    console.log(maxNight);
}
solution();