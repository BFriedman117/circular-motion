const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

function randomRange(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function Particle(x, y, radius, color){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.radians = Math.random() * Math.PI * 2;
  this.velocity = .05
  this.color = color || 'black'
  this.distanceFromCenter = {
    x: randomRange(50, 320),
    y: randomRange(100, 320)
  }

  this.draw = function() {

    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  this.update = function(){

    this.radians += this.velocity

    this.x = x + Math.cos(this.radians) * this.distanceFromCenter.x
    this.y = y + Math.sin(this.radians) * this.distanceFromCenter.y

    this.draw()
  }
}


let colors = ['#00bdff', '#4d39cd', '#088eff']

let particles;
function init(){
  particles = [];

  for (let i = 0; i < 50; i++){
    particles.push(new Particle(canvas.width / 2, canvas.height / 2, randomRange(5, 10), colors[randomRange(0, colors.length - 1)]))
  }
}

let centerParticle = new Particle (canvas.width / 2, canvas.height / 2, 15, 'gold')


function animate(){
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(255, 255, 255, 0.3)'
  c.fillRect(0, 0, innerWidth, innerHeight);
  centerParticle.draw()
  particles.forEach(particle => particle.update())
}

init()
animate()
