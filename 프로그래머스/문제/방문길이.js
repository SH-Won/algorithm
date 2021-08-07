const dir ="ULURRDLLU";
console.log(solution(dir));

function solution(dirs){
   let move ={ 'U':[0,1], 'L':[-1,0], 'R' :[1,0], 'D':[0,-1] };
   let checkLoad = new Set();
   let start =[0,0];
   for(let i=0; i<dirs.length; i++){
       const [curX,curY] = start;
       const [moveX,moveY] = move[dirs[i]]
       const [nextX,nextY] = [curX+moveX,curY+moveY];

       if(nextX < -5 || nextY <-5 || nextX >5 || nextY >5)
         continue;

       checkLoad.add(""+curX+curY+nextX+nextY);
       checkLoad.add(""+nextX+nextY+curX+curY);

       start=[nextX,nextY];
   }
   

   return checkLoad.size/2

}