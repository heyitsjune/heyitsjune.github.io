const cursor = document.createElement("div");
cursor.hidden = true;
cursor.setAttribute("id", "cursor");
document.body.appendChild(cursor);

const lerp = (a, b, t) => a + (b - a) * t;
const smoothness = 0.05;

let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;
let currentX = 0;
let currentY = 0;

window.addEventListener("mousemove", (e) => {
    cursor.hidden = false;
    const size = cursor.getBoundingClientRect().width / 2
    targetX = e.clientX - size;
    targetY = e.clientY - size
})

function animate() {
    currentX = lerp(currentX, targetX, smoothness);
    currentY = lerp(currentY, targetY, smoothness);
    cursor.style = `
    left:   ${currentX}px;
    top:    ${currentY}px;
    `;
    requestAnimationFrame(animate);
}

animate();