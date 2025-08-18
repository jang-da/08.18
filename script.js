const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let box = {
    x: Math.random() * (canvas.width - 50),
    y: Math.random() * (canvas.height - 50),
    width: 50,
    height: 50,
    color: 'blue'
};

let score = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = box.color;
    ctx.fillRect(box.x, box.y, box.width, box.height);

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 25);
}

function update() {
    // Game logic would go here
}

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (
        mouseX >= box.x &&
        mouseX <= box.x + box.width &&
        mouseY >= box.y &&
        mouseY <= box.y + box.height
    ) {
        score++;
        box.x = Math.random() * (canvas.width - 50);
        box.y = Math.random() * (canvas.height - 50);
    }
});


function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
