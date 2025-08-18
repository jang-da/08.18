const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const TARGET_SIZE = 50;
const FAKE_PROBABILITY = 1 / 3;

let target = {
    x: 0,
    y: 0,
    width: TARGET_SIZE,
    height: TARGET_SIZE,
    isFake: false
};

let score = 0;

function spawnNewTarget() {
    // Set new position
    target.x = Math.random() * (canvas.width - target.width);
    target.y = Math.random() * (canvas.height - target.height);

    // Decide if it's fake
    target.isFake = Math.random() < FAKE_PROBABILITY;
}

// Move the target every 0.1 seconds
setInterval(spawnNewTarget, 100);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set color based on whether it's fake
    ctx.fillStyle = target.isFake ? 'red' : 'blue';
    ctx.fillRect(target.x, target.y, target.width, target.height);

    // Draw score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 25);
}

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const isClicked = mouseX >= target.x && mouseX <= target.x + target.width &&
                      mouseY >= target.y && mouseY <= target.y + target.height;

    if (isClicked) {
        if (!target.isFake) {
            score++;
        }
        // Move to a new spot immediately after a click
        spawnNewTarget();
    }
});

function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

// Initial placement
spawnNewTarget();
gameLoop();
