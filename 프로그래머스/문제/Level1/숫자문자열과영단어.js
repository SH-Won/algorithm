
// let exchange ={
//     1:'1',
//     2:'2'
// }
// let str = 'one';
// console.log(exchange[1]);
console.log(Number('c'));
console.log(solution("123"))
function solution(s){
    let answer ='';

    let exchange ={
        'one':1, 'two':2, 'three':3,'four':4,
        'five':5, 'six':6, 'seven':7, 'eight':8,
        'nine':9, 'zero':0
    }
    let index =-1;
    for(let i=0; i<s.length; i++){
        let str = s.substring(index+1,i+1)
       

        if(!isNaN(Number(str))){
            
            answer+=str;
            index = i;
        }
        if(exchange[str] !==undefined){
            answer+=exchange[str];
            index =i;
        }
    }
    
    return parseInt(answer);

}