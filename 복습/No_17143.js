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
        field[r][c] = {z,no:i};
    }
    const fishing = (c,shark) =>{
        for(let r=1; r<=R; r++){
            if(field[r][c]){
                sum+=field[r][c].z;
                shark.splice(field[r][c].no,1);
                break;
            }  
        }
        field = field.map(array => array.fill())
        return shark;
    }
   

    const moveShark = (shark) =>{
        let i = 1;
        while(true){
            shark = fishing(i,shark);
            if(i === C) break;
            
            let no = 0;
            let queue =[...shark];
            shark = [];
            // let length = queue.length;
            while(queue.length){
                let {r,c,s,d,z} = queue.shift();
                
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
                    field[r][c] ={z,no};
                    shark.push({r,c,s,d,z});
                    no++;
                }
                else if(z > field[r][c].z ){
                    shark.splice(field[r][c].no,1,{r,c,s,d,z});
                    field[r][c].z = z;
                }

            }  
            i++;

        }


    }
    moveShark(shark);
    return console.log(sum);
}