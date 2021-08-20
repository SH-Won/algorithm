console.log(solution(24,24))
function solution(brown,yellow){

    const squareCount = brown + yellow;
    
    const measure = (number) =>{
        if(number ===1) return [1];

        let array = []

        for(let i=number; i>=1; i--){
            if(number % i ===0) array.push(i);
        }
        return array;
    }
    const columns = measure(yellow);

    for(let i=0; i<columns.length; i++){
        let y = yellow / columns[i];
        let surround = y*2 + columns[i] *2 +4;

        if(yellow+surround ===squareCount) return [columns[i]+2,y+2]
        
    }
    

}