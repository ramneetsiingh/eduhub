let pause = true;
const id = location.href.split('/')
fetch('/download?id=' + id[id.length-1])
    .then(res => res.json())
    .then(data => {
        const video = data;
        let prevX;
        let prevY;
        let curX;
        let curY;
        let timeIndex = 0;
        let color = 'black';
        let lineWidth = 2;

        let interval = 1000 / video.fps;
        const finishTime = video.finishTime;

        setInterval(() => {
            if (pause == true){
                return;
            }
            if (timeIndex > finishTime){
                videoEnd();
                return;
            }
            if(timeIndex == 0){
               context.clearRect(0, 0, canvas.width, canvas.height);
            }
            timeIndex++;
            document.querySelector('.timer').innerHTML = toHHMMSS(Math.floor(timeIndex * interval / 1000));
            curPoint = video.stroke[timeIndex]
            if (curPoint != undefined) {
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

            if(video.audio[timeIndex] != undefined){
                var msg = new SpeechSynthesisUtterance();
                msg.text = video.audio[timeIndex];
                window.speechSynthesis.speak(msg);
            }
        }, interval);

        function videoEnd() {
            document.getElementById('control-recording').click();
            timeIndex = 0;
        }
    });