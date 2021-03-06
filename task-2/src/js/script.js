document.addEventListener("DOMContentLoaded",function(){
    'use strict';

    const regexp= new RegExp(/\s*\.\/task-2\/\d{1,}\.[a-z]{3,4}\s*/,'gm');

    let deleteInfo = [];
    setDeleted();
    

    let res = {
        data: (today = new Date()) => 
        [
            [
                today.getDay(),
                today.getMonth(),
                today.getFullYear()
            ].map((t) => t < 10 ? `0${t}` : `${t}`)
            .join('.'),
            [
                today.getHours(),
                today.getMinutes()
            ].map((t) => t < 10 ? `0${t}` : `${t}`)
            .join(':')
        ].join(' '),
        count: () => (document.getElementsByClassName('photo')).length 
        
    };

    

    const main = document.getElementById('main');
    main.classList.add('opacityload');

    const date = document.getElementById('date');
    date.innerHTML = res.data();

    const countPhoto = document.getElementById('time');
    countPhoto.innerHTML = res.count() + " photos";


    const fullPhoto = document.getElementById('fullPhoto');
    const photos = document.getElementsByClassName('photo');
    const close = document.getElementById('close');


    const delet = document.getElementsByClassName('delete');

    const recoverAll = document.getElementById('recover');

    
    setInterval(()=>{
        date.innerHTML = res.data();
    },1000);


    close.addEventListener('click',()=>{
        ((fullPhoto.parentElement).parentElement).style.display='none';
    });


    [...photos].forEach(item =>{
        item.addEventListener('click',(e)=>{

            const source = (e.srcElement.attributes[1].value).match(regexp);
            fullPhoto.setAttribute('src',source);
            ((fullPhoto.parentElement).parentElement).style.display='block';

        });
    });


    [...delet].forEach((item)=>{
        item.addEventListener('click',(e)=>{

            
            const sourse = (e.target.parentElement.children[0].attributes[1].value).match(regexp);
            deleteInfo.push(sourse);
            
            localStorage.setItem('deleted', deleteInfo);

            (e.target.parentElement).remove();
            countPhoto.innerHTML = res.count() + " photos";

            

        })
    })


    recoverAll.addEventListener('click',()=>{
        localStorage.clear();
        location.reload();
    });

    
    function setDeleted(){

        if(localStorage.getItem('deleted')==null){
            return;
        } else if(!(localStorage.getItem('deleted')).includes(',')){
            deleteInfo.push(localStorage.getItem('deleted'));
            setPhotoitems(deleteInfo[0]);
        } else {
            deleteInfo=localStorage.getItem('deleted').split(',');
            [...deleteInfo].forEach(del =>{
                setPhotoitems(del);
            })
        }

        
    }

   function setPhotoitems(val){
    [...(document.getElementsByClassName('photoitem'))].forEach((item)=>{
        if (val==item.outerHTML.match(regexp)){
            item.remove();
        }
    });
   }

});


