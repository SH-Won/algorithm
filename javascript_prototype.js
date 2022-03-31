// function prototype;
function Car(name,price){
    this.carName = name;
    this.price = price;
}
function Non_Member(name,carName,carPrice){
    Car.call(this,carName,carPrice);
    this.customerName = name;
}
function Member(name,address,cellPhone,carName,carPrice){
    Non_Member.call(this,name,carName,carPrice);
    this.address = address;
    this.cellPhone = cellPhone;
}
Car.prototype.getCarName = function(){
    console.log(this.carName);
}
Non_Member.prototype = new Car();
Non_Member.prototype.constructor = Non_Member;
Non_Member.prototype.getName = function(){
    console.log(this.customerName);
}
Member.prototype = new Non_Member();
Member.prototype.constructor = Member;
Member.prototype.getMemberInfo = function(){
    console.log(`name : ${this.customerName}\ncellPhone : ${this.cellPhone}\naddress : ${this.address}`);
}
const SM = new Non_Member('somi','avante',10000);
const SH = new Member('seongho','seoul','010-0000-0000','avante2',12000);
// Class prototype;
class Car{
    constructor(name,price){
        this.carName = name;
        this.price = price;
    }
}
class Non_Member extends Car{
    constructor(name,carName,carPrice){
        super(carName,carPrice);
        this.memberName = name;
    }
}
class Member extends Non_Member{
    constructor(name,address,cellPhone,carName,carPrice){
        super(name,carName,carPrice);
        this.address = address;
        this.cellPhone = cellPhone;
    }
}
Car.prototype.getCarName = function(){ console.log(this.carName) };
Non_Member.prototype.getName = function(){ console.log(this.memberName)};
Member.prototype.getMemberInfo = function(){ console.log(`name : ${this.memberName}\ncellPhone : ${this.cellPhone}\naddress : ${this.address}`);};

const SM2 = new Non_Member('somi','avante',10000);
const SH2 = new Member('seongho','seoul','010-0000-0000','avante2',12000);

SH2.getMemberInfo();
SH2.getName();
SH2.getCarName();
SM2.getMemberInfo(); // error;