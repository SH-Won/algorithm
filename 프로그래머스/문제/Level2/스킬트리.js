// 1 2 3 4 5 6 7 8   //1
//  1   2    3   4   //2
//    1      2       //3
// 16 8 4 2 
console.log(solution(8,4,7));

function solution(n,a,b)
{
   
    let i=1; 
    
    while(true){
        i++;

        if(Math.abs(Math.ceil(a / (2**(i-1)) ) - Math.ceil(b / (2**(i-1)) )) ===1 ){
            break;
        }
        
        n = n/2;
        
        
    }
    return i;
}