const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let realTarget = {
    x: Math.random() * (canvas.width - 50),
    y: Math.random() * (canvas.height - 50),
    width: 50,
    height: 50,
    color: 'blue'
};

let fakeTarget = {
    x: Math.random() * (canvas.width - 50),
    y: Math.random() * (canvas.height - 50),
    width: 50,
    height: 50,
    color: 'red'
};

let score = 0;

function moveTargetsToRandomPositions() {
    realTarget.x = Math.random() * (canvas.width - 50);
    realTarget.y = Math.random() * (canvas.height - 50);

    // Ensure targets don't overlap after moving
    do {
        fakeTarget.x = Math.random() * (canvas.width - 50);
        fakeTarget.y = Math.random() * (canvas.height - 50);
    } while (
        Math.abs(realTarget.x - fakeTarget.x) < realTarget.width &&
        Math.abs(realTarget.y - fakeTarget.y) < realTarget.height
    );
}

// Move the real target every second
setInterval(function() {
    realTarget.x = Math.random() * (canvas.width - 50);
    realTarget.y = Math.random() * (canvas.height - 50);
}, 1000);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw real target
    ctx.fillStyle = realTarget.color;
    ctx.fillRect(realTarget.x, realTarget.y, realTarget.width, realTarget.height);

    // Draw fake target
    ctx.fillStyle = fakeTarget.color;
    ctx.fillRect(fakeTarget.x, fakeTarget.y, fakeTarget.width, fakeTarget.height);


    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 25);
}

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let realClicked = mouseX >= realTarget.x && mouseX <= realTarget.x + realTarget.width &&
                      mouseY >= realTarget.y && mouseY <= realTarget.y + realTarget.height;

    let fakeClicked = mouseX >= fakeTarget.x && mouseX <= fakeTarget.x + fakeTarget.width &&
                      mouseY >= fakeTarget.y && mouseY <= fakeTarget.y + fakeTarget.height;

    if (realClicked) {
        score++;
        moveTargetsToRandomPositions();
    } else if (fakeClicked) {
        // Don't increase score, just move the targets
        moveTargetsToRandomPositions();
    }
});


function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

moveTargetsToRandomPositions(); // Initial placement
gameLoop();
