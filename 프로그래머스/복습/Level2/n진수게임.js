console.log(solution(16,16,2,2))

function solution(n,t,m,p){

    let str = '';
    let number = 0;
    let answer = '';
    while(str.length < m*t){
        
        str+= number.toString(n);
        number++;
    }
    str = str.substring(0,m*t).toUpperCase();
    for(let i=0; i<str.length; i++){
        if(i % m === p-1) answer+=str[i];
    }

    return answer;
    

}