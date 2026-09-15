document.addEventListener('DOMContentLoaded', () => {
  // 1. Mudança suave no cabeçalho ao rolar a página
  const header = document.querySelector('header') || document.querySelector('.navbar');
  
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('header-scrolled', window.scrollY > 50);
    });
  }

  // 2. Efeito de revelação (Corrigido para ativar elementos visíveis imediatamente)
  const elementsToReveal = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.01, // Ativa assim que 1% do elemento encostar na tela
    rootMargin: '0px 0px 50px 0px' 
  });

  elementsToReveal.forEach(el => {
    const rect = el.getBoundingClientRect();
    // Se o elemento já estiver visível na tela ao carregar, exibe na hora
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('active');
    } else {
      revealObserver.observe(el);
    }
  });

  // 3. Efeito 3D Tilt sutil e fluido
  const tiltCards = document.querySelectorAll('.sage-container, .dark-card, .bootstrap-box');

  tiltCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.4s ease-out, box-shadow 0.4s ease, border-color 0.4s ease';
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -1.5;
      const rotateY = ((x - centerX) / centerX) * 1.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.005, 1.005, 1.005)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.4s ease-out, box-shadow 0.4s ease, border-color 0.4s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // 4. Lógica do Carrossel de Tendências (LISTA COM AS 10 FOTOS)
  const images = [
    { src: "img/tenden1.jpg", alt: "Tendência 1" },
    { src: "img/tenden2.jpg", alt: "Tendência 2" },
    { src: "img/tenden3.webp", alt: "Tendência 3" },
    { src: "img/tenden4.jpg", alt: "Tendência 4" },
    { src: "img/tenden5.webp", alt: "Tendência 5" },
    { src: "img/tenden6.webp", alt: "Tendência 6" },
    { src: "img/tenden7.jpg", alt: "Tendência 7" },
    { src: "img/tenden8.webp", alt: "Tendência 8" },
    { src: "img/tenden9.webp", alt: "Tendência 9" },
    { src: "img/tenden10.webp", alt: "Tendência 10" } // <-- 10ª foto pronta para alterar o nome
  ];

  let currentIndex = 1;

  const imgLeft = document.getElementById('imgLeft');
  const imgCenter = document.getElementById('imgCenter');
  const imgRight = document.getElementById('imgRight');
  const prevBtn = document.getElementById('prevBtn') || document.querySelector('.arrow-btn-prev');
  const nextBtn = document.getElementById('nextBtn') || document.querySelector('.arrow-btn-next');

  const updateCarousel = () => {
    if (!imgLeft || !imgCenter || !imgRight) return;

    const total = images.length;
    const leftIndex = (currentIndex - 1 + total) % total;
    const centerIndex = currentIndex;
    const rightIndex = (currentIndex + 1) % total;

    imgLeft.src = images[leftIndex].src;
    imgLeft.alt = images[leftIndex].alt;

    imgCenter.src = images[centerIndex].src;
    imgCenter.alt = images[centerIndex].alt;

    imgRight.src = images[rightIndex].src;
    imgRight.alt = images[rightIndex].alt;
  };

  if (prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarousel();
    });

    updateCarousel();
  }

  // 5. Controle do Closet Virtual
  const closetRows = document.querySelectorAll('.closet-carousel-row');

  closetRows.forEach(row => {
    const carouselEl = row.querySelector('.closet-carousel');
    const prevBtnRow = row.querySelector('.closet-arrow-prev');
    const nextBtnRow = row.querySelector('.closet-arrow-next');

    if (carouselEl && typeof bootstrap !== 'undefined') {
      const carouselInstance = new bootstrap.Carousel(carouselEl, {
        interval: false,
        wrap: true
      });

      if (prevBtnRow) {
        prevBtnRow.addEventListener('click', (e) => {
          e.preventDefault();
          carouselInstance.prev();
        });
      }
      if (nextBtnRow) {
        nextBtnRow.addEventListener('click', (e) => {
          e.preventDefault();
          carouselInstance.next();
        });
      }
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const bg = document.querySelector('.closet-page-bg');
  if (!bg) return;

  // 1. Cria a tela de animação transparente no fundo
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none'; // Não interfere nos cliques
  canvas.style.zIndex = '1';
  bg.insertBefore(canvas, bg.firstChild);

  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = canvas.width = bg.offsetWidth;
    height = canvas.height = bg.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // 2. Cores elegantes: Creme Pérola, Rosa Seda e Champagne
  const colors = [
    'rgba(253, 251, 247, ', /* Creme */
    'rgba(232, 165, 184, ', /* Rosa Seda */
    'rgba(247, 231, 206, '  /* Champagne */
  ];

  // 3. Cria as partículas sutis
  const particles = [];
  const particleCount = 28; // Quantidade perfeita para não poluir

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 10 + 6,
      speedY: Math.random() * 0.25 + 0.08, // Subida ultralenta e calma
      angle: Math.random() * Math.PI * 2,
      swingSpeed: Math.random() * 0.015 + 0.005,
      opacity: Math.random() * 0.5 + 0.25,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: Math.random() > 0.4 ? 'star' : 'dot'
    });
  }

  // 4. Loop de animação suave
  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y -= p.speedY; // Elevação lenta
      p.angle += p.swingSpeed;
      p.x += Math.sin(p.angle) * 0.35; // Balanço horizontal quase imperceptível

      // Quando a partícula chega ao topo, volta para baixo renovada
      if (p.y < -20) {
        p.y = height + 20;
        p.x = Math.random() * width;
      }

      ctx.fillStyle = p.color + p.opacity + ')';

      if (p.type === 'star') {
        // Desenha a estrelinha minimalista Y2K
        ctx.font = `${p.size}px serif`;
        ctx.fillText('✦', p.x, p.y);
      } else {
        // Desenha ponto de luz suave (Bokeh)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 4, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
});