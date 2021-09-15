//const input = ['100 100 0'];
//const input = ['4 6 8','4 1 3 3 8','1 3 5 2 9','2 4 8 4 1','4 5 0 1 4','3 3 1 2 7','1 5 8 4 3','3 6 2 1 2','2 2 2 3 5'];
//const input = ['4 5 4','4 1 3 3 8','1 3 5 2 9','2 4 8 4 1','4 5 0 1 4'];
const input = ['2 2 4','1 1 1 1 1','2 2 2 2 2','1 2 1 2 3','2 1 2 1 4']

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [R,C,M] = input[0].split(' ').map(num =>+num);
const shark = Array.from({length:M},(_,i)=>{
    const [r,c,s,d,z] = input[i+1].split(' ').map(num =>+num);
    return {r,c,s,d,z};
})
solution(shark);
function solution(shark){
    let field = Array.from({length:R+1},()=>Array(C+1));
    const isValidPos = (r,c) => (r>=1 && c>=1 && r<=R && c<=C);
    const go = [null,[-1,0],[1,0],[0,1],[0,-1]];
    const back = [null,2,1,4,3];
    let sum = 0;
    for(let i=0; i<M; i++){
        const {r,c,s,d,z} = shark[i];
        field[r][c] = {r,c,s,d,z};
    }
    
    const fishing = (c) =>{
        let shark = [];
        for(let r=1; r<=R; r++){
            if(field[r][c]){
                sum+= field[r][c].z;
                field[r][c] = null;
                break;
            }
        }
        
        for(let r=1; r<=R; r++){
            for(let c=1; c<=C; c++){
                if(field[r][c]){
                   shark.push(field[r][c]);
                   field[r][c] = null;
                }
            }
        }
        // field = field.map(array => array.fill())
        return shark;
    }
   

    const moveShark = (shark) =>{
        let i = 1;
        while(true){
            shark = fishing(i);
            if(i === C) break;
            // let length = queue.length;
            while(shark.length){
                let {r,c,s,d,z} = shark.shift();
                
                let count = d<=2 ? s % (2*R - 2) : s %(2*C -2);
                while(count--){
                    let [nr,nc] = [r+go[d][0],c+go[d][1]];
                    if(!isValidPos(nr,nc)){
                        d=back[d];
                        [nr,nc] = [r+go[d][0],c+go[d][1]];
                    }
                    r = nr;
                    c = nc;
                }
                if(!field[r][c]){
                    field[r][c] = {r,c,s,d,z};
                }
                else if(z > field[r][c].z ){
                   field[r][c] = {r,c,s,d,z};
                }

            }  
            i++;

        }


    }
    moveShark(shark);
    return console.log(sum);
}