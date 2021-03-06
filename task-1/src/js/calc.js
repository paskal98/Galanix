



let btn_calc = document.getElementById('calculate');

//calc id
let price = document.getElementById('price');

let benzin = document.getElementById('benzin');
let diesel = document.getElementById('diesel');
let hybrid = document.getElementById('hybrid');
let electro = document.getElementById('electro');

let engine = document.getElementById('engine');
let typeengine = document.getElementById('type');
let year = document.getElementById('year');

//let state = document.getElementById('state');
let city = document.getElementById('city');
let port = document.getElementById('port');

//output
let lot = document.getElementById('pricelot');
let part = document.getElementById('part');
let participation = document.getElementById('participation');
let deliveryfrom = document.getElementById('deliveryfrom');
let deliveryto = document.getElementById('deliveryto');
let customs = document.getElementById('customs');
let tax = document.getElementById('tax');

let servises = parseInt(((document.getElementById('servises')).innerHTML).replace('$',''));
let ourprice = parseInt(((document.getElementById('ourprice')).innerHTML).replace('$',''));
let sertification = parseInt(((document.getElementById('sertification')).innerHTML).replace('$',''));
let registration = parseInt(((document.getElementById('registration')).innerHTML).replace('$',''));

let count=servises+ourprice+sertification+registration;
let result = document.getElementById('result');


electro.addEventListener('click',()=>{
    typeengine.innerHTML="Кв\\ч";
});

benzin.addEventListener('click',setTypeEngine);
diesel.addEventListener('click',setTypeEngine);
hybrid.addEventListener('click',setTypeEngine);

btn_calc.addEventListener('click',calculate);


function setTypeEngine(){
    typeengine.innerHTML="см3";
}

function calculate(){

    fetch ('../server/calcdata.json')
        .then(data=>data.json())
        .then(res=>setData(res));
    
}

async function setData(res){
    
    
    let taxBuy=setTax(parseInt(price.value),res.buytax);
    taxBuy = setPercentByTypeOf(taxBuy,parseInt(price.value) );
    let taxLot=setTax(parseInt(price.value),res.lottax);
    taxLot = setPercentByTypeOf(taxLot,parseInt(price.value) );
    let taxAuto = getTaxEngine(res.engine);
    let taxCountry = getTaxCountry(taxAuto);

    
    lot.innerHTML=`${price.value}$`;
    part.innerHTML=taxBuy+taxLot+"$";
    customs.innerHTML=taxAuto+"$";
    participation.innerHTML=res.gatefree+"$";

    tax.innerHTML=Math.round(taxCountry)+"$";
    
    
    result.innerHTML=Math.round(count+parseInt(price.value)+res.gettax+res.gatefree+taxBuy+taxLot+taxCountry)+"$";
}


function setTax(price,db){
    for(const [key,value] of Object.entries(db)){
        if(price<=parseInt(key)){
            return value;
        }
    }
}

function getTaxEngine(db){
    
    if(!electro.checked){
        return Math.round(typeEngineTax(db)*coefficientYear()*parseFloat(engine.value));
    } else {
        return Math.round(parseInt(electro.value)*1);
    }

}

function typeEngineTax(db){
    if (benzin.checked){
        return dbSetTax(db.benzin);
    } else if (diesel.checked){
        return dbSetTax(db.diesel);
    } else {
        return dbSetTax(db.benzin);
    }
}

function dbSetTax (db){

    for(const [key,value] of Object.entries(db)){
        if(parseInt(engine.value)<=parseInt(key)){
            return value;
        } else {
            return db.more;
        }
    }

}

function coefficientYear(){
    let data = (new Date).getFullYear();
    let res = data - parseInt(year.value);
    if(res>15){
        res=15;
    } else if(res==0){
        res =1;
    }
    return res;
}

function getTaxCountry(taxengine){
    if (parseInt(price.value)<taxengine){
        return Math.round((taxengine*0.2)+(taxengine*0.1)+(taxengine*0.04));
    } else {
        return Math.round(parseInt(price.value)*0.2)+(parseInt(price.value)*0.1)+(parseInt(price.value)*0.04);
    }
}

function setPercentByTypeOf(percent, value){
    if(typeof percent === "string"){
        return Math.round((value * parseInt(percent.replace('%'))) /100);
    } 
    return percent;
}

