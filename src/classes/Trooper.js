class Trooper extends Movable {
    constructor(point = new Point() , size = new Size()) {
        super(point, size)
    }
    drawRec = (context,img) => {
        context.beginPath()
        context.drawImage(img, this.point.x, this.point.y, this.size.width, this.size.height);
        context.stroke();
    }
};
