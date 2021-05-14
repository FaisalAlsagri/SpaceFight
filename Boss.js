class Boss extends Movable {
    constructor(point = new Point() , size = new Size()) {
        super(point, size)
        this.hit = 0
    }
    
    drawRec = (context,img) => {
        context.beginPath()
        context.fillStyle = 'black';
        context.drawImage(img, this.point.x, this.point.y,this.size.width,this.size.height);
        // context.fillRect(this.point.x, this.point.y, this.size.width, this.size.height);     
        context.stroke();
    }

    hits = () => this.hit++
};
