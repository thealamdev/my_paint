const canvas = document.querySelector('canvas'),
    ctx = canvas.getContext("2d");
let brushWidth = 5;
let selectedColor = '#000';

let toolBtns = document.querySelectorAll('.tool');
let fillColor = document.querySelector('#checkbox');
let sizeBrush = document.querySelector('#range');
let color = document.querySelector('#color');
let canvas_clear = document.querySelector('.canvas_clear');
let download_image = document.querySelector('.download_image');
let full_button = document.querySelector('.full_screen');
let full_screen = document.querySelector('.container');
let prevMouseX, prevMouseY, snapshot,
    isDrawing = false,
    selectedTool = 'brush';


// all funcitons:
window.addEventListener('load', function () {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});


const drawRect = (e) => {
    if (!fillColor.checked) {
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const drawCircle = (e) => {

    ctx.beginPath();
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    fillColor.checked ? ctx.fill() : ctx.stroke();


}

const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY)
    ctx.closePath();
    fillColor.checked ? ctx.fill() : ctx.stroke()
}

const startDrawing = (e) => {
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    isDrawing = true;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

const drawing = function (e) {
    if (!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);

    if (selectedTool === 'brush' || selectedTool === 'eraser') {
        ctx.strokeStyle = selectedTool === 'eraser' ? '#ECF8F9' : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY); // drawing line to canvas;
        ctx.stroke();
    }
    else if (selectedTool === 'ractangle') {
        drawRect(e);
    }

    else if (selectedTool === 'circle') {
        drawCircle(e);
    }

    else if (selectedTool === 'triangle') {
        drawTriangle(e);
    }

}

toolBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelector('.options .active').classList.remove('active')
        btn.classList.add('active');
        selectedTool = btn.id;
        console.log(selectedTool)
    })
});

sizeBrush.addEventListener('change', function () {
    brushWidth = sizeBrush.value
    console.log(brushWidth)
});

color.addEventListener('input', function () {
    selectedColor = this.value;
});

canvas_clear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

download_image.addEventListener('click', () => {
    const link = document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL();
    link.click();
})


// full screen code:
full_button.addEventListener('click',()=>{
    full_screen.requestFullscreen();
})
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', () => isDrawing = false)