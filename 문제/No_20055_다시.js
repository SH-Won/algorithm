//const input = ['3 2','1 2 1 2 1 2'];
//const input = ['3 6','10 10 10 10 10 10'];
const input = ['4 5','10 1 10 6 3 4 8 2']
//const input = ['5 8','100 99 60 80 30 20 10 89 99 100']
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,K] = input[0].split(' ').map(Number);
const durability = input[1].split(' ').map(Number);

class Robot {
    constructor(pos,isRemove){
        this.pos = pos;
        this.isRemove = isRemove;
    }
}
class Belt {
    constructor(durability,robotCount){
        this.durability = durability;
        this.robotCount = robotCount;
    }
}
const solution = () =>{
    let container = durability.map(num => new Belt(num,0));
    let robots = [];
    let count = 0;
    Robot.prototype.container = container;
    Robot.prototype.move = function(isActive){

        if(isActive){
            let nextPos = this.pos+1;
            const robotCount = this.container[nextPos].robotCount;
            if(robotCount) return;
            else{
                if(!this.container[nextPos].durability) return;
                if(nextPos === N-1){
                    this.container[this.pos].robotCount--;
                    this.container[nextPos].durability--;
                    this.container[nextPos].durability === 0 ? count++ : count;
                    this.isRemove = true;
                    return;
                }
                else{
                    this.container[this.pos].robotCount--;
                    this.container[nextPos].robotCount++;
                    this.container[nextPos].durability--;
                    this.container[nextPos].durability === 0 ? count++ : count;
                    this.pos = nextPos;
                }
            }
        }

        else{
            this.pos = this.pos + 1 ;
            if(this.pos === N-1){
                this.container[N-1].robotCount--;
                this.isRemove = true;
            }
        }
    }
    
    let time = 0;
    while(true){
        time++;
        container.unshift(container.pop());
        for(let i=0; i<robots.length; i++){
            if(robots[i].isRemove) continue;
            robots[i].move(false);
        }
        for(let i=0; i<robots.length; i++){
            if(robots[i].isRemove) continue;
            robots[i].move(true);
        }
        if(container[0].durability){
            robots.push(new Robot(0,false));
            container[0].durability--;
            container[0].robotCount++;
            container[0].durability === 0 ? count++ : count; 
        }

        //let check = container.filter(belt => belt.durability === 0).length;
        if(count >= K) return console.log(time);
        console.log(time);
    }
}
solution();