const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');

canvas.width=window.innerWidth;
canvas.heigth= window.innerHeight;

//Ajusta el tamaño de la pantalla
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const flores = [];
function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

//Esta funcion lo que hara es de que nos va a crear la flor
function crearFlor() {
  flores.push({
    x: randomBetween(20, canvas.width - 20),
    y: canvas.height + 60,
    size: randomBetween(12, 22),
    speed: randomBetween(0.6, 1.5),
    opacity: 1,
    swayAngle: Math.random() * Math.PI * 2,
    swaySpeed: randomBetween(0.01, 0.03),
    color: ['#ff69b4', '#ff1493', '#ff85c2', '#e75480', '#ffb6c1'][Math.floor(Math.random() * 5)]
  });
}

//Esta funcion le dara la animacion
function lighten(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.min(r + 40, 255)}, ${Math.min(g + 40, 255)}, ${Math.min(b + 40, 255)})`;
}

function dibujarAmapola(x, y, size, color, opacity) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.translate(x, y);

  // Tallo
  ctx.beginPath();
  ctx.moveTo(0, size * 1.5);
  ctx.lineTo(0, size * 3.5);
  ctx.strokeStyle = '#2d6a2d';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Hoja
  ctx.beginPath();
  ctx.ellipse(-size * 0.6, size * 2.5, size * 0.5, size * 0.2, -0.5, 0, Math.PI * 2);
  ctx.fillStyle = '#3a8a3a';
  ctx.fill();

  // Pétalos
  const colores = [color, lighten(color)];
  for (let i = 0; i < 6; i++) {
    ctx.save();
    ctx.rotate((i / 6) * Math.PI * 2);
    ctx.beginPath();
    ctx.ellipse(0, -size * 0.8, size * 0.35, size * 0.8, 0, 0, Math.PI * 2);
    ctx.fillStyle = colores[i % 2];
    ctx.globalAlpha = opacity * 0.9;
    ctx.fill();
    ctx.restore();
  }
  // Centro negro
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
  ctx.fillStyle = '#111';
  ctx.globalAlpha = opacity;
  ctx.fill();

  // Puntos amarillos del centro
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(Math.cos(a) * size * 0.18, Math.sin(a) * size * 0.18, size * 0.06, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd700';
    ctx.fill();
  }

  ctx.restore();
}

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = flores.length - 1; i >= 0; i--) {
    const f = flores[i];
    f.swayAngle += f.swaySpeed;
    f.x += Math.sin(f.swayAngle) * 0.5;
    f.y -= f.speed;

    // Elimina la flor cuando sale de la pantalla
    if (f.y < -80) {
      flores.splice(i, 1);
      continue;
    }

    // Se desvanece al llegar arriba
    if (f.y < 100) {
      f.opacity = f.y / 100;
    }

    dibujarAmapola(f.x, f.y, f.size, f.color, f.opacity);
  }

  requestAnimationFrame(animar);
}

// Crea una flor cada 600ms
setInterval(crearFlor, 600);

// Inicia la animación
animar();
