class Shot extends Movable {
    constructor(point = new Point() , size = new Size()) {
        super(point, size)
    }
    drawRec = (context) => {
        context.beginPath()
        context.fillStyle = 'purple';
        context.fillRect(this.point.x, this.point.y, this.size.width, this.size.height);     
        context.stroke();
    }
    move = (context) => {
        context.beginPath()
        context.fillStyle = 'purple';
        context.fillRect(this.point.x, this.point.y -= 15, this.size.width, this.size.height);
        context.stroke();
    }
};
