let canvas = document.querySelector('#canvas')
let context = canvas.getContext("2d")
let h1 = document.querySelector("h1")

canvas.width = window.innerWidth - 10
canvas.height = window.innerHeight - 100

window.onresize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

let point = new Point(100, 50)
let size = new Size(100, 100)
let steve = new Player(point, size)

// Math.random()* (max - min) + min
let blockWidth = Math.random() * (400 - 100) + 100
let blockHeight = Math.random() * (15 - 10) + 10
let x = Math.random() * ((canvas.width - blockWidth) - 0) + 0
let y = Math.random() * ((canvas.height - steve.size.height * 2) - 0) + 0

let x1 = Math.random() * ((canvas.width - blockWidth) - 0) + 0
let y1 = Math.random() * ((canvas.height - steve.size.height - blockHeight) - 0) + 0

while (!((x1 + blockWidth <= x || x1 >= x + blockWidth) && (y1 + blockHeight <= y || y1 >= y + blockHeight))) {
    console.log("in");
    x1 = Math.random() * ((canvas.width - blockWidth) - 0) + 0
    y1 = Math.random() * ((canvas.height - steve.size.height - blockHeight) - 0) + 0
}

let block1 = new Darwable(new Point(x, y), new Size())
let block2 = new Darwable()
steve.point.y = window.innerHeight - steve.size.height * 2

context.beginPath()
context.strokeStyle = 'red';
context.rect(steve.point.x, steve.point.y, steve.size.width, steve.size.height);
context.stroke();

let drawBlock = () => {

    context.beginPath()
    context.fillStyle = 'blue';
    context.fillRect(x, y, blockWidth, blockHeight);
    context.fillText("1", x, y, steve.size.width);
    context.stroke();

    context.beginPath()
    context.fillStyle = 'blue';
    context.fillRect(x1, y1, blockWidth, blockHeight);
    context.fillText("2", x1, y1, steve.size.width);
    context.stroke();
}
drawBlock()
document.addEventListener("keydown", (e) => {
    if (e.keyCode == 39 && steve.point.x + 100 + steve.size.width <= canvas.width) {
        move("right")
    } else if (e.keyCode == 37 && steve.point.x - 100 >= 0) {
        move("left")
    }
})

const move = (direction) => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawBlock()

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
    } else {
        context.beginPath()
        context.strokeStyle = 'red';
        context.rect(steve.point.x, steve.point.y, steve.size.width, steve.size.height);
        context.stroke();
    }
}