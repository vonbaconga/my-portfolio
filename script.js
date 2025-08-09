function openLightbox(src) {
    document.getElementById("lightbox-img").src = src;
    document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}
const track = document.getElementById('imageTrack');

function slideLeft()  { scrollByAmount(-1); }
function slideRight() { scrollByAmount(1); }

// scroll by one image's width (or container fraction)
function scrollByAmount(direction) {
  if (!track) return;
  const img = track.querySelector('img');
  const step = img ? img.getBoundingClientRect().width + 12 : track.clientWidth * 0.8;
  track.scrollBy({ left: direction * step, behavior: 'smooth' });
}

/* --- drag-to-scroll (desktop) --- */
let isDown = false;
let startX;
let scrollLeft;

track.addEventListener('mousedown', (e) => {
  isDown = true;
  track.classList.add('active');
  startX = e.pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
  e.preventDefault();
});
track.addEventListener('mouseleave', () => { isDown = false; track.classList.remove('active'); });
track.addEventListener('mouseup', () => { isDown = false; track.classList.remove('active'); });
track.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  const x = e.pageX - track.offsetLeft;
  const walk = (x - startX) * 1.5; // scroll-fast multiplier
  track.scrollLeft = scrollLeft - walk;
});

/* --- touch support (mobile) --- */
let touchStartX = 0;
let touchStartScroll = 0;

track.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].pageX;
  touchStartScroll = track.scrollLeft;
});
track.addEventListener('touchmove', (e) => {
  const touchX = e.touches[0].pageX;
  const diff = (touchX - touchStartX) * 1.2;
  track.scrollLeft = touchStartScroll - diff;
});

