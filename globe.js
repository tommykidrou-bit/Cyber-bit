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
  const routes = [[-.8, .3, .7, .5], [-.6, -.1, .8, .2], [-.2, .6, .6, -.2]];
  function resize() {
    const box = canvas.getBoundingClientRect();
    width = box.width; height = box.height;
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  }
  function project(lat, lon, radius) {
    const x = Math.cos(lat) * Math.sin(lon + angle);
    const z = Math.cos(lat) * Math.cos(lon + angle);
    return [width * .57 + x * radius, height * 1.1 - Math.sin(lat) * radius * .7 - z * radius * .35, z];
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    const r = Math.min(width * .44, height * 1.4);
    ctx.lineWidth = .6;
    // Projected latitude and longitude rings rotate as a single sphere.
    for (let ring = 0; ring < 15; ring++) {
      ctx.beginPath(); let drawing = false;
      for (let step = 0; step <= 80; step++) {
        const t = step / 80;
        const lat = ring < 7 ? (ring - 3) * .22 : (t - .5) * Math.PI;
        const lon = ring < 7 ? t * Math.PI * 2 : (ring - 7) * Math.PI / 4;
        const [x,y,z] = project(lat,lon,r);
        if (z < 0) { drawing = false; continue; }
        if (!drawing) ctx.moveTo(x,y); else ctx.lineTo(x,y);
        drawing = true;
      }
      ctx.strokeStyle = 'rgba(46,178,233,0.23)'; ctx.stroke();
    }
    for (let i=0; i<65; i++) {
      const lat = Math.sin(i * 2.399) * 1.1, lon = i * 2.399;
      const [x,y,z] = project(lat,lon,r);
      if (z <= 0) continue;
      ctx.beginPath();ctx.arc(x,y,1 + z,0,Math.PI*2);
      ctx.fillStyle = `rgba(108,224,255,${.15 + z*.55})`;ctx.fill();
    }
    routes.forEach(([a,b,c,d], i) => {
      const t = (angle * .8 + i / 3) % 1;
      const [x1,y1] = project(b,a,r), [x2,y2] = project(d,c,r);
      const mx=(x1+x2)/2, my=Math.min(y1,y2)-r*.5;
      ctx.beginPath();ctx.moveTo(x1,y1);ctx.quadraticCurveTo(mx,my,x2,y2);ctx.strokeStyle='rgba(54,194,243,0.27)';ctx.stroke();
      const x=(1-t)**2*x1+2*(1-t)*t*mx+t*t*x2;
      const y=(1-t)**2*y1+2*(1-t)*t*my+t*t*y2;
      ctx.beginPath();ctx.arc(x,y,2,0,Math.PI*2);ctx.fillStyle='#a4efff';ctx.fill();
    });
  }
  function animate(time) {
    frame=0;
    if (previous && time-previous<40) { frame=requestAnimationFrame(animate);return; }
    angle += previous ? Math.min(time-previous,80)*.000035 : 0;
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
