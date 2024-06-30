const canvas = document.querySelector('#cvs');
const ctx = canvas.getContext("2d");

// Setting the width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const numParticles = 300;

class Particle {
    constructor(x, y, vx, vy,radius,red,blue,green,opacity) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.red = red;
        this.green=green;
        this.blue=blue;
        this.opacity = opacity
    }

    update() {
        this.x += this.vx;
        this.y -= this.vy;
    }

    draw() {
        ctx.fillStyle = `rgba(${this.red},${this.green},${this.blue},${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        
    }

    isOffscreen() {
        return (
            this.x < 0 || this.x > canvas.width ||
            this.y < 0 || this.y > canvas.height
        );
    }
}

// Initialize particles
for (let i = 0; i < numParticles; i++) {
    /*location*/
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let vx = (Math.random() - 0.5) * 2;
    let vy = (Math.random() - 0.5) * 2;
    /*color*/
    let red = (Math.random()*255);
    
    let green = (Math.random()*255);
    
    let blue = (Math.random()*255);

    /*size*/
    let Z=(Math.random()*5);
    let Alpha;
    if(Z<2.5){
        Alpha=(Math.random()*0.5)
    }
    /*spawning*/
    particles.push(new Particle(x, y, vx, vy,Z,red,green,blue,Alpha));
    
}

const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.update();
        p.draw();

        // Remove particle if offscreen
        if (p.isOffscreen()) {
            particles.splice(i, 1);
        }
    }

    requestAnimationFrame(loop);
};

loop();
//end of partcles
//now begin the fading animation
gsap.fromTo('#cvs',{opacity:0}, {
    scrollTrigger: canvas, // start animation when ".box" enters the viewport
    opacity:1,
    duration:6,
});
