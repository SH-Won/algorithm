console.log(solution([1,1,3,3,0,1,1]))
function solution(arr)
{
   let answer = arr.filter((num,index) => arr[index+1] !== num );
    return answer;
}