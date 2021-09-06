//const orders=["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"];
//const course =[2,3,4];
// const orders =["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"];
// const course = [2,3,5];
//const orders = ['XYZ','XWY','WXA'];
//const course = [2,3,4];
//console.log(solution(orders,course));

function solution(orders,course){

    let orderMap = {};
    let courseMap ={};

    const combination =(order,orders,idx)=>{
        
        if(order.length >= 2 ){
            orderMap[order] = (orderMap[order] || 0 ) + 1;
            const count = orderMap[order];
            courseMap[order.length] = count > (courseMap[order.length] || 0) ?
                                      courseMap[order.length] = count :
                                      courseMap[order.length]             
    
        }
    
        for(let i=idx; i<orders.length; i++){
            const nextOrder = order + orders[i];
            combination(nextOrder,orders,i+1);
    
        }
    
    }
    for(let i=0; i<orders.length; i++){
        const orderMenu = orders[i].split('').sort().join('');
        combination("",orderMenu,0);
    }

  // console.log(orderMap);
   // console.log(courseMap);

   let result = course.reduce((acc,cur)=>{
        
        const max = courseMap[cur];
        const orderArr = Array.from(Object.entries(orderMap))
               .filter(order => order[0].length === cur && order[1] ===max && order[1] >=2 ).map(order => order[0]);

        return [...acc,...orderArr];
         
    },[])
    
    return result.sort();
}