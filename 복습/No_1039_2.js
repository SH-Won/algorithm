// const [N,K] = ['16375','1'];
// const [N,K] =['132','3'];
// const [N,K] =['2133','2']; //ans 3321
// const [N,K] = ['52676','2'] //ans 76652;
// const [N,K] =['40069','3'] //ans 96400
// const [N,K] = ['10042','2'] //ans 42010;
// const [N,K] =['740792','2'] //ans 970742
//const fs = require('fs');
//const [N,K] = fs.readFileSync('/dev/stdin').toString().trim().split(' ');

const solution = (N,K) =>{
    if(parseInt(N) <= 10) return console.log(-1);
    
    let visited = Array.from({length:parseInt(K)+1},()=>Array(1000000).fill(false));
    
    const getMaxNumber = (N) =>{
        let queue = [[N,0]];
        let max = 0;
        while(queue.length){
            const [numberString,count] = queue.shift();
            if(count === parseInt(K)){
               max = Math.max(max,parseInt(numberString));
               continue;
            }
            
            for(let i=0; i<numberString.length-1; i++){
                for(let j=i+1; j<numberString.length; j++){
                    if(i===0 && numberString[j] === '0') continue;
                    let temp = numberString.split('');
                    [temp[i],temp[j]] = [temp[j],temp[i]];
                    const nextNumberString = temp.join('');
                    const nextNumber = parseInt(nextNumberString);
                    if(!visited[count+1][nextNumber]){
                        queue.push([nextNumberString,count+1]);
                        visited[count+1][nextNumber] = true;
                    }
                    
                }
            }

        }
        return max;
    }
    const max = getMaxNumber(N);
    return max===0 ? console.log(-1) : console.log(max);
}
solution(N,K);