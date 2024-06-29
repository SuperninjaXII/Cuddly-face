const canvas = document.querySelector('#cvs');
const ctx = canvas.getContext("2d");

// Setting the width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var x = 20, y = 100;

// Defining the draw function
const draw = () => {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
};

const update = () => {
    y -= 1;
};

// Calling the draw function
const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    update();
    requestAnimationFrame(loop);
};

loop();
