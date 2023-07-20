const canvas = document.querySelector('canvas'),
    ctx = canvas.getContext("2d");
brushWidth = 5;

let toolBtns = document.querySelectorAll('.tool');
let isDrawing = false;








// all funcitons:
window.addEventListener('load', function () {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

const startDrawing = () => {
    isDrawing = true;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
}

const drawing = function (e) {
    if (!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY); // drawing line to canvas;
    ctx.stroke();
}

toolBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        // if (btn.contains('.active')) {
        //     btn.classList.remove('active')
        // }
        btn.classList.add('active');

    })
});

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', () => isDrawing = false)