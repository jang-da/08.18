const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let realTarget = {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    color: 'blue'
};

let fakeTarget = {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    color: 'red'
};

let score = 0;

function moveTargets() {
    // Set a new random position for the real target
    realTarget.x = Math.random() * (canvas.width - realTarget.width);
    realTarget.y = Math.random() * (canvas.height - realTarget.height);

    // Position the fake target adjacent to the real target
    const offsets = [
        { x: realTarget.width, y: 0 },   // Right
        { x: -realTarget.width, y: 0 },  // Left
        { x: 0, y: realTarget.height },  // Bottom
        { x: 0, y: -realTarget.height }  // Top
    ];

    // Shuffle offsets to randomize fake target's position
    for (let i = offsets.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [offsets[i], offsets[j]] = [offsets[j], offsets[i]];
    }

    let positionFound = false;
    for (const offset of offsets) {
        const potentialX = realTarget.x + offset.x;
        const potentialY = realTarget.y + offset.y;

        // Check if the potential position is within canvas bounds
        if (
            potentialX >= 0 &&
            potentialX <= canvas.width - fakeTarget.width &&
            potentialY >= 0 &&
            potentialY <= canvas.height - fakeTarget.height
        ) {
            fakeTarget.x = potentialX;
            fakeTarget.y = potentialY;
            positionFound = true;
            break;
        }
    }

    // Fallback if no position is found
    if (!positionFound) {
        if (realTarget.x > canvas.width / 2) {
            fakeTarget.x = realTarget.x - realTarget.width;
        } else {
            fakeTarget.x = realTarget.x + realTarget.width;
        }
        if (realTarget.y > canvas.height / 2) {
            fakeTarget.y = realTarget.y - realTarget.height;
        } else {
            fakeTarget.y = realTarget.y + realTarget.height;
        }
    }
}


// Move the targets every 0.3 seconds
setInterval(moveTargets, 300);

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
        moveTargets();
    } else if (fakeClicked) {
        // Don't increase score, just move the targets
        moveTargets();
    }
});


function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

moveTargets(); // Initial placement
gameLoop();
