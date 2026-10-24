// Decorative globe: one local canvas, no external scripts or requests.
(() => {
  const canvas = document.querySelector('#globe');
  const button = document.querySelector('#motion-toggle');
  const section = document.querySelector('.technology-band');
  if (!canvas || !button || !section) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) { button.hidden = true; return; }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false, visible = false, frame = 0, previous = 0, angle = 0, width = 0, height = 0;
  const texture = new Image();
  let pixels = null, textureWidth = 0, textureHeight = 0;
  const size = 280;
  const surface = document.createElement('canvas'); surface.width = surface.height = size;
  const surfaceContext = surface.getContext('2d');
  const image = surfaceContext.createImageData(size, size);
  const samples = [];
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const nx = (x - size / 2) / (size / 2 - 2), ny = (y - size / 2) / (size / 2 - 2);
    const distance = nx * nx + ny * ny;
    if (distance > 1) continue;
    const z = Math.sqrt(1 - distance);
    samples.push({ index: (y * size + x) * 4, longitude: Math.atan2(nx, z), latitude: Math.asin(-ny), light: .5 + .5 * Math.max(0, -.25 * nx - .3 * ny + .9 * z) });
  }
  texture.addEventListener('load', () => {
    const reader = document.createElement('canvas'); reader.width = textureWidth = texture.width; reader.height = textureHeight = texture.height;
    const rc = reader.getContext('2d'); rc.drawImage(texture, 0, 0);
    pixels = rc.getImageData(0, 0, textureWidth, textureHeight).data; draw();
  });
  texture.src = 'assets/globe-texture.webp';
  function resize() {
    const box = canvas.getBoundingClientRect(); width = box.width; height = box.height;
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0); draw();
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    if (!pixels) return;
    const radius = Math.min(width * .37, height * .46), cx = width * .55, cy = height * .46;
    const halo = ctx.createRadialGradient(cx, cy, radius * .8, cx, cy, radius * 1.25);
    halo.addColorStop(0, '#0a81af50'); halo.addColorStop(.65, '#0a81af30'); halo.addColorStop(1, '#0a81af00');
    ctx.fillStyle = halo; ctx.fillRect(0, 0, width, height);
    for (const point of samples) {
      let u = (point.longitude + angle) / (Math.PI * 2) + .5;
      u = u - Math.floor(u);
      const v = .5 - point.latitude / Math.PI;
      const source = (Math.min(textureHeight - 1, Math.floor(v * textureHeight)) * textureWidth + Math.floor(u * textureWidth)) * 4;
      const i = point.index;
      image.data[i] = pixels[source] * point.light;
      image.data[i+1] = pixels[source+1] * point.light;
      image.data[i+2] = pixels[source+2] * point.light;
      image.data[i+3] = 255;
    }
    surfaceContext.putImageData(image, 0, 0);
    ctx.drawImage(surface, cx-radius, cy-radius, radius*2, radius*2);
    ctx.beginPath(); ctx.arc(cx,cy,radius,0,Math.PI*2); ctx.strokeStyle='#55dcff';ctx.lineWidth=1.2;ctx.stroke();
    // Orbital connections and moving packets around the rotating Earth.
    for (let i=0;i<3;i++) {
      const tilt = -.4 + i*.5, a = radius*1.16, b = radius*.4;
      ctx.save();ctx.translate(cx,cy);ctx.rotate(tilt);
      ctx.beginPath();ctx.ellipse(0,0,a,b,0,0,Math.PI*2);ctx.strokeStyle='rgba(51,190,239,.45)';ctx.lineWidth=.8;ctx.stroke();
      const t=angle*2+i*2;ctx.beginPath();ctx.arc(Math.cos(t)*a,Math.sin(t)*b,2.3,0,Math.PI*2);ctx.fillStyle='#c9faff';ctx.fill();ctx.restore();
    }
  }
  function animate(time) {
    frame=0;
    if (previous && time-previous<40) { frame=requestAnimationFrame(animate);return; }
    angle += previous ? Math.min(time-previous,80)*.00012 : 0;
    previous=time;draw();
    if (!paused && !reduced.matches && visible && !document.hidden) frame=requestAnimationFrame(animate);
  }
  function sync() {
    cancelAnimationFrame(frame);frame=0;previous=0;
    const stopped=paused||reduced.matches;
    section.classList.toggle('motion-paused',stopped);
    button.setAttribute('aria-pressed',String(stopped));
    button.textContent=reduced.matches ? 'Animacija išjungta pagal jūsų nuostatas' : paused ? 'Paleisti animaciją' : 'Pristabdyti animaciją';
    button.disabled=reduced.matches;
    if (!stopped && visible && !document.hidden) frame=requestAnimationFrame(animate); else draw();
  }
  button.addEventListener('click',()=>{paused=!paused;sync();});
  reduced.addEventListener('change',sync);
  document.addEventListener('visibilitychange',sync);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{rootMargin:'80px'}).observe(section);
  new ResizeObserver(resize).observe(canvas);
  sync();resize();
})();
