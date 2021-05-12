class Darwable {
    constructor(point = new Point(), size = new Size()) {
        this.point = point
        this.size = size
    }

    contains = (innerPoint) => {
        return (innerPoint.point.x + innerPoint.size.width > this.point.x
            && (innerPoint.point.x < this.point.x + this.size.width || 
                innerPoint.point.x+innerPoint.size.width < this.point.x + this.size.width)) 
            && (this.point.y + this.size.height > innerPoint.point.y && innerPoint.point.y+innerPoint.size.height > this.point.y)
            

        
    }
};
