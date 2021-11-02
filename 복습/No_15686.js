// const input = ['5 3','0 0 1 0 0','0 0 2 0 1','0 1 2 0 0','0 0 1 0 0','0 0 0 0 2'];
//const input = ['5 2','0 2 0 1 0','1 0 1 0 0','0 0 0 0 0','2 0 0 1 1','2 2 0 1 2'];
//const input = ['5 1','1 2 0 0 0','1 2 0 0 0','1 2 0 0 0','1 2 0 0 0','1 2 0 0 0'];
const input = ['5 1','1 2 0 2 1','1 2 0 2 1','1 2 0 2 1','1 2 0 2 1','1 2 0 2 1']

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getMinDistance = (house,chickenStore,selectChicken) =>{
    let distance = 0;
    for(let i=0; i<house.length; i++){
        const [hy,hx] = house[i];
        let minDistance = Infinity;
        for(let j=0; j<selectChicken.length; j++){
            const number = selectChicken[j];
            const [cy,cx] = chickenStore[number];
            minDistance = Math.min(Math.abs(hy-cy) + Math.abs(hx-cx) , minDistance);
        }
        distance +=minDistance;
    }
    return distance;
}
const solution = (input) =>{
    const [N,M] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i)=>input[i+1].split(' '));
    let min = Infinity;
    let house = [];
    let chickenStore = [];
    let selectChicken = [];
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(map[y][x] === '1') house.push([y,x]);
            else if (map[y][x] ==='2') chickenStore.push([y,x]);
        }
    }

    const getAliveStore = (index,count,max) =>{
        if(count === max){
        
           min = Math.min(min,getMinDistance(house,chickenStore,selectChicken));
           return;
        }
        for(let i=index; i<chickenStore.length; i++){
            selectChicken.push(i);
            getAliveStore(i+1,count+1,max);
            selectChicken.pop();
        }
    }
    for(let m=1; m<=M; m++){
        getAliveStore(0,0,m);
    }
    console.log(min);
}
solution(input);