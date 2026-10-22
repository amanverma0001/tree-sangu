/**
 * Romantic Fractal Tree Animation Web App
 * Step-by-step growing fractal tree with glowing fairy blossoms,
 * authentic turtle cursor, ambient stardust, Web Audio music box,
 * photo memories gallery with interactive slideshow, and custom romantic messages.
 */

(function() {
  'use strict';

  // --- DOM Elements ---
  const treeCanvas = document.getElementById('tree-canvas');
  const treeCtx = treeCanvas.getContext('2d');
  const bgCanvas = document.getElementById('bg-canvas');
  const bgCtx = bgCanvas.getContext('2d');
  
  const introOverlay = document.getElementById('intro-overlay');
  const openBtn = document.getElementById('open-btn');
  const openBtnText = document.getElementById('open-btn-text');
  const introName = document.getElementById('intro-name');
  
  const musicToggle = document.getElementById('music-toggle');
  const musicIcon = document.getElementById('music-icon');
  const musicLabel = document.getElementById('music-label');
  const soundWave = document.getElementById('sound-wave');

  const loveTextEl = document.getElementById('love-text');
  const personalizedNoteEl = document.getElementById('personalized-note');
  const heartParticlesContainer = document.getElementById('heart-particles');
  const replayBtn = document.getElementById('replay-btn');
  const screenshotBtn = document.getElementById('screenshot-btn');
  const shareBtn = document.getElementById('share-btn');
  const speedBtns = document.querySelectorAll('.speed-btn');
  const celebrationToast = document.getElementById('celebration-toast');
  const toastText = document.getElementById('toast-text');

  // --- Sangu Photo Memories Gallery Data ---
  const sanguPhotos = [
    {
      src: 'sangu_1.jpg',
      title: 'Ho, aate-jaate dekhoon tujh ko 🌹',
      sub: 'Jaane hua hai ye kya mujh ko... ✨'
    },
    {
      src: 'sangu_2.jpg',
      title: 'The way you look... 💖✨',
      sub: 'Har andaaz me behad khoobsurat bbu 🥰'
    },
    {
      src: 'sangu_3.jpg',
      title: 'Nain~Matakka & Pyari Smile 🌸',
      sub: 'Teal saree, green bangles & your lovely smile ✨'
    },
    {
      src: 'sangu_4.jpg',
      title: 'Shirt Da Button 🎶💖',
      sub: 'Love your voice & sweetness... always stay happy with me ✨'
    }
  ];

  // Photo Modal Elements
  const photoModal = document.getElementById('photo-modal');
  const photoModalOpenBtn = document.getElementById('photo-modal-open-btn');
  const galleryDockBtn = document.getElementById('gallery-dock-btn');
  const photoModalClose = document.getElementById('photo-modal-close');
  const photoModalBackdrop = document.getElementById('photo-modal-backdrop');
  const galleryImg = document.getElementById('gallery-img');
  const galleryTitle = document.getElementById('gallery-title');
  const gallerySub = document.getElementById('gallery-sub');
  const galleryCounter = document.getElementById('gallery-counter');
  const galleryPrev = document.getElementById('gallery-prev');
  const galleryNext = document.getElementById('gallery-next');
  const thumbBtns = document.querySelectorAll('.thumb-btn');

  let currentGalleryIndex = 0;

  function openPhotoModal(index = 0) {
    if (!photoModal) return;
    currentGalleryIndex = ((index % sanguPhotos.length) + sanguPhotos.length) % sanguPhotos.length;
    updateGalleryView(currentGalleryIndex);
    photoModal.classList.add('active');
    photoModal.setAttribute('aria-hidden', 'false');
  }

  function closePhotoModal() {
    if (!photoModal) return;
    photoModal.classList.remove('active');
    photoModal.setAttribute('aria-hidden', 'true');
  }

  function updateGalleryView(index) {
    currentGalleryIndex = ((index % sanguPhotos.length) + sanguPhotos.length) % sanguPhotos.length;
    const photo = sanguPhotos[currentGalleryIndex];

    if (galleryImg) {
      galleryImg.style.opacity = '0.2';
      galleryImg.style.transform = 'scale(0.96)';
      setTimeout(() => {
        galleryImg.src = photo.src;
        galleryImg.alt = photo.title;
        galleryImg.style.opacity = '1';
        galleryImg.style.transform = 'scale(1)';
      }, 140);
    }

    if (galleryTitle) galleryTitle.textContent = photo.title;
    if (gallerySub) gallerySub.textContent = photo.sub;
    if (galleryCounter) galleryCounter.textContent = `${currentGalleryIndex + 1} / ${sanguPhotos.length}`;

    thumbBtns.forEach((btn, idx) => {
      if (idx === currentGalleryIndex) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  if (photoModalOpenBtn) {
    photoModalOpenBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openPhotoModal(0);
    });
  }

  if (galleryDockBtn) {
    galleryDockBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openPhotoModal(0);
    });
  }

  if (photoModalClose) {
    photoModalClose.addEventListener('click', closePhotoModal);
  }

  if (photoModalBackdrop) {
    photoModalBackdrop.addEventListener('click', closePhotoModal);
  }

  if (galleryPrev) {
    galleryPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      updateGalleryView(currentGalleryIndex - 1);
    });
  }

  if (galleryNext) {
    galleryNext.addEventListener('click', (e) => {
      e.stopPropagation();
      updateGalleryView(currentGalleryIndex + 1);
    });
  }

  thumbBtns.forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateGalleryView(idx);
    });
  });

  // Swipe support on gallery modal for mobile devices
  const modalFrame = document.querySelector('.photo-modal-frame');
  if (modalFrame) {
    let touchStartX = 0;
    let touchEndX = 0;
    modalFrame.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    modalFrame.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 45) {
        updateGalleryView(currentGalleryIndex + 1);
      } else if (touchEndX - touchStartX > 45) {
        updateGalleryView(currentGalleryIndex - 1);
      }
    }, { passive: true });
  }

  // Keyboard navigation for gallery
  window.addEventListener('keydown', (e) => {
    if (!photoModal || !photoModal.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') {
      updateGalleryView(currentGalleryIndex - 1);
    } else if (e.key === 'ArrowRight') {
      updateGalleryView(currentGalleryIndex + 1);
    } else if (e.key === 'Escape') {
      closePhotoModal();
    }
  });

  // --- Intro Slideshow ---
  const heroSlides = document.querySelectorAll('#intro-slideshow .slide');
  const slideDots = document.querySelectorAll('#slide-dots .slide-dot');
  let currentHeroSlide = 0;
  let heroSlideshowTimer = null;

  function showHeroSlide(index) {
    if (!heroSlides.length) return;
    currentHeroSlide = ((index % heroSlides.length) + heroSlides.length) % heroSlides.length;

    heroSlides.forEach((slide, idx) => {
      if (idx === currentHeroSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    slideDots.forEach((dot, idx) => {
      if (idx === currentHeroSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function nextHeroSlide() {
    showHeroSlide(currentHeroSlide + 1);
  }

  function startHeroSlideshow() {
    if (heroSlideshowTimer) clearInterval(heroSlideshowTimer);
    heroSlideshowTimer = setInterval(nextHeroSlide, 3200);
  }

  function stopHeroSlideshow() {
    if (heroSlideshowTimer) {
      clearInterval(heroSlideshowTimer);
      heroSlideshowTimer = null;
    }
  }

  slideDots.forEach((dot, idx) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      showHeroSlide(idx);
      startHeroSlideshow();
    });
  });

  const heroPhotoWrapper = document.querySelector('.hero-photo-wrapper');
  if (heroPhotoWrapper) {
    heroPhotoWrapper.addEventListener('click', (e) => {
      if (!e.target.classList.contains('slide-dot')) {
        openPhotoModal(currentHeroSlide);
      }
    });
  }

  // Dismiss toast if tapped, and open photo gallery
  if (celebrationToast) {
    celebrationToast.addEventListener('click', () => {
      celebrationToast.classList.remove('show');
      openPhotoModal(0);
    });
  }

  // --- Configuration & State ---
  let speedMultiplier = 1.0;
  let animationRunning = false;
  let isTreeFinished = false;
  let userConfig = {
    name: 'Sangu',
    message: 'Always Stay Happy with me.. dear Sangu 💖✨',
    note: 'want to know you more bbu. 💖✨'
  };

  // Canvas size and scale
  let dpr = window.devicePixelRatio || 1;
  let viewWidth = window.innerWidth;
  let viewHeight = window.innerHeight;

  // Animation Action Queue
  let animationQueue = [];
  let currentActionIndex = 0;
  let currentSegmentProgress = 0;
  let turtle = {
    x: 0,
    y: 0,
    heading: -90,
    visible: true,
    size: 16,
    color: '#e63946'
  };

  let staticCanvas = document.createElement('canvas');
  let staticCtx = staticCanvas.getContext('2d');

  // Ambient particles
  const bgStars = [];
  const fireflies = [];
  const MAX_STARS = 60;
  const MAX_FIREFLIES = 35;

  // --- URL Query Params Parser ---
  function parseQueryParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('name')) {
      userConfig.name = params.get('name').trim();
    }
    if (params.has('msg')) {
      userConfig.message = params.get('msg').trim();
    }
    if (params.has('note')) {
      userConfig.note = params.get('note').trim();
    }
    updateUIFromConfig();
  }

  function updateUIFromConfig() {
    introName.textContent = userConfig.name ? `For ${userConfig.name} 💖` : 'For You 💖';
    
    const msg = userConfig.message;
    if (msg.includes('Always Stay Happy with me')) {
      loveTextEl.innerHTML = `
        <span class="sub-lead">Always Stay Happy with me..</span>
        <span class="main-name">dear ${userConfig.name || 'Sangu'} <span class="heart-emoji">💖✨</span></span>
      `;
    } else {
      const formatted = msg.replace(/(🧡|❤️|💕|💖|✨)/g, '<span class="heart-emoji">$1</span>');
      loveTextEl.innerHTML = `<span class="main-name">${formatted}</span>`;
    }

    personalizedNoteEl.textContent = userConfig.note || '';
  }

  // --- Responsive Resizing ---
  let resizeTimeout = null;
  function resizeCanvases() {
    const oldWidth = viewWidth;
    const oldHeight = viewHeight;

    dpr = Math.min(window.devicePixelRatio || 1, 2);
    viewWidth = window.innerWidth;
    viewHeight = window.innerHeight;

    let tempCanvas = null;
    if (isTreeFinished && oldWidth > 0 && oldHeight > 0) {
      tempCanvas = document.createElement('canvas');
      tempCanvas.width = staticCanvas.width;
      tempCanvas.height = staticCanvas.height;
      tempCanvas.getContext('2d').drawImage(staticCanvas, 0, 0);
    }

    [bgCanvas, treeCanvas, staticCanvas].forEach(cvs => {
      cvs.width = viewWidth * dpr;
      cvs.height = viewHeight * dpr;
      cvs.style.width = `${viewWidth}px`;
      cvs.style.height = `${viewHeight}px`;
    });

    bgCtx.scale(dpr, dpr);
    treeCtx.scale(dpr, dpr);
    staticCtx.scale(dpr, dpr);

    initBackgroundParticles();

    if (tempCanvas && isTreeFinished) {
      staticCtx.drawImage(tempCanvas, 0, 0, tempCanvas.width / dpr, tempCanvas.height / dpr, 0, 0, viewWidth, viewHeight);
      renderCompletedTreeStatic();
    }
  }

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvases, 150);
  });

  // --- Ambient Background Rendering ---
  function initBackgroundParticles() {
    bgStars.length = 0;
    for (let i = 0; i < MAX_STARS; i++) {
      bgStars.push({
        x: Math.random() * viewWidth,
        y: Math.random() * viewHeight,
        radius: Math.random() * 1.4 + 0.6,
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }

    fireflies.length = 0;
    for (let i = 0; i < MAX_FIREFLIES; i++) {
      fireflies.push({
        x: Math.random() * viewWidth,
        y: Math.random() * (viewHeight * 0.75) + 50,
        radius: Math.random() * 2.2 + 1.2,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        hue: Math.random() > 0.4 ? 42 : 18,
        glow: Math.random() * 0.6 + 0.4,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
  }

  function renderBackground() {
    bgCtx.clearRect(0, 0, viewWidth, viewHeight);

    const grad = bgCtx.createRadialGradient(
      viewWidth * 0.5, viewHeight * 0.4, 40,
      viewWidth * 0.5, viewHeight * 0.4, Math.max(viewWidth, viewHeight) * 0.8
    );
    grad.addColorStop(0, '#100a1c');
    grad.addColorStop(0.5, '#090511');
    grad.addColorStop(1, '#030206');
    bgCtx.fillStyle = grad;
    bgCtx.fillRect(0, 0, viewWidth, viewHeight);

    const canopyGlow = bgCtx.createRadialGradient(
      viewWidth * 0.5, viewHeight * 0.35, 10,
      viewWidth * 0.5, viewHeight * 0.35, Math.min(viewWidth, viewHeight) * 0.45
    );
    canopyGlow.addColorStop(0, 'rgba(255, 150, 40, 0.09)');
    canopyGlow.addColorStop(0.6, 'rgba(230, 50, 70, 0.04)');
    canopyGlow.addColorStop(1, 'transparent');
    bgCtx.fillStyle = canopyGlow;
    bgCtx.fillRect(0, 0, viewWidth, viewHeight);

    const now = Date.now() * 0.001;
    bgStars.forEach(star => {
      const a = star.alpha + Math.sin(now * 2 + star.twinklePhase) * 0.25;
      bgCtx.fillStyle = `rgba(255, 245, 230, ${Math.max(0.1, Math.min(1, a))})`;
      bgCtx.beginPath();
      bgCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      bgCtx.fill();
    });

    fireflies.forEach(f => {
      f.x += f.vx;
      f.y += f.vy;
      if (f.x < 10) f.x = viewWidth - 10;
      if (f.x > viewWidth - 10) f.x = 10;
      if (f.y < 30) f.y = viewHeight * 0.75;
      if (f.y > viewHeight * 0.8) f.y = 40;

      const a = 0.4 + Math.sin(now * 3 + f.pulsePhase) * 0.35;
      bgCtx.save();
      bgCtx.shadowBlur = 10;
      bgCtx.shadowColor = `hsl(${f.hue}, 100%, 60%)`;
      bgCtx.fillStyle = `hsla(${f.hue}, 100%, 75%, ${Math.max(0.1, a)})`;
      bgCtx.beginPath();
      bgCtx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      bgCtx.fill();
      bgCtx.restore();
    });

    requestAnimationFrame(renderBackground);
  }

  // --- Fractal Tree Structure Generation ---
  function buildTreeActionQueue() {
    animationQueue = [];

    const rootX = viewWidth * 0.5;
    const rootY = Math.min(viewHeight * 0.74, viewHeight - 175);
    
    const baseScale = Math.min(viewWidth / 480, viewHeight / 780);
    const trunkLen = Math.max(75, Math.min(130, 105 * baseScale));
    const angleDelta = 28;
    const totalDepth = 8;

    animationQueue.push({
      type: 'INIT_TURTLE',
      x: rootX,
      y: rootY,
      heading: -90
    });

    animationQueue.push({
      type: 'DRAW_ROOT_BASE',
      x: rootX,
      y: rootY
    });

    const trunkEndX = rootX;
    const trunkEndY = rootY - trunkLen;
    animationQueue.push({
      type: 'DRAW_LINE',
      x0: rootX,
      y0: rootY,
      x1: trunkEndX,
      y1: trunkEndY,
      width: Math.max(3.5, 4.2 * baseScale),
      color: '#8b1e1e',
      glowColor: 'rgba(230, 57, 70, 0.4)',
      depth: totalDepth
    });

    animationQueue.push({
      type: 'DRAW_DOT',
      x: trunkEndX,
      y: trunkEndY,
      radius: Math.max(4, 5 * baseScale),
      color: '#ff9e1b',
      glow: 12
    });

    function recurseBranch(x, y, heading, len, depth) {
      if (depth === 0) {
        animationQueue.push({
          type: 'DRAW_BLOSSOMS',
          x: x,
          y: y,
          baseScale: baseScale
        });
        return;
      }

      const radLeft = (heading - angleDelta) * (Math.PI / 180);
      const nextLen = len * 0.76;
      const xLeft = x + Math.cos(radLeft) * nextLen;
      const yLeft = y + Math.sin(radLeft) * nextLen;

      let branchColor = '#8b1e1e';
      if (depth <= 2) branchColor = '#d94343';
      else if (depth <= 5) branchColor = '#b82a2a';

      const branchWidth = Math.max(1.1, (depth * 0.45) * baseScale);

      // Left branch
      animationQueue.push({
        type: 'DRAW_LINE',
        x0: x,
        y0: y,
        x1: xLeft,
        y1: yLeft,
        width: branchWidth,
        color: branchColor,
        glowColor: 'rgba(255, 120, 40, 0.35)',
        depth: depth
      });

      animationQueue.push({
        type: 'DRAW_DOT',
        x: xLeft,
        y: yLeft,
        radius: Math.max(2.2, (depth * 0.42) * baseScale),
        color: depth % 2 === 0 ? '#ff9e1b' : '#ffc300',
        glow: 8
      });

      recurseBranch(xLeft, yLeft, heading - angleDelta, nextLen, depth - 1);

      animationQueue.push({
        type: 'MOVE_TURTLE',
        x: x,
        y: y,
        heading: heading
      });

      // Right branch
      const radRight = (heading + angleDelta) * (Math.PI / 180);
      const xRight = x + Math.cos(radRight) * nextLen;
      const yRight = y + Math.sin(radRight) * nextLen;

      animationQueue.push({
        type: 'DRAW_LINE',
        x0: x,
        y0: y,
        x1: xRight,
        y1: yRight,
        width: branchWidth,
        color: branchColor,
        glowColor: 'rgba(255, 120, 40, 0.35)',
        depth: depth
      });

      animationQueue.push({
        type: 'DRAW_DOT',
        x: xRight,
        y: yRight,
        radius: Math.max(2.2, (depth * 0.42) * baseScale),
        color: depth % 2 === 0 ? '#ff9e1b' : '#ffc300',
        glow: 8
      });

      recurseBranch(xRight, yRight, heading + angleDelta, nextLen, depth - 1);

      animationQueue.push({
        type: 'MOVE_TURTLE',
        x: x,
        y: y,
        heading: heading
      });
    }

    const startLen = trunkLen * 0.76;
    
    // Left major branch
    const leftRad = (-90 - angleDelta) * (Math.PI / 180);
    const leftX = trunkEndX + Math.cos(leftRad) * startLen;
    const leftY = trunkEndY + Math.sin(leftRad) * startLen;
    
    animationQueue.push({
      type: 'DRAW_LINE',
      x0: trunkEndX,
      y0: trunkEndY,
      x1: leftX,
      y1: leftY,
      width: Math.max(2.8, 3.4 * baseScale),
      color: '#8b1e1e',
      glowColor: 'rgba(230, 57, 70, 0.4)',
      depth: totalDepth - 1
    });
    animationQueue.push({
      type: 'DRAW_DOT',
      x: leftX,
      y: leftY,
      radius: Math.max(3.2, 4.2 * baseScale),
      color: '#ff9e1b',
      glow: 10
    });
    recurseBranch(leftX, leftY, -90 - angleDelta, startLen, totalDepth - 2);

    animationQueue.push({
      type: 'MOVE_TURTLE',
      x: trunkEndX,
      y: trunkEndY,
      heading: -90
    });

    // Right major branch
    const rightRad = (-90 + angleDelta) * (Math.PI / 180);
    const rightX = trunkEndX + Math.cos(rightRad) * startLen;
    const rightY = trunkEndY + Math.sin(rightRad) * startLen;
    
    animationQueue.push({
      type: 'DRAW_LINE',
      x0: trunkEndX,
      y0: trunkEndY,
      x1: rightX,
      y1: rightY,
      width: Math.max(2.8, 3.4 * baseScale),
      color: '#8b1e1e',
      glowColor: 'rgba(230, 57, 70, 0.4)',
      depth: totalDepth - 1
    });
    animationQueue.push({
      type: 'DRAW_DOT',
      x: rightX,
      y: rightY,
      radius: Math.max(3.2, 4.2 * baseScale),
      color: '#ff9e1b',
      glow: 10
    });
    recurseBranch(rightX, rightY, -90 + angleDelta, startLen, totalDepth - 2);

    // Completion
    animationQueue.push({
      type: 'FINISH_TREE',
      x: rootX,
      y: rootY
    });
  }

  // --- Draw Turtle Cursor ---
  function drawTurtleCursor(ctx, x, y, heading) {
    if (!turtle.visible) return;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((heading + 90) * (Math.PI / 180));

    ctx.shadowBlur = 14;
    ctx.shadowColor = 'rgba(255, 60, 60, 0.9)';

    // Turtle Shell
    ctx.fillStyle = '#d62828';
    ctx.beginPath();
    ctx.ellipse(0, 0, 7, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ff6b6b';
    ctx.beginPath();
    ctx.ellipse(0, -1, 4, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = '#b7094c';
    ctx.beginPath();
    ctx.arc(0, -11, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Flippers / Legs
    ctx.fillStyle = '#c72c48';
    ctx.beginPath();
    ctx.arc(-7, -5, 2.5, 0, Math.PI * 2);
    ctx.arc(7, -5, 2.5, 0, Math.PI * 2);
    ctx.arc(-6, 6, 2, 0, Math.PI * 2);
    ctx.arc(6, 6, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // --- Blossom Cluster Drawing ---
  const blossomPalette = ['#ffb703', '#fb8500', '#ffbe0b', '#ffd166', '#ff5400', '#ff7a00'];
  function drawBlossoms(ctx, x, y, baseScale) {
    const numDots = Math.floor(Math.random() * 2) + 2;
    for (let i = 0; i < numDots; i++) {
      const offsetX = (Math.random() - 0.5) * 8 * baseScale;
      const offsetY = (Math.random() - 0.5) * 8 * baseScale;
      const radius = (Math.random() * 2.5 + 3.0) * baseScale;
      const color = blossomPalette[Math.floor(Math.random() * blossomPalette.length)];

      ctx.save();
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, radius * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // --- Step-by-Step Tree Animator ---
  function startTreeAnimation() {
    animationRunning = true;
    isTreeFinished = false;
    currentActionIndex = 0;
    currentSegmentProgress = 0;

    staticCtx.clearRect(0, 0, viewWidth, viewHeight);
    treeCtx.clearRect(0, 0, viewWidth, viewHeight);

    buildTreeActionQueue();
    animateFrame();
  }

  function animateFrame() {
    if (!animationRunning) return;

    let stepsToProcess = 1.0 * speedMultiplier;

    while (stepsToProcess > 0 && currentActionIndex < animationQueue.length) {
      const action = animationQueue[currentActionIndex];

      if (action.type === 'INIT_TURTLE') {
        turtle.x = action.x;
        turtle.y = action.y;
        turtle.heading = action.heading;
        turtle.visible = true;
        currentActionIndex++;
        stepsToProcess -= 0.5;
      }
      else if (action.type === 'DRAW_ROOT_BASE') {
        staticCtx.save();
        staticCtx.shadowBlur = 16;
        staticCtx.shadowColor = 'rgba(230, 57, 70, 0.9)';
        staticCtx.fillStyle = '#b7094c';
        staticCtx.fillRect(action.x - 7, action.y - 4, 14, 8);
        staticCtx.fillStyle = '#e63946';
        staticCtx.beginPath();
        staticCtx.arc(action.x, action.y, 6, 0, Math.PI * 2);
        staticCtx.fill();
        staticCtx.restore();

        currentActionIndex++;
        stepsToProcess -= 0.5;
      }
      else if (action.type === 'DRAW_LINE') {
        const stepInc = 0.25 * speedMultiplier;
        currentSegmentProgress += stepInc;

        const curX = action.x0 + (action.x1 - action.x0) * Math.min(1, currentSegmentProgress);
        const curY = action.y0 + (action.y1 - action.y0) * Math.min(1, currentSegmentProgress);

        turtle.x = curX;
        turtle.y = curY;
        turtle.heading = Math.atan2(action.y1 - action.y0, action.x1 - action.x0) * (180 / Math.PI);

        staticCtx.save();
        staticCtx.strokeStyle = action.color;
        staticCtx.lineWidth = action.width;
        staticCtx.lineCap = 'round';
        staticCtx.shadowBlur = 8;
        staticCtx.shadowColor = action.glowColor;
        staticCtx.beginPath();
        staticCtx.moveTo(action.x0, action.y0);
        staticCtx.lineTo(curX, curY);
        staticCtx.stroke();
        staticCtx.restore();

        if (currentSegmentProgress >= 1.0) {
          currentSegmentProgress = 0;
          currentActionIndex++;
        }
        stepsToProcess = 0;
      }
      else if (action.type === 'DRAW_DOT') {
        staticCtx.save();
        staticCtx.shadowBlur = action.glow;
        staticCtx.shadowColor = action.color;
        staticCtx.fillStyle = action.color;
        staticCtx.beginPath();
        staticCtx.arc(action.x, action.y, action.radius, 0, Math.PI * 2);
        staticCtx.fill();
        staticCtx.restore();

        currentActionIndex++;
        stepsToProcess -= 0.3;
      }
      else if (action.type === 'DRAW_BLOSSOMS') {
        drawBlossoms(staticCtx, action.x, action.y, action.baseScale);
        currentActionIndex++;
        stepsToProcess -= 0.4;
      }
      else if (action.type === 'MOVE_TURTLE') {
        turtle.x = action.x;
        turtle.y = action.y;
        turtle.heading = action.heading;
        currentActionIndex++;
        stepsToProcess -= 0.2;
      }
      else if (action.type === 'FINISH_TREE') {
        turtle.visible = false;
        animationRunning = false;
        isTreeFinished = true;
        currentActionIndex++;
        onTreeFinished();
        break;
      }
    }

    treeCtx.clearRect(0, 0, viewWidth, viewHeight);
    treeCtx.drawImage(staticCanvas, 0, 0, viewWidth, viewHeight);

    if (turtle.visible && animationRunning) {
      drawTurtleCursor(treeCtx, turtle.x, turtle.y, turtle.heading);
    }

    if (animationRunning) {
      requestAnimationFrame(animateFrame);
    }
  }

  function renderCompletedTreeStatic() {
    treeCtx.clearRect(0, 0, viewWidth, viewHeight);
    treeCtx.drawImage(staticCanvas, 0, 0, viewWidth, viewHeight);
  }

  function onTreeFinished() {
    renderCompletedTreeStatic();

    toastText.innerHTML = `
      <div class="toast-lines">
        <span class="toast-line">i like you a lot dear...</span>
        <span class="toast-line">love your voice and the way you look..</span>
        <span class="toast-line highlight">want to know you more bbu. 💖✨</span>
      </div>
    `;
    celebrationToast.classList.add('show');
    setTimeout(() => {
      celebrationToast.classList.remove('show');
    }, 14000);

    for (let i = 0; i < 18; i++) {
      setTimeout(() => {
        const x = viewWidth * 0.5 + (Math.random() - 0.5) * (viewWidth * 0.7);
        const y = viewHeight * 0.65 + (Math.random() - 0.5) * 80;
        createFloatingHeart(x, y);
      }, i * 160);
    }
  }

  // --- Floating Hearts Interactive Spawner ---
  function createFloatingHeart(x, y, customEmoji) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    
    const emojis = ['💖', '✨', '🌸', '🧡', '💕'];
    heart.textContent = customEmoji || emojis[Math.floor(Math.random() * emojis.length)];

    const size = Math.floor(Math.random() * 14) + 18;
    const driftX = (Math.random() - 0.5) * 90;
    const rot = (Math.random() - 0.5) * 50;

    heart.style.left = `${x - size / 2}px`;
    heart.style.top = `${y - size / 2}px`;
    heart.style.fontSize = `${size}px`;
    heart.style.setProperty('--drift-x', `${driftX}px`);
    heart.style.setProperty('--rot', `${rot}deg`);

    heartParticlesContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 2700);
  }

  window.addEventListener('click', (e) => {
    if (e.target.closest('.bottom-dock') || e.target.closest('.top-controls') || e.target.closest('.photo-modal-card')) {
      return;
    }
    createFloatingHeart(e.clientX, e.clientY);
  });

  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      const t = e.touches[0];
      if (!t.target.closest('.bottom-dock') && !t.target.closest('.top-controls') && !t.target.closest('.photo-modal-card')) {
        createFloatingHeart(t.clientX, t.clientY);
      }
    }
  }, { passive: true });

  // --- Robust Web Audio Romantic Music Synthesizer ---
  let audioCtx = null;
  let isMusicPlaying = false;
  let musicInterval = null;
  let masterGain = null;
  let activeOscillators = [];

  function initAudio() {
    if (audioCtx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.35, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    } catch (err) {
      console.warn('Web Audio not supported:', err);
    }
  }

  function playChime(freq, time, duration = 2.2) {
    if (!audioCtx || !isMusicPlaying) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(0.28, time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(time);
      osc.stop(time + duration);

      activeOscillators.push(osc);
      osc.onended = () => {
        const idx = activeOscillators.indexOf(osc);
        if (idx > -1) activeOscillators.splice(idx, 1);
      };
    } catch (e) {}
  }

  const romanticMelody = [
    { notes: [261.63, 329.63, 392.00, 493.88], delay: 0 },
    { notes: [523.25], delay: 0.8 },
    { notes: [392.00], delay: 1.4 },
    { notes: [220.00, 329.63, 392.00, 493.88], delay: 2.2 },
    { notes: [440.00], delay: 3.0 },
    { notes: [329.63], delay: 3.6 },
    { notes: [174.61, 261.63, 329.63, 440.00], delay: 4.4 },
    { notes: [523.25], delay: 5.2 },
    { notes: [392.00], delay: 5.8 },
    { notes: [196.00, 293.66, 392.00, 493.88], delay: 6.6 },
    { notes: [392.00], delay: 7.4 },
    { notes: [329.63], delay: 8.0 }
  ];

  function scheduleMelody() {
    if (!isMusicPlaying || !audioCtx) return;
    const now = audioCtx.currentTime;
    romanticMelody.forEach(step => {
      step.notes.forEach(freq => {
        playChime(freq, now + step.delay);
      });
    });
  }

  function startMusicLoop() {
    initAudio();
    if (!audioCtx) return;

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isMusicPlaying = true;
    masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
    masterGain.gain.setValueAtTime(0.35, audioCtx.currentTime);

    soundWave.classList.add('playing');
    musicIcon.textContent = '🎶';
    musicLabel.textContent = 'Music On';

    if (musicInterval) {
      clearInterval(musicInterval);
    }

    scheduleMelody();
    musicInterval = setInterval(scheduleMelody, 8800);
  }

  function stopMusic() {
    isMusicPlaying = false;
    soundWave.classList.remove('playing');
    musicIcon.textContent = '🎵';
    musicLabel.textContent = 'Music Off';

    if (musicInterval) {
      clearInterval(musicInterval);
      musicInterval = null;
    }

    if (audioCtx && masterGain) {
      masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
      masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
    }

    activeOscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    activeOscillators = [];
  }

  musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isMusicPlaying) {
      stopMusic();
    } else {
      startMusicLoop();
    }
  });

  // --- Intro Open Action ---
  function openGift() {
    stopHeroSlideshow();
    introOverlay.classList.add('hidden');
    startMusicLoop();

    for (let i = 0; i < 14; i++) {
      setTimeout(() => {
        createFloatingHeart(
          viewWidth * 0.5 + (Math.random() - 0.5) * 180,
          viewHeight * 0.5 + (Math.random() - 0.5) * 180
        );
      }, i * 75);
    }

    setTimeout(() => {
      startTreeAnimation();
    }, 400);
  }

  if (openBtn) openBtn.addEventListener('click', openGift);
  if (openBtnText) openBtnText.addEventListener('click', openGift);

  // --- Speed Selector ---
  speedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      speedBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      speedMultiplier = parseFloat(btn.dataset.speed) || 1.0;
    });
  });

  // --- Replay Button ---
  replayBtn.addEventListener('click', () => {
    startTreeAnimation();
  });

  // --- Screenshot / Save as Wallpaper ---
  screenshotBtn.addEventListener('click', () => {
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = viewWidth * 2;
    exportCanvas.height = viewHeight * 2;
    const expCtx = exportCanvas.getContext('2d');
    expCtx.scale(2, 2);

    expCtx.drawImage(bgCanvas, 0, 0, viewWidth, viewHeight);
    expCtx.drawImage(staticCanvas, 0, 0, viewWidth, viewHeight);

    expCtx.save();
    expCtx.textAlign = 'center';
    if (userConfig.message.includes('Always Stay Happy with me')) {
      expCtx.fillStyle = '#ffe0b2';
      expCtx.shadowColor = 'rgba(255, 180, 50, 0.85)';
      expCtx.shadowBlur = 15;
      expCtx.font = 'bold 22px Caveat, cursive';
      expCtx.fillText('Always Stay Happy with me..', viewWidth * 0.5, viewHeight - 110);

      expCtx.fillStyle = '#ff9e2c';
      expCtx.shadowColor = 'rgba(255, 120, 40, 0.9)';
      expCtx.shadowBlur = 20;
      expCtx.font = 'bold 30px Outfit, sans-serif';
      expCtx.fillText(`dear ${userConfig.name || 'Sangu'} 💖✨`, viewWidth * 0.5, viewHeight - 74);
    } else {
      expCtx.fillStyle = '#ff9e2c';
      expCtx.shadowColor = 'rgba(255, 120, 40, 0.9)';
      expCtx.shadowBlur = 20;
      expCtx.font = 'bold 26px Outfit, sans-serif';
      expCtx.fillText(userConfig.message, viewWidth * 0.5, viewHeight - 85);
    }
    expCtx.restore();

    const link = document.createElement('a');
    link.download = `Tree_Of_Love_${userConfig.name || 'Sangu'}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();

    toastText.innerHTML = '<span class="toast-line">Wallpaper saved to downloads! 📸</span>';
    celebrationToast.classList.add('show');
    setTimeout(() => celebrationToast.classList.remove('show'), 3000);
  });

  // --- Share Link ---
  shareBtn.addEventListener('click', () => {
    copyShareableLink();
  });

  function copyShareableLink() {
    const url = new URL(window.location.href);
    if (userConfig.name) url.searchParams.set('name', userConfig.name);
    if (userConfig.message) url.searchParams.set('msg', userConfig.message);
    if (userConfig.note) url.searchParams.set('note', userConfig.note);

    if (navigator.clipboard) {
      navigator.clipboard.writeText(url.toString()).then(() => {
        toastText.innerHTML = '<span class="toast-line">Link copied! Send it on WhatsApp/Instagram 💌</span>';
        celebrationToast.classList.add('show');
        setTimeout(() => celebrationToast.classList.remove('show'), 3500);
      });
    } else {
      prompt('Copy this link to send to her:', url.toString());
    }
  }

  // --- Initialize App ---
  function init() {
    parseQueryParams();
    resizeCanvases();
    renderBackground();
    startHeroSlideshow();
    updateGalleryView(0);

    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === 'true') {
      openGift();
    }
  }

  init();

})();
