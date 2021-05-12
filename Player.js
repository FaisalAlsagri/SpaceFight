class Player extends Movable {
    constructor(point = new Point() , size = new Size()) {
        super(point, size)
    }
    drawRec = (context,direction) => {
        context.beginPath()
        context.strokeStyle = 'blue';
        context.rect(direction === "right"? this.point.x += 100 :  direction === "left"? this.point.x -= 100  : this.point.x
        , this.point.y, this.size.width, this.size.height);
        context.stroke();
    }
};
