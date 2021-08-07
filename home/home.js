let isDown = false;
let startX;
let scrollLeft;
const slider = Array.from(document.querySelectorAll('.items'));
console.log(slider)

const end = (e) => {
  isDown = false;
  e.currentTarget.classList.remove('active');
}

const start = (e) => {
  isDown = true;
  e.currentTarget.classList.add('active');
  startX = e.pageX || e.touches[0].pageX - e.currentTarget.offsetLeft;
  scrollLeft = e.currentTarget.scrollLeft;
}

const move = (e) => {
  if (!isDown) return;

  e.preventDefault();
  const x = e.pageX || e.touches[0].pageX - e.currentTarget.offsetLeft;
  const dist = (x - startX);
  e.currentTarget.scrollLeft = scrollLeft - dist;
}

(() => {
  slider.forEach(element => {
    element.addEventListener('mousedown', start);
    element.addEventListener('touchstart', start);

    element.addEventListener('mousemove', move);
    element.addEventListener('touchmove', move);

    element.addEventListener('mouseleave', end);
    element.addEventListener('mouseup', end);
    element.addEventListener('touchend', end);
  });
})();