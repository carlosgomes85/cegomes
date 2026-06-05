document.addEventListener('DOMContentLoaded', function () {
      const cards = document.querySelectorAll(".card-custom");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("show"); });
      }, { threshold: 0.1 });
      cards.forEach((card) => observer.observe(card));

      if (window.bootstrap) {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        [...tooltipTriggerList].forEach(el => new bootstrap.Tooltip(el));
      }
    });

document.addEventListener('DOMContentLoaded', function () {
      const modalEl = document.getElementById('imgModal');
      const modalImg = document.getElementById('imgModalPicture');
      const modalTitle = document.getElementById('imgModalLabel');
      const modalCaption = document.getElementById('imgModalCaption');
      const btnPrev = modalEl.querySelector('.modal-nav-prev');
      const btnNext = modalEl.querySelector('.modal-nav-next');
      const bsModal = new bootstrap.Modal(modalEl);

      let galleryGroup = null;
      let galleryNodes = [];
      let currentIndex = 0;

      function setViewerOrientation() {
        const { naturalWidth, naturalHeight } = modalImg;
        if (!naturalWidth || !naturalHeight) return;
        const ratio = naturalWidth / naturalHeight;
        modalEl.classList.remove('is-loading', 'is-portrait', 'is-square', 'is-landscape');

        if (ratio < .82) {
          modalEl.classList.add('is-portrait');
        } else if (ratio > 1.18) {
          modalEl.classList.add('is-landscape');
        } else {
          modalEl.classList.add('is-square');
        }
      }

      function gatherGallery(group) {
        galleryGroup = group;
        galleryNodes = Array.from(document.querySelectorAll(`.gallery-trigger[data-gallery="${group}"]`));
      }

      function showItemByIndex(idx) {
        if (!galleryNodes.length) return;
        currentIndex = (idx + galleryNodes.length) % galleryNodes.length; // loop circular
        const el = galleryNodes[currentIndex];
        const src = el.dataset.img || el.getAttribute('data-full') || el.src;
        const alt = el.dataset.alt || el.alt || 'Imagem ampliada';
        const title = el.dataset.title || el.getAttribute('aria-label') || 'Visualização';

        modalEl.classList.remove('is-portrait', 'is-square', 'is-landscape');
        modalEl.classList.add('is-loading');
        modalImg.src = src;
        modalImg.alt = alt;
        modalTitle.textContent = title;
        modalCaption.textContent = alt;
        if (modalImg.complete) setViewerOrientation();
      }

      function openFromEl(triggerEl) {
        const group = triggerEl.dataset.gallery;
        gatherGallery(group);
        const idx = galleryNodes.indexOf(triggerEl);
        showItemByIndex(idx >= 0 ? idx : 0);
        bsModal.show();
      }

      document.body.addEventListener('click', (e) => {
        const trigger = e.target.closest('.gallery-trigger');
        if (trigger) openFromEl(trigger);
      });

      document.body.addEventListener('keydown', (e) => {
        const trigger = e.target.closest('.gallery-trigger');
        if (trigger && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          openFromEl(trigger);
        }
      });

      btnPrev.addEventListener('click', () => showItemByIndex(currentIndex - 1));
      btnNext.addEventListener('click', () => showItemByIndex(currentIndex + 1));
      modalImg.addEventListener('load', setViewerOrientation);

      modalEl.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); showItemByIndex(currentIndex - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); showItemByIndex(currentIndex + 1); }
      });
    });

(function () {
      const bar = document.querySelector('.mobile-cta');
      if (!bar) return;

      // estado inicial visível
      bar.classList.add('is-visible');
      let lastY = window.scrollY, ticking = false;

      function onScroll() {
        const y = window.scrollY;
        const goingDown = y > lastY && y > 80;
        bar.classList.toggle('is-hidden', goingDown);
        bar.classList.toggle('is-visible', !goingDown);
        lastY = y;
        ticking = false;
      }
      window.addEventListener('scroll', () => {
        if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
      }, { passive: true });

      document.addEventListener('shown.bs.dropdown', (e) => {
        const btn = e.target.closest('.dropup')?.querySelector('.dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'true');
      });
      document.addEventListener('hidden.bs.dropdown', (e) => {
        const btn = e.target.closest('.dropup')?.querySelector('.dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    })();

document.addEventListener("DOMContentLoaded", () => {
      const faders = document.querySelectorAll(".fade-in");
      const options = { threshold: 0.2, rootMargin: "0px 0px -20px 0px" };

      const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      }, options);

      faders.forEach(el => appearOnScroll.observe(el));
    });
