const canvas = document.getElementById('can');
canvas.style.borderStyle = 'solid';
const context = canvas.getContext('2d');

let playVideo = function(video) {
    if(isPlaying) return;
    isPlaying = true;
    let interval  = 1000/video.fps;
    let pause = false;
    timeIndex = 0;
    let prevX;
    let prevY;
    let curX;
    let curY;
    let color = 'black';
    let lineWidth = 3;

    setInterval(() => {
        timeIndex++;
        document.querySelector('.timer').innerHTML = toHHMMSS(Math.floor(timeIndex*interval/1000));
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
    }, interval);



}

let isPlaying = false;
document.getElementById('play-video').addEventListener('click', () => {
    playVideo(video);
});