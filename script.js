const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const IMG_SIZE = 150;
const IMG_HEIGHT = 180;
const scroll = { x: 0, y: 0 };
let images = [];


function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}


function draw() {
  for (let x = -IMG_SIZE, i = 0; x < canvas.width; x += IMG_SIZE, i += 1) {
    if (i >= images.length) { images.push([]) }
    for (let y = -IMG_HEIGHT, j = 0; y < canvas.height; y += IMG_HEIGHT, j += 1) {
      if (j >= images[i].length) { images[i].push(new Image()) }
      // TODO: receive images from API
      if (images[i][j].src === "") {
        images[i][j].src = `data/image.${
          ("0000"+Math.floor(Math.random() * 150 + 1)).slice(-4)
        }.${
          ("0000"+Math.floor(Math.random() * 45 + 1)).slice(-4)
        }.png`;
      }
      ctx.drawImage(images[i][j], x + scroll.x, y + scroll.y, IMG_SIZE, IMG_HEIGHT);
    }
  }
  
  scroll.x += 1;
  scroll.y += 0.5;
  if (scroll.x >= IMG_SIZE) {
    images.pop();
    images.splice(0, 0, []);
    scroll.x %= IMG_SIZE;
  }
  if (scroll.y >= IMG_HEIGHT) {
    images.forEach(e => {
      e.pop();
      e.splice(0, 0, new Image());
    });
    scroll.y %= IMG_HEIGHT;
  }
}


resize();
setInterval(draw, 30);
window.addEventListener("resize", resize);