// Methods
window.onresize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    draw()
}
window.onload= () => {  
    canvas.width = window.innerWidth - 10
    canvas.height = window.innerHeight - 20
    draw()
}
let toGame= () =>location.replace("main.html")

playtheme = () => {
    mainTheme.play();
}

function Redirect() {
    window.location.href = "index.html";
}

// Math.random()* (max - min) + min
let getRandom = (min, max) => Math.random() * (max - min) + min

let initBlocks = () => {
    x = getRandom(0, canvas.width - blockWidth)
    y = getRandom(finalBoss.size.height * 2, canvas.height - steve.size.height * 2)

    x1 = getRandom(0, canvas.width - blockWidth)
    y1 = getRandom(0, canvas.height - steve.size.height - blockHeight)

    while (!((x1 + blockWidth <= x || x1 >= x + blockWidth) && (y1 + blockHeight <= y || y1 >= y + blockHeight))) {
        console.log("in");
        x1 = getRandom(0, canvas.width - blockWidth)
        y1 = getRandom(0, canvas.height - steve.size.height - blockHeight)
    }

}
let initPlayer = () => {
    steve.drawRec(context, "idle", imgSteve)
}
let drawBlock = () => {
    block1 = new Darwable(new Point(x, y), new Size(blockWidth, blockHeight))
    block2 = new Darwable(new Point(x1, y1), new Size(blockWidth, blockHeight))
    // context.beginPath()
    // context.fillStyle = 'blue';
    // context.fillRect(block1.point.x, block1.point.y, block1.size.width, block1.size.height);
    // context.fillText("1", x, y, steve.size.width);
    // context.stroke();
    context.beginPath()
    context.drawImage(imgBlock, block1.point.x, block1.point.y, block1.size.width, block1.size.height);
    context.drawImage(imgBlock, block2.point.x, block2.point.y, block2.size.width, block2.size.height);
    context.stroke();
    

    // context.beginPath()
    // context.fillStyle = 'blue';
    // context.fillRect(block2.point.x, block2.point.y, block2.size.width, block2.size.height);
    // context.fillText("2", x1, y1, steve.size.width);
    // context.stroke();
}
document.addEventListener("keydown", (e) => {
    if (!isPlaying(mainTheme))
        playtheme()

    if (e.keyCode == 39 && steve.point.x + 50 + steve.size.width <= canvas.width) {
        steve.drawRec(context, "right", imgSteve)
    } else if (e.keyCode == 37 && steve.point.x - 50 >= 0) {
        steve.drawRec(context, "left", imgSteve)
    } else if (e.keyCode == 13) {
        draw("up")
        clearInterval(pew)
        pew = setInterval(() => {
            arrshots.forEach(element => {
                let index = arrshots.indexOf(element);

                if (block1.contains(element) || block2.contains(element) || element.point.y <= 0)
                    arrshots.splice(index, 1);
                if (finalBoss.contains(element)) {
                    count++
                    arrshots.splice(index, 1);
                    console.log(finalBoss.hit);
                    finalBoss.hits()
                }

                element.point.y -= 20
            });
            console.log(Math.random() * (400 - 100) + 100);
            draw()
        }, 100);
    }
    draw()

})
let explosion = (element) => {
    element.drawRec(context, imgExplosion);
}

// Global vars :)
let canvas = document.querySelector('#canvas')
let context = canvas.getContext("2d")
let imgBoss = document.getElementById("boss");
let imgSteve = document.getElementById("steve");
let imgTrooper = document.getElementById("trooper");
let imgExplosion = document.getElementById("explosion");
let imgBlock = document.getElementById("block");
let h1 = document.querySelector("h1")
let arrshots = []
let arrBossShots = []
let troopers = []
let explosionTroopers = []
canvas.width = window.innerWidth - 10
canvas.height = window.innerHeight - 100
let x, y, x1, y1
let block1
let block2
let steve = new Player(new Point(100, 50), new Size(100, 100))
let blockWidth = getRandom(100, 300)
let blockHeight = getRandom(50, 85)
// to make steve in static pos
steve.point.y = window.innerHeight - steve.size.height * 2
let pew //u know what pew pew is ༼ つ ◕_◕ ༽つ🔫
let invaders // who pew pew for (☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)
let finalBoss = new Boss(new Point(Math.random() * ((canvas.width - 300) - 0) + 0, 0), new Size(200, 100))
var audio = new Audio("shooting.mp3");
var audioBoss = new Audio("BossSooting.mp3");
var crash = new Audio("crashing.mp3");
var mainTheme = new Audio("StarWarsMainTheme.mp3");
let count = 0
let outof = 50


initPlayer()
initBlocks()
drawBlock()
let trooper
invaders = setInterval(() => {
    trooper = new Trooper(new Point(Math.random() * ((canvas.width - 100) - 0) + 0, 0), new Size(100, 100))

    troopers.push(trooper)
}, 2000);
// let remove = (arr, sound) => {
//     let index = arr.indexOf(element);
//     if ((element.point.y + element.size.height > canvas.height) || (block1.contains(element) || block2.contains(element))) {
//         sound.pause();
//         sound.currentTime = 0;
//         sound.play();
//         arr.splice(index, 1);
//     }
//     if (steve.contains(element)) {
//         crash.pause();
//         crash.currentTime = 0;
//         crash.play();
//         audioBoss.pause();
//         audioBoss.currentTime = 0;
//         alert("game over")
//         alert = function () { };
//         Redirect()
//     }
// }
let invaderscount = setInterval(() => {
    troopers.forEach(element => {
        let index = troopers.indexOf(element);
        if (element.point.y + element.size.height > canvas.height) {
            crash.pause();
            crash.currentTime = 0;
            crash.play();
            explosionTroopers[index] = element
            setTimeout(function () {
                explosionTroopers.splice(index, 1);
            }, 1000);
            troopers.splice(index, 1);
        }

        if (block1.contains(element) || block2.contains(element)) {
            crash.pause();
            crash.currentTime = 0;
            crash.play();
            explosionTroopers[index] = element
            setTimeout(function () {
                explosionTroopers.splice(index, 1);
            }, 1000);
            troopers.splice(index, 1);
        }

        if (steve.contains(element)) {
            crash.pause();
            crash.currentTime = 0;
            crash.play();
            audioBoss.pause();
            audioBoss.currentTime = 0;
            explosionTroopers[index] = element
            setTimeout(function () {
                explosionTroopers.splice(index, 1);
            }, 1000);
            alert("game over")
            alert = function () { };
            Redirect()
        }

        arrshots.forEach(elem => {
            let index1 = arrshots.indexOf(element);

            if (elem.contains(element) || elem.contains(element)) {
                count++
                crash.pause();
                crash.currentTime = 0;
                crash.play();
                explosionTroopers[index] = element
                setTimeout(function () {
                    explosionTroopers.splice(index, 1);
                }, 1000);
                troopers.splice(index, 1);
                arrshots.splice(index1, 1);
                steve.kill()
            }
        });
        element.point.y += 5
    });
    draw()
}, 50);
let xv, yv;

xv = Math.floor(Math.random() * 76 + 25) / 10;
yv = Math.floor(Math.random() * 76 + 25) / 10;

// random ball direction
if (Math.floor(Math.random() * 2) == 0) {
    xv = -xv;
}
if (Math.floor(Math.random() * 2) == 0) {
    yv = -yv;
}
let bossMoving
let bossShot
let finalfight = false
function isPlaying(audelem) { return !audelem.paused; }

const draw = (direction) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "red";
    context.font = "30px Arial";
    context.fillText(`${count}/${outof}`, 10, 50);
    if (block1.contains(finalBoss) || block2.contains(finalBoss)) {
        yv = - yv
    }
    if ((finalBoss.point.x < 0 && xv < 0) || (finalBoss.point.x + finalBoss.size.width > canvas.width && xv > 0)) {
        xv = -xv;
    }
    if ((finalBoss.point.y < 0 && yv < 0) || (finalBoss.point.y + finalBoss.size.height > canvas.height && yv > 0)) {
        yv = -yv;
    }
    if (finalBoss.hit >= 20) {//20
        audioBoss.pause();
        audioBoss.currentTime = 0;
        alert("u Won")
        alert = function () { };
        Redirect()
    }
    if (steve.killCount >= 50) {//50
        if (!finalfight) {
            mainTheme.pause();
            mainTheme.currentTime = 0;
        }
        finalfight = true
        if (!isPlaying(mainTheme)) {
            mainTheme = new Audio("finalBoss.mp3");
            mainTheme.play()
        }
        if(outof != 20){
        count = 0
        outof = 20
        }
        clearInterval(invaders)
        clearInterval(invaderscount)
        audioBoss.play()
        troopers = []
        finalBoss.drawRec(context, imgBoss)
        clearInterval(bossMoving)
        bossMoving = setInterval(() => {
            if (Math.floor(Math.random() * 7) == 0) {
                bossShot = new Shot(new Point(finalBoss.point.x + finalBoss.size.width / 2, finalBoss.point.y + finalBoss.size.height), new Size(5, 15))
                arrBossShots.push(bossShot)
            }
            finalBoss.point.x += xv;
            finalBoss.point.y += yv;
            draw()
        }, 50);
    }
    arrBossShots.forEach(element => {
        // element.move(context,"boss")
        let index = arrBossShots.indexOf(element);
        if (element.point.y > canvas.height)
            arrBossShots.splice(index, 1);

        if (block1.contains(element) || block2.contains(element)) {

            arrBossShots.splice(index, 1);
        } else {
            element.point.y += 25
            element.drawRec(context)
        }
        if (steve.contains(element) || steve.contains(finalBoss)) {
            // window.stop();
            audioBoss.pause();
            audioBoss.currentTime = 0;
            alert("game over")
            alert = function () { };
            Redirect()

        }
    });
    drawBlock()
    //steve
    steve.drawRec(context, "idle", imgSteve)

    if (arrshots.length == 0)
        clearInterval(pew)

    if (direction === "up") {
        let shot = new Shot(new Point(steve.point.x + (steve.size.width / 2), steve.point.y), new Size(5, 15))
        shot.move(context)
        arrshots.push(shot)
        audio.pause();
        audio.currentTime = 0;
        audio.play();

    }
    arrshots.forEach(element => {
        element.drawRec(context)
    });

    troopers.forEach(element => {
        element.drawRec(context, imgTrooper)
    });
    if (explosionTroopers.length > 0) {
        explosionTroopers.forEach(element => {
            element.drawRec(context, imgExplosion)
        });
    }
}