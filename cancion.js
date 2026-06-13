const audio = document.getElementById('audio');
const btnPlay = document.getElementById('btnPlay');
const progreso = document.getElementById('progreso');
const tiempoActual = document.getElementById('tiempoActual');
const tiempoTotal = document.getElementById('tiempoTotal');

function formatearTiempo(seg){
    const m= Math.floor(seg/60);
    const s=Math.floor(seg%60);
    return m + ':' + (s < 10 ? '0' : '') + s;
}

audio.addEventListener('loadedmetadata', function() {
  tiempoTotal.textContent = formatearTiempo(audio.duration);
});

audio.addEventListener('timeupdate', function() {
  const porcentaje = (audio.currentTime / audio.duration) * 100;
  progreso.style.width = porcentaje + '%';
  tiempoActual.textContent = formatearTiempo(audio.currentTime);
});

function togglePlay(){
    if (audio.paused){
        audio.play();
        btnPlay.textContent="⏸";
    }else{
        audio.pause();
        btnPlay.textContent = '▶';
    }
}

function retroceder(){
    audio.currentTime = Math.max(0, audio.currentTime - 10);
}

function adelantar(){
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
}

function cambiarVolumen(val){
    audio.volume=val;
}