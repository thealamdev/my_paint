const canvas = document.querySelector('canvas'),
ctx = canvas.getContext("2d");
brushWidth = 5;

let isDrawing = false;
window.addEventListener('load',function(){
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});
const startDrawing = () => {
    isDrawing = true;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
}

const drawing = function (e) {
    if(!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY); // drawing line to canvas;
    ctx.stroke();
}

canvas.addEventListener('mousedown',startDrawing);
canvas.addEventListener('mousemove',drawing);
canvas.addEventListener('mouseup',() => isDrawing = false)