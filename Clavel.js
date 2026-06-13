
const btn= document.getElementById('GenCla');
const canvas= document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width=400;
canvas.height=400;

//Estos arreglos dan color a los petalos
const palettes = [
['#c0152a', '#e01830', '#f03050'],
['#b5006e', '#d4008a', '#f020aa'],
['#e06000', '#f08020', '#f9a050'],
['#ffffff', '#f0e0e8', '#e0c0cc'],
['#8800cc', '#aa20ee', '#cc60ff'],
];

//Esta funcion va a dibujarlo
function drawCarnation(cx,cy, color1, color2, color3, scale){
ctx.clearRect(0, 0, canvas.width , canvas.height);
ctx.save();
ctx.translate(cx, cy);
ctx.scale(scale, scale);


//Tallos
ctx.beginPath();
ctx.moveTo(0,80);
ctx.bezierCurveTo(-20, 40, -10, 0, 0,-20);
ctx.strokeStyle = '#2d6a2d';
ctx.lineWidth = 5;
ctx.lineCap = 'round';
ctx.stroke();

//Hoja
ctx.beginPath();
ctx.moveTo(-5, 30);
ctx.bezierCurveTo(-40, 10, -50, -20, -40, -40);
ctx.bezierCurveTo(-20, -10, -8, 10, -5, 30);
ctx.fillStyle = '#3a8a3a';
ctx.fill();

//Sépalos
ctx.beginPath();
ctx.ellipse(0, -22, 18, 10, 0, 0, Math.PI * 2);
ctx.fillStyle = '#2d6a2d';
ctx.fill();

//Este arreglo le da posicion a los petalos
const layers = [
{ r: 38, count: 12, color: color1, offsetY: -65 },
{ r: 30, count: 12, color: color2, offsetY: -55 },
{ r: 20, count: 9,  color: color3, offsetY: -48 },
];

layers.forEach(layer => {
for (let i = 0; i < layer.count; i++) {
const angle = (i / layer.count) * Math.PI * 2;
ctx.save();
ctx.translate(0, layer.offsetY);
ctx.rotate(angle);
ctx.beginPath();
ctx.ellipse(0, -layer.r * 0.5, 13, layer.r * 0.55, 0, 0, Math.PI * 2);
ctx.fillStyle = layer.color;
ctx.globalAlpha = 0.9;
ctx.fill();
ctx.restore();
    }
});


//Centro
ctx.beginPath();
ctx.arc(0, -52, 12, 0, Math.PI * 2);
ctx.fillStyle = '#8b0010';
ctx.globalAlpha = 1;
ctx.fill();

ctx.restore();
}

btn.addEventListener('click', function() {

  // 1. Animación del botón
  btn.classList.add('activo');
  setTimeout(function() {
    btn.classList.remove('activo');
  }, 300);

  // 2. Dibuja el clavel
  const p = palettes[Math.floor(Math.random() * palettes.length)];
  const scale = 2.5 + Math.random() * 0.3;

  drawCarnation(200, 320, p[0], p[1], p[2], scale);
});
