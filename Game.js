// Methods
window.onresize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    draw()
}
window.onload = () => {
    canvas.width = window.innerWidth - 10
    canvas.height = window.innerHeight - 20
    draw()
}
let toGame = () => location.replace("main.html")

let playtheme = () => mainTheme.play() 

let Redirect = () => window.location.href = "index.html"
// Math.random()* (max - min) + min
let getRandom = (min, max) => Math.random() * (max - min) + min
// initialize 2 blocks
let initBlocks = () => {
    // xy for the first block
    x = getRandom(0, canvas.width - blockWidth)
    y = getRandom(finalBoss.size.height * 2, canvas.height - steve.size.height * 2)
    // xy for the second block
    x1 = getRandom(0, canvas.width - blockWidth)
    y1 = getRandom(0, canvas.height - steve.size.height - blockHeight)
    // loop so the second block wont override the first
    while (!((x1 + blockWidth <= x || x1 >= x + blockWidth) && (y1 + blockHeight <= y || y1 >= y + blockHeight))) {
        x1 = getRandom(0, canvas.width - blockWidth)
        y1 = getRandom(0, canvas.height - steve.size.height - blockHeight)
    }
}
let initPlayer = () => steve.drawRec(context, "idle", imgSteve)

let drawBlock = () => {
    block1 = new Darwable(new Point(x, y), new Size(blockWidth, blockHeight))
    block2 = new Darwable(new Point(x1, y1), new Size(blockWidth, blockHeight))
    context.beginPath()
    context.drawImage(imgBlock, block1.point.x, block1.point.y, block1.size.width, block1.size.height);
    context.drawImage(imgBlock, block2.point.x, block2.point.y, block2.size.width, block2.size.height);
    context.stroke();
}
let isPlaying = (audelem) => !audelem.paused

let killAudio = (audioz) => {
    audioz.pause();
    audioz.currentTime = 0;
    audioz.play();
}

let endGameMsg = (msg) => {
    alert(msg)
    alert = () => { }
    Redirect()
}
document.addEventListener("keydown", (e) => {
    !isPlaying(mainTheme) ? playtheme() : null

    if (e.keyCode == 39 && steve.point.x + 50 + steve.size.width <= canvas.width) {
        steve.drawRec(context, "right", imgSteve)
    } else if (e.keyCode == 37 && steve.point.x - 50 >= 0) {
        steve.drawRec(context, "left", imgSteve)
    } else if (e.keyCode == 13) {
        let shot = new Shot(new Point(steve.point.x + (steve.size.width / 2), steve.point.y), new Size(5, 15))
        shot.move(context)
        arrshots.push(shot)
        killAudio(shootingAudio)

        clearInterval(pew)
        pew = setInterval(() => {
            arrshots.forEach(element => {
                let index = arrshots.indexOf(element);

                if (block1.contains(element) || block2.contains(element) || element.point.y <= 0)
                    arrshots.splice(index, 1);
                if (finalBoss.contains(element)) {
                    count++
                    arrshots.splice(index, 1);
                    finalBoss.hits()
                }
                element.point.y -= 20 // to move laser shot
            });
            draw()
        }, 100);
    }
    draw()
})

// Global vars :)
let canvas = document.querySelector('#canvas')
let context = canvas.getContext("2d")
// imgs
let imgBoss = document.getElementById("boss");
let imgSteve = document.getElementById("steve");
let imgTrooper = document.getElementById("trooper");
let imgExplosion = document.getElementById("explosion");
let imgBlock = document.getElementById("block");
// array
let arrshots = []
let arrBossShots = []
let troopers = []
let explosionTroopers = []

// Blocks
let block1
let block2
let x, y, x1, y1
let blockWidth = getRandom(100, 300)
let blockHeight = getRandom(50, 85)
// Player = steve (☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)
let steve = new Player(new Point(100, 50), new Size(100, 100))
// to make steve in static pos
steve.point.y = window.innerHeight - steve.size.height * 2

let pew //u know what pew pew is ༼ つ ◕_◕ ༽つ🔫
let invaders // who pew pew for (☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)
let finalBoss = new Boss(new Point(Math.random() * ((canvas.width - 300) - 0) + 0, 0), new Size(200, 100))
// Audio
var shootingAudio = new Audio("./Audio/shooting.mp3");
shootingAudio.crossOrigin = 'anonymous';
shootingAudio.volume = 0.02
var audioBoss = new Audio("./Audio/BossSooting.mp3");
audioBoss.volume = 0.02
var crash = new Audio("./Audio/crashing.mp3");
crash.volume = 0.02
var mainTheme = new Audio("./Audio/StarWarsMainTheme.mp3");
mainTheme.volume = 0.02

canvas.width = window.innerWidth - 10
canvas.height = window.innerHeight - 100
let count = 0
let outof = 50

// Final Boss
let bossMoving
let bossShot
let finalfight = false

// to move the final Boss
let xv = Math.floor(Math.random() * 76 + 25) / 10;
let yv = Math.floor(Math.random() * 76 + 25) / 10;
// random ball direction
if (Math.floor(Math.random() * 2) == 0) xv = -xv;
if (Math.floor(Math.random() * 2) == 0) yv = -yv;

// initializing to start
initPlayer()
initBlocks()
drawBlock()

invaders = setInterval(() => troopers.push(new Trooper(new Point(Math.random() * ((canvas.width - 100) - 0) + 0, 0), new Size(100, 100)))
    , 1000);

let invaderscount = setInterval(() => {
    troopers.forEach(element => {
        let index = troopers.indexOf(element);
        // if trooper touch the edge of the canvas or one of the blocks
        if ((element.point.y + element.size.height > canvas.height) || (block1.contains(element) || block2.contains(element))) {
            killAudio(crash)
            explosionTroopers[index] = element
            // so u can see the explosion wohooo ╰(*°▽°*)╯
            setTimeout(() => {
                explosionTroopers.splice(index, 1);
            }, 1000);
            troopers.splice(index, 1);
        }
        // if trooper touch the player
        if (steve.contains(element)) {
            killAudio(crash)
            audioBoss.pause();
            audioBoss.currentTime = 0;
            explosionTroopers[index] = element
            setTimeout(function () {
                explosionTroopers.splice(index, 1);
            }, 1000);
            endGameMsg("Game over")
        }

        arrshots.forEach(elem => {
            let index1 = arrshots.indexOf(element);
            // if bullet touch the trooper
            if (elem.contains(element)) {
                count++
                killAudio(crash)
                explosionTroopers[index] = element
                setTimeout(function () {
                    explosionTroopers.splice(index, 1);
                }, 1000);
                troopers.splice(index, 1);
                arrshots.splice(index1, 1);
                // to count how many troopers did steve kill
                steve.kill()
            }
        });
        element.point.y += 5 // to move trooper
    });
    draw()
}, 50);


const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // counter
    context.fillStyle = "white";
    context.font = "30px Arial";
    if(outof != 20){
        steve.killCount = count;
        context.fillText(`${steve.killCount}/${outof}`, 10, 50);
    }else
    context.fillText(`${count}/${outof}`, 10, 50);
    

    if ((block1.contains(finalBoss) || block2.contains(finalBoss))
        || ((finalBoss.point.y < 0 && yv < 0) || (finalBoss.point.y + finalBoss.size.height > canvas.height && yv > 0))) {
        yv = -yv
    }
    if ((finalBoss.point.x < 0 && xv < 0) || (finalBoss.point.x + finalBoss.size.width > canvas.width && xv > 0)) {
        xv = -xv;
    }
    // when final Boss is dead
    if (finalBoss.hit >= 20) {//20
        audioBoss.pause();
        audioBoss.currentTime = 0;
        endGameMsg("U Won")
    }
    // when all troopers are died
    if (steve.killCount >= 50) {//50
        if (!finalfight) {
            mainTheme.pause();
            mainTheme.currentTime = 0;
        }
        // to change the theme
        finalfight = true
        if (!isPlaying(mainTheme)) {
            mainTheme = new Audio("./Audio/finalBoss.mp3");
            mainTheme.play()
            mainTheme.volume = 0.05
        }
        // to change the count
        if (outof != 20) {
            count = 0
            outof = 20
        }

        clearInterval(invaders)
        clearInterval(invaderscount)

        audioBoss.play()
        audioBoss.volume = 0.02
        // to empty troopers array :).
        troopers = []

        finalBoss.drawRec(context, imgBoss)

        // stop it before starting it so it wont run more than ones at a time
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
        let index = arrBossShots.indexOf(element);
        if ((element.point.y > canvas.height) || (block1.contains(element) || block2.contains(element)))
            arrBossShots.splice(index, 1);
        else {
            element.point.y += 25
            element.drawRec(context)
        }
        if (steve.contains(element) || steve.contains(finalBoss)) {
            audioBoss.pause();
            audioBoss.currentTime = 0;
            endGameMsg("Game over")
        }
    });

    //blocks
    drawBlock()
    //steve
    steve.drawRec(context, "idle", imgSteve)

    if (arrshots.length == 0)
        clearInterval(pew)

    arrshots.forEach(element => {
        element.drawRec(context)
    });

    troopers.forEach(element => {
        element.drawRec(context, imgTrooper)
    });

    explosionTroopers.forEach(element => {
        element.drawRec(context, imgExplosion)
    });
}