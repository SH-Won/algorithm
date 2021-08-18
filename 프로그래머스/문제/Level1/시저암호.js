console.log('a'.charCodeAt())

function solution(s, n) {
    
    return s.split('').map(char =>{
        if(char ===' ') return char;
        let temp = char.charCodeAt(); // Z 면 90; z 면 122
        return char.toUpperCase().charCodeAt()+n > 90 ?
               String.fromCharCode(temp+n-26) :
               String.fromCharCode(temp+n);

    }).join('');
    
}