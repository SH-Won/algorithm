//const input = ['100 100 0'];
//const input = ['4 6 8','4 1 3 3 8','1 3 5 2 9','2 4 8 4 1','4 5 0 1 4','3 3 1 2 7','1 5 8 4 3','3 6 2 1 2','2 2 2 3 5'];
//const input = ['4 5 4','4 1 3 3 8','1 3 5 2 9','2 4 8 4 1','4 5 0 1 4'];
//const input = ['2 2 4','1 1 1 1 1','2 2 2 2 2','1 2 1 2 3','2 1 2 1 4']
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [R,C,M] = input[0].split(' ').map(num =>+num);
const shark = Array.from({length:M},(_,i)=>{
    const [r,c,s,d,z] = input[i+1].split(' ').map(num =>+num)
    return {r,c,s,d,z};
}).sort((a,b)=>{
    return a.r-b.r
});

solution(shark);
function solution(shark){
    if(shark.length === 0) return console.log(0); 
    const go = [[],[-1,0],[1,0],[0,1],[0,-1]];
    const back = [0,2,1,4,3];
    let sum = 0;
    const isValidPos = (y,x) => (y>=1 && x>=1 && y<=R && x<=C);

    const fishing = (shark,x) =>{
        for(let i=0; i<shark.length; i++){
            if(shark[i].c === x){
                sum+=shark[i].z;
                shark.splice(i,1);
                break;
            }
        }
        return shark;
    }
    
    const moveShark = (shark) =>{
        let i = 1;
        while(true){
            
            shark = fishing(shark,i);
            if( i===C ) break;
            
            
            
            let length = shark.length;
            while(length--){
                   
                
                    let {r,c,s,d,z} = shark.shift();
                    
                    let count = d<=2 ? s % (2*R -2) : s % (2*C -2);
                    
                        while(count--){
                        let [nr,nc] = [r+go[d][0],c+go[d][1]];
                        if(!isValidPos(nr,nc)){
                            d = back[d];
                            [nr,nc] = [r+go[d][0],c+go[d][1]];
                        }
                        r = nr;
                        c = nc;
                        }
                    shark.push({r,c,s,d,z});
                    
                    
            }
            
                
                let newShark = [];
                shark.sort((a,b) => {
                    if(a.r === b.r){

                      if( a.c === b.c) return b.z - a.z;
                      return a.c-b.c
                    }
                    return a.r-b.r;
                })
               
                let [y,x] =[0,0]; 
                
                for(let i=0; i<shark.length; i++){
                    if(shark[i].r ===y && shark[i].c ===x)
                    continue;
                
                    newShark.push(shark[i]);
                    y=shark[i].r;
                    x=shark[i].c;
                }
              
              shark = [...newShark];
              
              i++;
        }
        
        
   
    }

    moveShark(shark);
    return console.log(sum);
}