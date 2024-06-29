const canvas = document.querySelector('#cvs');
const ctx = canvas.getContext("2d");

// Setting the width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const numParticles = 200;

class Particle {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = 5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
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
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let vx = (Math.random() - 0.5) * 2;
    let vy = (Math.random() - 0.5) * 2;
    particles.push(new Particle(x, y, vx, vy));
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
