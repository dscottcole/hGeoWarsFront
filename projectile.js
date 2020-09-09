const projectileArray = []
let projectilesFired = 0
let enemiesDestroyed = 0
let accuracy

class Projectile {
    constructor(angle, quad, pX, pY) {
        this.xPos = pX
        this.yPos = pY
        this.angle = angle
        this.radius = 5
        this.speed = 8
        this.color = 'orange'
        this.quad = quad
    }
    hitDetect () {
        for (let i = 0; i < enemiesArray.length; i++){
            let enemy = enemiesArray[i];
            if (this.xPos+this.radius >= enemy.xPos && this.xPos - this.radius <= enemy.xPos+enemy.width && this.yPos+this.radius >= enemy.yPos && this.yPos - this.radius <= enemy.yPos+enemy.height) {
                projectileArray.splice(projectileArray.indexOf(this),1)
                enemiesArray.splice(i,1)
                enemiesDestroyed += 1
                scoreIncrease()
                displayAccuracy()
            } 
        }
    }
    wallDetect () {
        if (this.xPos > world.width || this.xPos < 0 || this.yPos > world.height || this.yPos < 0) {
            projectileArray.splice(projectileArray.indexOf(this),1)
        }
    }
    draw () {
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        this.hitDetect()
        this.wallDetect()
    }
}

const generateProjectile = (angle, quad, pX, pY) => {
    if (projectileArray.length < 25) {
    
        let projectile = new Projectile(angle, quad, pX, pY)
        projectileArray.push(projectile)
        projectilesFired += 1
        displayAccuracy()
    }
}

// let mouseInterval

const enableMouse = () => { 
    world.addEventListener('mousedown', function(e) {
        // console.log(e)
        mousedownFn(e)

        // mouseInterval = setInterval(mousedownFn(e), 50)
    })

    // world.addEventListener('mouseup', function(e) {
        // console.log(e)

        // clearInterval(mouseInterval)
    // })
}

const mousedownFn = (e) => {
    
    let ax = player.xPos
    let ay = player.yPos
    let bx = e.clientX
    let by = e.clientY
    let angle

    if (bx >= ax && by < ay) {
        quad = 1
        angle = getAngle(ax, ay, bx, by)
    } else if (bx < ax && by < ay) {
        quad = 2
        angle = getAngle(ax, ay, bx, by)
    } else if (bx < ax && by >= ay) {
        quad = 3
        angle = getAngle(ax, ay, bx, by)
    } else if (bx >= ax && by >= ay) {
        quad = 4
        angle = getAngle(ax, ay, bx, by)
    }
    generateProjectile(angle, quad, ax, ay)
}

function getAngle(ax,ay,bx,by) {
    let angleRad = Math.atan((ay-by)/(ax-bx));
    return(angleRad)
}

const drawProjectiles = () => {
    
    projectileArray.forEach(projectile => {  

        if (projectile.quad === 1) {
            projectile.xPos += projectile.speed * Math.cos(projectile.angle)
            projectile.yPos += projectile.speed * Math.sin(projectile.angle)
        } else if (projectile.quad === 2) {
            projectile.xPos -= projectile.speed * Math.cos(projectile.angle)
            projectile.yPos -= projectile.speed * Math.sin(projectile.angle)
        } else if (projectile.quad === 3) {
            projectile.xPos -= projectile.speed * Math.cos(projectile.angle)
            projectile.yPos -= projectile.speed * Math.sin(projectile.angle)
        } else if (projectile.quad === 4) {
            projectile.xPos += projectile.speed * Math.cos(projectile.angle)
            projectile.yPos += projectile.speed * Math.sin(projectile.angle)
        }           
        projectile.draw()
    })
}

const calcAccuracy = () => {
    accuracy = parseFloat(enemiesDestroyed/projectilesFired).toFixed(3)* 100
    // console.log(accuracy)
}