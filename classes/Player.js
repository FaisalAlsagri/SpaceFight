class Player extends Movable {
    constructor(point = new Point(), size = new Size()) {
        super(point, size)
        this.killCount = 0
    }

    kill = () => this.killCount++

    drawRec = (context, direction, img) => {
        context.beginPath()
        context.drawImage(img, direction === "right" ? this.point.x += 50 : direction === "left" ? this.point.x -= 50 : this.point.x
            , this.point.y, this.size.width, this.size.height);
        context.stroke();
    }
};
