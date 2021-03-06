document.addEventListener("DOMContentLoaded",function(){
    'use strict';

   

    let btn_homepage = document.getElementById('homepagebutton');
    let btn_catalog = document.getElementById('findbutton');
    let btn_callaction = document.getElementById('callactionbutton');
    let btn_gotocalc = document.getElementById('gotocalc');
    let btn_calc = document.getElementById('calculate');

    let modal = document.getElementsByClassName('modal')[0];
    let close = document.getElementsByClassName('close')[0];

    let nav_elements = document.getElementsByClassName('nav__navigation')[0];

    let faq_items = document.getElementsByClassName('faq__box__item__question__triger');
    faqSetListeners();
 
    
    btn_homepage.addEventListener('click', modalOpen);
    btn_catalog.addEventListener('click', modalOpen);
    btn_callaction.addEventListener('click', modalOpen);
    btn_gotocalc.addEventListener('click',function(){
        $('html, body').animate({scrollTop:$('.calc').offset().top},800);
    });
    btn_calc.addEventListener('click',displayCallback);

    close.addEventListener('click',modalClose);

    //menu links
    {

    
    nav_elements.children[0].addEventListener('click',function(){
        $('html, body').animate({scrollTop:$('.servises').offset().top},800);
    });

    nav_elements.children[1].addEventListener('click',function(){
        $('html, body').animate({scrollTop:$('.steps').offset().top},800);
    });

    nav_elements.children[2].addEventListener('click',function(){
        $('html, body').animate({scrollTop:$('.table').offset().top},800);
    });

    nav_elements.children[3].addEventListener('click',function(){
        $('html, body').animate({scrollTop:$('.advantages').offset().top},800);
    });

    nav_elements.children[4].addEventListener('click',function(){
        $('html, body').animate({scrollTop:$('.top').offset().top},800);
    });

    nav_elements.children[5].addEventListener('click',function(){
        $('html, body').animate({scrollTop:$('.feedback').offset().top},800);
    });

    nav_elements.children[6].addEventListener('click',function(){
        $('html, body').animate({scrollTop:$('.calc').offset().top},800);
    });

    nav_elements.children[7].addEventListener('click',function(){
        $('html, body').animate({scrollTop:$('.faq').offset().top},800);
    });

    }
 

    function modalOpen(){
        modal.classList.remove('dn');
    }

    function modalClose(){
        modal.classList.add('dn');
    }
   
    function faqSetListeners(){
        [].forEach.call(faq_items,function(item){
            item.addEventListener('click', arrowTrigerrAnimate);
        });
    }

    function arrowTrigerrAnimate (){
        if(this.classList.contains('faq__box__item__question__triger__active')){
            this.classList.remove('faq__box__item__question__triger__active');
            itemTextInOut(this);
        } else {
            this.classList.add('faq__box__item__question__triger__active');
            itemTextInOut(this);
        }
    }

    function itemTextInOut(elem){
        let answer =(((elem.parentElement).parentElement).getElementsByClassName('faq__box__item__answer')[0]);

        if (answer.style.maxHeight){
            answer.style.maxHeight=null;
        } else{
            console.log(answer.scrollHeight +20);
            answer.style.maxHeight =answer.scrollHeight + "px";
        }

    }

    function displayCallback(){
        let callback=document.getElementById('callback');
        callback.classList.remove('calc__box__input__callback__hide');

        btn_calc.removeEventListener('click',displayCallback);
    }

});