const cursor = document.createElement("div");
cursor.setAttribute("id", "cursor");
document.body.appendChild(cursor);

const lerp = (a, b, t) => a + (b - a) * t;
const smoothness = 0.05;

let targetX = 0;
let targetY = 0;
let targetZ = 0;
let currentX = 0;
let currentY = 0;

window.addEventListener("mousemove", (e) => {
    const size = cursor.getBoundingClientRect().width / 2
    targetX = e.clientX - size;
    targetY = e.clientY - size
    const z = parseInt(getComputedStyle(e.target).zIndex) || 0;
    targetZ = z;
})

function animate() {
    currentX = lerp(currentX, targetX, smoothness);
    currentY = lerp(currentY, targetY, smoothness);
    cursor.style = `
    left:   ${currentX}px;
    top:    ${currentY}px;
    z-index:    ${targetZ + 1};`;
    requestAnimationFrame(animate);
}
animate();