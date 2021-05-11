// Methods
window.onresize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    move()
}

// Math.random()* (max - min) + min
let getRandom = (min, max) => Math.random() * (max - min) + min

let initBlocks = () => {
    x = getRandom(0, canvas.width - blockWidth)
    y = getRandom(0, canvas.height - steve.size.height * 2)
    
    x1 = getRandom(0, canvas.width - blockWidth)
    y1 = getRandom(0, canvas.height - steve.size.height - blockHeight)
    
    while (!((x1 + blockWidth <= x || x1 >= x + blockWidth) && (y1 + blockHeight <= y || y1 >= y + blockHeight))) {
        console.log("in");
        x1 = getRandom(0, canvas.width - blockWidth)
        y1 = getRandom(0, canvas.height - steve.size.height - blockHeight)
    }
    
}
let initPlayer = () => {
    context.beginPath()
    context.strokeStyle = 'red';
    context.rect(steve.point.x, steve.point.y, steve.size.width, steve.size.height);
    context.stroke();
}
let drawBlock = () => {
    block1 = new Darwable(new Point(x, y), new Size(blockWidth, blockHeight))
    block2 = new Darwable(new Point(x1, y1), new Size(blockWidth, blockHeight))
    context.beginPath()
    context.fillStyle = 'blue';
    context.fillRect(block1.point.x, block1.point.y, block1.size.width, block1.size.height);
    context.fillText("1", x, y, steve.size.width);
    context.stroke();

    context.beginPath()
    context.fillStyle = 'blue';
    context.fillRect(block2.point.x, block2.point.y, block2.size.width, block2.size.height);
    context.fillText("2", x1, y1, steve.size.width);
    context.stroke();
}
document.addEventListener("keydown", (e) => {
    if (e.keyCode == 39 && steve.point.x + 100 + steve.size.width <= canvas.width) {
        move("right")
    } else if (e.keyCode == 37 && steve.point.x - 100 >= 0) {
        move("left")
    } else if (e.keyCode == 13) {
        move("up")
        clearInterval(pew)
        pew = setInterval(() => {
            arrshots.forEach(element => {
                let index = arrshots.indexOf(element);
                if (element.point.y <= 0)
                    arrshots.splice(index, 1);

                if (block1.contains(element) || block2.contains(element))
                    arrshots.splice(index, 1);

                element.point.y -= 15
            });
            console.log(Math.random() * (400 - 100) + 100);
            move()
        }, 100);
    }
})
// Global vars :)
let canvas = document.querySelector('#canvas')
let context = canvas.getContext("2d")
let h1 = document.querySelector("h1")
let arrshots = []
canvas.width = window.innerWidth - 10
canvas.height = window.innerHeight - 100
let x,y,x1,y1
let block1
let block2
let steve = new Player(new Point(100, 50), new Size(100, 100))
let blockWidth = getRandom(100, 400)
let blockHeight = getRandom(10, 15)
// to make steve in static pos
steve.point.y = window.innerHeight - steve.size.height * 2
let pew



initPlayer()
initBlocks()

drawBlock()

const move = (direction) => {

    if (arrshots.length == 0)
        clearInterval(pew)

    console.log("in move");
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawBlock()
    arrshots.forEach(element => {
        context.beginPath()
        context.fillStyle = 'purple';
        context.fillRect(element.point.x, element.point.y, element.size.width, element.size.height);
        context.stroke();
    });

    if (direction === "right") {
        context.beginPath()
        context.strokeStyle = 'red';
        context.rect(steve.point.x += 100, steve.point.y, steve.size.width, steve.size.height);
        context.stroke();
    } else if (direction === "left") {
        context.beginPath()
        context.strokeStyle = 'red';
        context.rect(steve.point.x -= 100, steve.point.y, steve.size.width, steve.size.height);
        context.stroke();
    } else if (direction === "down") {
        context.beginPath()
        context.strokeStyle = 'red';
        context.rect(steve.point.x, steve.point.y - 100, steve.size.width, steve.size.height);
        context.stroke();
    } else if (direction === "up") {
        let pSize = new Size(5, 15)
        let pPoint = new Point(steve.point.x + (steve.size.width / 2), steve.point.y)
        let shot = new Shot(pPoint, pSize)

        context.beginPath()
        context.fillStyle = 'purple';
        context.fillRect(pPoint.x, pPoint.y -= 15, pSize.width, pSize.height);
        context.stroke();
        arrshots.push(shot)
        //steve
        context.beginPath()
        context.strokeStyle = 'red';
        context.rect(steve.point.x, steve.point.y, steve.size.width, steve.size.height);
        context.stroke();
    } else {
        context.beginPath()
        context.strokeStyle = 'red';
        context.rect(steve.point.x, steve.point.y, steve.size.width, steve.size.height);
        context.stroke();
    }
    console.log(arrshots);
    // pPoint.x = steve.point.x
}