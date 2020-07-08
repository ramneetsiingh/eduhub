const canvas = document.getElementById('can');
canvas.style.borderStyle = 'solid';
const context = canvas.getContext('2d');

let playVideo = function(video) {
    fps = video.fps;
    timeIndex = 0;
    let prevX;
    let prevY;
    let curX;
    let curY;
    let color = 'black';
    let lineWidth = 3;

    setInterval(() => {
        timeIndex++;
        curPoint = video.stroke[timeIndex]
        if (curPoint != undefined) {
            console.log('Draw');
            console.log(curPoint.x, curPoint.y);
            if (curPoint.event == "mousedown") {
                prevX = curPoint.x;
                prevY = curPoint.y;
            }
            else {
                curX = curPoint.x;
                curY = curPoint.y;
                drawLine(context, prevX, prevY, curX, curY, color, lineWidth);
                prevX = curX;
                prevY = curY;
            }
        }
    }, 1000 / fps);
}

document.getElementById('play-video').addEventListener('click', () => {
    playVideo(video);
});