// Methods
window.onresize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    draw()
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
    steve.drawRec(context)
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
        steve.drawRec(context, "right")
    } else if (e.keyCode == 37 && steve.point.x - 100 >= 0) {
        steve.drawRec(context, "left")
    } else if (e.keyCode == 13) {
        draw("up")
        clearInterval(pew)
        pew = setInterval(() => {
            arrshots.forEach(element => {
                let index = arrshots.indexOf(element);
                if (element.point.y <= 0)
                    arrshots.splice(index, 1);

                if (block1.contains(element) || block2.contains(element))
                    arrshots.splice(index, 1);

                element.point.y -= 20
            });
            console.log(Math.random() * (400 - 100) + 100);
            draw()
        }, 100);
    }
    draw()

})

// Global vars :)
let canvas = document.querySelector('#canvas')
let context = canvas.getContext("2d")
let h1 = document.querySelector("h1")
let arrshots = []
let troopers = []
canvas.width = window.innerWidth - 10
canvas.height = window.innerHeight - 100
let x, y, x1, y1
let block1
let block2
let steve = new Player(new Point(100, 50), new Size(100, 100))
let blockWidth = getRandom(100, 400)
let blockHeight = getRandom(10, 15)
// to make steve in static pos
steve.point.y = window.innerHeight - steve.size.height * 2
let pew //u know what pew pew is ༼ つ ◕_◕ ༽つ🔫
let invaders // who pew pew for (☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)


initPlayer()
initBlocks()
drawBlock()
let trooper
invaders = setInterval(() => {
    trooper = new Trooper(new Point(Math.random() * ((canvas.width - 100) - 0) + 0, 0), new Size(100, 100))

    troopers.push(trooper)


    console.log(troopers);
}, 4000);

let invaderscount = setInterval(() => {
    troopers.forEach(element => {
        let index = troopers.indexOf(element);
        if (element.point.y > canvas.height)
            troopers.splice(index, 1);

        if (block1.contains(element) || block2.contains(element))
            troopers.splice(index, 1);

            // if(steve.contains(element)){
            //     alert("game over")
            // }

        arrshots.forEach(elem => {
        let index1 = arrshots.indexOf(element);

            if (elem.contains(element) || elem.contains(element)){
                troopers.splice(index, 1);
                arrshots.splice(index1, 1);
        }
        });
        element.point.y += 5
    });
    draw()
}, 50);

const draw = (direction) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBlock()
    //steve
    steve.drawRec(context, "idle")

    if (arrshots.length == 0)
        clearInterval(pew)

    if (direction === "up") {
        let shot = new Shot(new Point(steve.point.x + (steve.size.width / 2), steve.point.y), new Size(5, 15))
        shot.move(context)
        arrshots.push(shot)
    }
    arrshots.forEach(element => {
        element.drawRec(context)
    });

    troopers.forEach(element => {
        context.beginPath()
        context.fillStyle = 'red';
        context.fillRect(element.point.x, element.point.y, element.size.width, element.size.height);
        context.stroke();
    });
}