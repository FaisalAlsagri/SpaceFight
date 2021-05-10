let canvas = document.querySelector('#canvas')
let context = canvas.getContext("2d")
let h1 = document.querySelector("h1")

canvas.width = window.innerWidth - 10
canvas.height = window.innerHeight - 100


window.onresize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

let draw = new Movable()
draw.speed = 10
console.log(draw);
let point = new Point(100, 50)
let size = new Size(100, 100)
let steve = new Player(point, size)
steve.point.y =  window.innerHeight - steve.size.height * 2
let steve1 = new Player()
steve.speed = 50
console.log(steve);
console.log(steve1);

context.beginPath()
context.strokeStyle = 'red';
context.rect(steve.point.x, steve.point.y, steve.size.width, steve.size.height);
context.stroke();
document.addEventListener("keydown", (e) => {
    console.log(e);
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    if (e.keyCode == 39) {
        context.beginPath()
        context.strokeStyle = 'red';
        context.rect(steve.point.x += 100, steve.point.y, steve.size.width, steve.size.height);
        context.stroke();
    }else if(e.keyCode == 37){
        context.beginPath()
    context.strokeStyle = 'red';
    context.rect(steve.point.x -= 100, steve.point.y, steve.size.width, steve.size.height);
    context.stroke();
    }
    context.beginPath()
        context.strokeStyle = 'red';
        context.rect(steve.point.x, steve.point.y, steve.size.width, steve.size.height);
        context.stroke();
})
h1.addEventListener("click", () => {
    console.log("999999");
    context.beginPath()
    context.strokeStyle = 'red';
    context.rect(steve.point.x += 100, window.innerHeight - steve.size.height * 2, steve.size.width, steve.size.height);
    context.stroke();
})