let numbers = [1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5];
console.log(solution(numbers,'right'))

function solution(numbers, hand) {
    let answer='';
    let left =[3,0];
    let right=[3,2];

    let phone ={
        '1':[0,0],'2':[0,1],'3':[0,2],
        '4':[1,0],'5':[1,1],'6':[1,2],
        '7':[2,0],'8':[2,1],'9':[2,2],
        '0':[3,1]
    }
    const nextHand = (y,x,left,right) =>{
        let leftPos = Math.abs(y-left[0])+Math.abs(x-left[1]);
        let rightPos = Math.abs(y-right[0]) +Math.abs(x-right[1])
        
        if(leftPos === rightPos){
            return hand === 'right' ? 'R' : 'L'
        }

        return leftPos < rightPos ? 'L' : 'R'

    }
    
    for(let i=0; i<numbers.length; i++){
        
        let [y,x] = phone[`${numbers[i]}`];
       
        if(numbers[i]%3===1){
            left = [y,x];
            answer+='L'
        }
       else if(numbers[i]!==0&& numbers[i] %3 ===0){
            right = [y,x];
            answer+='R'
        }
        else{
            // let leftHand = Math.abs(y-left[0])+Math.abs(x-left[1]);
            // let rightHand = Math.abs(y-right[0]) +Math.abs(x-right[1])
            
            // if(leftHand === rightHand){
            //    hand ==='right' ? answer+='R' : answer+='L'
            // }
            // if(leftHand < rightHand){
            //   answer+='L'
            // }
            // if(rightHand < leftHand){
            //   answer+='R'
            // }
            answer +=nextHand(y,x,left,right);

            answer[answer.length-1] ==='R' ? right=[y,x] : left=[y,x] 
        }
        

    }

   
    
    return answer.trim();
}