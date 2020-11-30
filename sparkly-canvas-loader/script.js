
 


const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const { innerWidth , innerHeight } = window;

canvas.width = innerWidth;
canvas.height = innerHeight;

let x = innerWidth / 2 ,
    y = innerHeight / 2 ;



class Loader{

      constructor(x , y , radius , color , angle ,velocity, axis){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.radians = 0;
        this.velocity = velocity;
        this.anagle = angle; 
        this.axis = axis;
      }

      draw(){
          context.beginPath();
          context.arc(this.x,this.y, this.radius, 0 , Math.PI * 2,false);
          context.fillStyle = this.color;
          context.shadowColor = this.color;
          context.shadowBlur = 10;
          context.fill();
          context.closePath();
          context.shadowBlur = 0;
      }

      update(){
         this.radians += this.velocity;
         this.x = x + Math.cos(this.radians + this.anagle.x ) * 100
         this.y = y + Math.sin(this.radians + this.anagle.y ) * 100;
         this.draw();
      }

     updateSmallParticles(){
        this.radians += this.velocity;
        this.x = x + this.axis.x + (Math.random() * 10) + Math.cos(this.radians + this.anagle.x ) * 100 ;
        this.y = y + this.axis.y + (Math.random() * -10)  + Math.sin(this.radians + this.anagle.y ) * 100;
        this.draw();
     }


  


}


const circle = []
const particle = []

function init(){

  
        const smallParticlePeice = 20,
              angleIncreament = ( Math.PI * 2 ) / smallParticlePeice,
              circleRadius = 4,
              velocity = 0.06;


        const loader1 = new Loader( x , y , circleRadius  , '#f9ca24',{ x: -8 , y : 10}, velocity);
        circle.push(loader1);

        const loader2 = new Loader( x , y , circleRadius  , '#7ed6df',{ x: 10 , y : -8}, -velocity);
        circle.push(loader2);

        for(let i = 0 ; i < smallParticlePeice ; i++){

           const axisX  = Math.cos(angleIncreament * i) * 5;
           const axisY  = Math.sin(angleIncreament * i) * 5;

            setTimeout(() => {

              const loader4 = new Loader( x , y , .8  , '#f9ca24',{ x: -8 , y : 10}, velocity ,{x : axisX,y : axisY});

              particle.push(loader4);  

              const loader3 = new Loader( x , y , .8  , '#7ed6df',{ x: 10 , y : -8},-velocity ,{x:axisX,y :axisY});
              particle.push(loader3);    

            }, smallParticlePeice * i);

        }

}


function animationKeyFrame(){

  requestAnimationFrame(animationKeyFrame)
  context.fillStyle = 'rgba(0,0,0,.25)';
  context.fillRect(0,0,innerWidth,innerHeight);

  circle.forEach(loader =>{
      loader.update();
  })

  particle.forEach(loader =>{
    loader.updateSmallParticles();
  })
 
}

init();
animationKeyFrame();