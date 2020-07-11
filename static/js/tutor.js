let video = {
    'name': 'MyDrawing',
    'stroke': {}
}


let pause = true;

(function () {
    let isDrawing = false;

    let prevX;
    let prevY;
    let curX;
    let curY;
    let timeIndex = 0;
    let color = 'black';
    let lineWidth = 2;

    const fps = 25;
    video.fps = fps;
    let interval = 1000 / fps;

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
        if (pause == true) return;
        timeIndex++;
        document.querySelector('.timer').innerHTML = toHHMMSS(Math.floor(timeIndex * interval / 1000));
        if (isDrawing === true) {
            if (curX == prevX && curY == prevY) {
                return;
            }
            drawLine(context, prevX, prevY, curX, curY, color, lineWidth);
            prevX = curX;
            prevY = curY;
            saveStroke(prevX, prevY, 'mousemove');
        }
    }, interval);


    // When mouse is unpressed
    window.addEventListener('mouseup', e => {
        if (isDrawing === true) {
            saveStroke(curX, curY, 'mouseup');
            isDrawing = false;
        }
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



    document.getElementById('finish-recording').addEventListener('click', () => {
        pause = true;
        postVideo('upload', video)
            .then(res => {
                console.log(res);
            })
    });

})();

async function postVideo(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
    });
    return response.json();
}

