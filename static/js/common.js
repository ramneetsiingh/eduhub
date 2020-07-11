let canvasWidth = 640;
let canvasHeight = 480;

const canvas = document.getElementById('can');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
const context = canvas.getContext('2d');


function drawLine(context, x1, y1, x2, y2, color, lineWidth) {
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

function toHHMMSS(sec_num){
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

document.getElementById('control-recording').addEventListener('click', () => {
    pause = pause ^ true;
    let btnText = document.getElementById('control-recording');
    if (pause == true) {
        btnText.innerHTML = 'Resume';
    }
    else {
        btnText.innerHTML = 'Pause';
    }
});

document.getElementById('init-recording').addEventListener('click', () => {
    pause = false;
    document.querySelector('.init').style.display = 'none';
    document.querySelector('.canvas-control').style.display = '';
});

