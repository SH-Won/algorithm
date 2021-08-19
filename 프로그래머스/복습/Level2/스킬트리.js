console.log(solution("CBD",["BACDE", "CBADF", "AECB", "BDA"]))

function solution(skill,skill_trees){

    let skillTrees = skill_trees.reduce((acc,cur)=>{
       let skillStr = ''
       for(let i=0; i<cur.length; i++){
         if(skill.includes(cur[i])) skillStr+=cur[i];
       }
       return [...acc,skillStr];
    },[])
    let answer = skillTrees.reduce((acc,cur)=>{

        for(let i=0; i<cur.length; i++){
            if(cur[i] !== skill[i]) return acc
        }
        return acc+=1
    },0)

    return answer;
    
}