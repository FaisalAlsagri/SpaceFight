class Movable extends Darwable {
        constructor(point = new Point() , size = new Size()) {
        super(point, size)
        this.speed
        this.direction
    }
    setSpeed = (speed) => this.speed = speed

    setDirection = (direction) => this.direction = direction    
};
