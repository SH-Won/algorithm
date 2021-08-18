console.log(solution(5,[9,20,28,18,11],[30,1,21,17,28]))
function solution(n, arr1, arr2) {
    let answer = [];
    let map1 =Array(n);
    let map2 = Array(n);

    const attachZero = (str) =>{
        let length = str.length;
        if(length === n) return str;
        let zeroCount = n -length;
        for(let i=0; i<zeroCount; i++){
            str='0'+str;
        }
        return str;
    }

    for(let i=0; i<n; i++){
        map1[i] = attachZero(arr1[i].toString(2));
        map2[i] = attachZero(arr2[i].toString(2));
    }
    console.log(map1,map2);
    for(let i=0; i<n; i++){
        let str ='';
        for(let j=0; j<n; j++){
            if(map1[i][j] ==='0' && map2[i][j]==='0'){
                str+=" ";
            }
            else{
                str+="#"
            }

        }
        answer.push(str);

    }
    return answer;
}