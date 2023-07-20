const canvas = document.querySelector('canvas'),
    ctx = canvas.getContext("2d");
let brushWidth = 5;

let toolBtns = document.querySelectorAll('.tool');
let fillColor = document.querySelector('#checkbox');
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
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX),2) + Math.pow((prevMouseY- e.offsetY),2));
    ctx.arc(prevMouseX,prevMouseY,radius,0,2*Math.PI);
    fillColor.checked ? ctx.fill() : ctx.stroke();
     
}






const startDrawing = (e) => {
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    isDrawing = true;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

const drawing = function (e) {
    if (!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);

    if (selectedTool === 'brush') {
        ctx.lineTo(e.offsetX, e.offsetY); // drawing line to canvas;
        ctx.stroke();
    }
    else if (selectedTool === 'ractangle') {
        drawRect(e);
    }

    else if (selectedTool === 'circle') {
        drawCircle(e);
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

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', () => isDrawing = false)