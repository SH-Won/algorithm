
function solution(dirs){

    const isValidPos = (y,x) => (y<=5 && y>=-5 && x<=5 && x>=-5)
    const direction = {'U':[0,1],'L':[-1,0],'R':[1,0],'D':[0,-1]}
    let visited = new Set();
    let start = [0,0];
    
     for(let i=0; i<dirs.length; i++){
         const [cx,cy] = start;
         const [mx,my] = direction[dirs[i]]
         const [nx,ny] = [cx+mx,cy+my];

         if(!isValidPos(nx,ny)) continue;

         visited.add(""+cx+cy+nx+ny);
         visited.add(""+nx+ny+cx+cy);
         start = [nx,ny];
     }

     return visited.size / 2
    
}