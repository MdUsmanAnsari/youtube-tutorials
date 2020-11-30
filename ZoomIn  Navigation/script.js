
const btnNav = document.querySelector('.btn-nav');
const nav   = document.querySelector('.nav');
const navItems = document.querySelectorAll('.nav-items');



let navClose = true;

const handlerNavigation = () =>{

    let scale = 1 , translateY = 0;

    //Step 1

    btnNav.classList.toggle('ri-close-line');
    btnNav.classList.toggle('ri-menu-line');

    // Step 2

    nav.classList.toggle('nav-open');
    nav.classList.toggle('nav-close');
    
    //Step 3

    if(!navClose){
        scale = 4;
        translateY = -100;
    }

    navItems.forEach( (item,index)=>{
     
        item.setAttribute('style',`transition-delay:.${ index + 1 }s;transform: translateY(${translateY}vh) scale(${scale})`);
                
    });


    navClose = !navClose;

}


// Event Added

btnNav.addEventListener('click', handlerNavigation);