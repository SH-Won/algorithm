function solution(places){

    


    function checkDistance(place){
        let start = startArr(place);

        for(let i=0; i<start.length; i++){

        
        }
    }
    


    function startArr(place){
        let start = [];
        let index =-1;
       
            for(let i=0; i<place.length; i++){
                while(true){
                index = place[i].indexOf('P',index+1);
                if(index === -1) break;
                start.push([i,index]);
                }
            }
            return start;
        }
}