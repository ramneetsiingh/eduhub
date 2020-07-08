function drawLine(context, x1, y1, x2, y2, color, lineWidth) {
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

test = 'Drawing.js'