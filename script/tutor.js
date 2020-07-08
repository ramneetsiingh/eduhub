const canvas = document.getElementById('can');
canvas.style.borderStyle = 'solid';
const context = canvas.getContext('2d');

let video = {
    'name': 'MyDrawing',
    'stroke': {}
}

let startRecording = function () {
    if(isRecording === true) return;
    isRecording = true;
    let isDrawing = false;
    let prevX;
    let prevY;
    let curX;
    let curY;
    const fps = 24;
    video.fps = fps;
    // const startTime = new Date().getTime();
    let timeIndex = 0;
    let color = 'black';
    let lineWidth = 2;

    // Updating mouse coordinates
    canvas.addEventListener('mousemove', e => {

        curX = e.offsetX;
        curY = e.offsetY;
    });

    // When mouse is pressed
    canvas.addEventListener('mousedown', e => {
        prevX = curX;
        prevY = curY;
        saveStroke(prevX, prevY, 'mousedown');
        isDrawing = true;
    });

    // When mouse is keep pressed
    setInterval(() => {
        timeIndex++;
        if (isDrawing === true) {
            if (curX == prevX && curY == prevY) {
                return;
            }
            console.log('Draw');
            drawLine(context, prevX, prevY, curX, curY, color, lineWidth);
            prevX = curX;
            prevY = curY;
            saveStroke(prevX, prevY, 'mousemove');
        }
    }, 1000 / fps);

    // When mouse is unpressed
    window.addEventListener('mouseup', e => {
        saveStroke(curX, curY, 'mouseup');
        isDrawing = false;
    });

    // Save time and coordinates to video object
    function saveStroke(x, y, mouseEvent) {
        // let curTime = new Date().getTime()
        video.stroke[timeIndex] = {
            'x': x,
            'y': y,
            'event': mouseEvent
        };
    }
}

let isRecording = false;
document.getElementById('start-recording').addEventListener('click', startRecording);

document.getElementById('finish-recording').addEventListener('click', () => {
    console.log(test);
})