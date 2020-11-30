

const canvas = document.querySelector('canvas'),
      context = canvas.getContext('2d'),
      circle = [] , particles = [];

const { innerWidth , innerHeight } = window;

canvas.width = innerWidth;
canvas.height = innerHeight;

let x = innerWidth / 2 , y = innerHeight / 2 ;






class Effect{

      constructor(x , y , radius , color , radians , vel){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.radians = radians;
        this.velocity = 0.05;
        this.vel = vel;
        this.distance =  15;
        this.circleTime = 50;
      }

      draw(){
          context.beginPath();
          context.arc(this.x,this.y, this.radius, 0 , Math.PI * 2,false);
          context.fillStyle = this.color;
          context.shadowColor = this.color;
          context.shadowBlur = 20;
          context.fill();
          context.closePath();
          context.shadowBlur = 0;
      }

      update(){
         this.radians += this.velocity;
         this.x = x + Math.cos(this.radians) * 120;
         this.y = y + Math.sin(this.radians) * 120;
         this.circleTime--;
         this.draw();
      }

  
      updateParticles(){
        this.x += this.vel.x;
        this.y += this.vel.y;
        this.distance--;
        this.draw();
     }

}


function getRandomColor() {
  const colors = ['#45B600' , '#07CB46', '#F2D04B','#D3098D', '#778EBE','#269F82','#EEB70F','#8051F5', '#D4B304', '#67E3D5','#17F1AC','#83F4DD','#50F73A', '#D139BA', '#2541F7','#F9FC47'];
   return colors[Math.floor(Math.random() * colors.length)];
}

function getAngleIncreament(particleCount){
      return ( Math.PI * 2 ) / particleCount;
}



function onClickHandler(){

  const particleCount = 50  , particleCount1 = 80 , color = getRandomColor();

  setTimeout(() => {

      for(let i = 0 ; i< particleCount ; i++){

        const effect= new Effect(x , y , 2 , color , 0 ,
          { x : Math.cos( getAngleIncreament(particleCount) * i) * Math.random() * 10, 
            y : Math.sin( getAngleIncreament(particleCount) * i) * Math.random() * 10
          }
        );

        particles.push(effect)
      }

  }, 200);


 

  for(let i = 0 ; i< particleCount1 ; i++){
    const effect= new Effect(x , y , 6 , color , 0 ,
      { x : Math.cos( getAngleIncreament(particleCount1) * i) * 7, 
        y : Math.sin( getAngleIncreament(particleCount1) * i) * 7 
      }
    );
    particles.push(effect)
  }


  setTimeout(()=>{

    for(let i = 0 ; i< 2 ; i++){
      const effect = new Effect( x , y , 4  , color , i * 3.6);
      circle.push(effect);
    }

  },300)
  
 
}

addEventListener('click',(e)=>{
    x  = e.clientX ;
    y =  e.clientY ;
    onClickHandler();
})


function animationKeyFrame(){

  requestAnimationFrame(animationKeyFrame)

  context.fillStyle = 'rgba(0,0,0,.2)';
  context.fillRect(0,0,innerWidth,innerHeight);


  circle.forEach( (loader,i) =>{
        loader.circleTime < 0 ? circle.slice(i,1) : loader.update();
  })

  particles.forEach( (particle , i) =>{
    particle.distance < 0 ? particles.slice(i,1) : particle.updateParticles();
  })
}

animationKeyFrame();