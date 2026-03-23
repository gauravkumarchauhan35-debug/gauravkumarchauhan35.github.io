// ================= PARTICLES BACKGROUND =================
document.addEventListener("DOMContentLoaded", function () {

  particlesJS("particles-js", {

    particles: {
      number: {
        value: 80,
        density: { enable: true, value_area: 900 }
      },

      color: {
        value: "#00c2ff"
      },

      shape: { type: "circle" },

      opacity: {
        value: 0.5,
        random: true
      },

      size: {
        value: 3,
        random: true
      },

      line_linked: {
        enable: true,
        distance: 140,
        color: "#00c2ff",
        opacity: 0.3,
        width: 1
      },

      move: {
        enable: true,
        speed: 1.5
      }
    },

    interactivity: {
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" }
      }
    },

    retina_detect: true
  });

});


// ================= EXTRA CANVAS GLOW EFFECT (NEXT LEVEL) =================
const canvas = document.createElement("canvas");
canvas.id = "projects-bg";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

let particles = [];

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6
  });
}

function animate() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    // glow particle
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#00c2ff";
    ctx.shadowBlur = 12;
    ctx.shadowColor = "#00c2ff";
    ctx.fill();

    // connection lines
    particles.forEach(p2 => {
      let dx = p.x - p2.x;
      let dy = p.y - p2.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = "rgba(0,194,255,0.08)";
        ctx.stroke();
      }
    });

  });

  requestAnimationFrame(animate);
}

animate();