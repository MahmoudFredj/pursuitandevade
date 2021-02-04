const canvas = document.querySelector('canvas')

canvas.width = innerWidth
canvas.height = innerHeight

let mouse = {
  x: 0,
  y: 0,
}

const brush = canvas.getContext('2d')

const vehicles = []

const Food = []
const Poison = []
setInterval(() => {
  Food.push(
    new Point(
      Math.random() * innerWidth,
      Math.random() * innerHeight,
      10,
      'green',
    ),
  )
  Poison.push(
    new Point(
      Math.random() * innerWidth,
      Math.random() * innerHeight,
      10,
      'red',
    ),
  )
}, 100)

setInterval(() => {
  vehicles.push(
    new Vehicle(
      Math.random() * innerWidth,
      Math.random() * innerHeight,
      5,
      10,
      mouse,
      10,
      'rgb(255,255,255,0.3)',
    ),
  )
}, 100)
for (let i = 0; i < 10; i++) {
  Food.push(
    new Point(
      Math.random() * innerWidth,
      Math.random() * innerHeight,
      10,
      'green',
    ),
  )
  Poison.push(
    new Point(
      Math.random() * innerWidth,
      Math.random() * innerHeight,
      10,
      'red',
    ),
  )
}

for (let i = 0; i < 3; i++) {
  vehicles.push(
    new Vehicle(
      Math.random() * innerWidth,
      Math.random() * innerHeight,
      5,
      10,
      mouse,
      10,
      'rgb(255,255,255,0.3)',
    ),
  )
}

brush.fillStyle = 'white'
brush.fillRect(0, 0, innerWidth, innerHeight)

const draw = () => {
  brush.clearRect(0, 0, innerWidth, innerHeight)

  for (let i = 0; i < vehicles.length; i++) {
    if (vehicles[i] && i < vehicles.length) vehicles[i].draw(brush)
  }

  Food.map((f) => f.draw(brush))
  Poison.map((p) => p.draw(brush))
}

const distanceToCover = 100
const tick = () => {
  // flocking algo
  for (let i = 0; i < vehicles.length; i++) {
    for (let j = 0; j < vehicles.length; j++) {
      if (i === j) break
      const v1 = vehicles[i]
      const v2 = vehicles[j]
      const dist = Math.sqrt(
        Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2),
      )

      if (dist < distanceToCover && !v2.repelling && !v1.repelling) {
        v1.repelling = true
        v1.repell({ x: v2.x, y: v2.y })
      }
    }
    // eating algo
    let foodIndex = 0
    let foodDist = 10000

    let poisonIndex = 0
    let poisonDist = 10000
    for (let f = 0; f < Food.length; f++) {
      const fdist = Math.sqrt(
        Math.pow(Food[f].x - vehicles[i].x, 2) +
          Math.pow(Food[f].y - vehicles[i].y, 2),
      )
      if (foodDist > fdist) {
        foodDist = fdist
        foodIndex = f
      }
      if (fdist < 10) Food.splice(f, 1)
    }
    for (let p = 0; p < Poison.length; p++) {
      const pdist = Math.sqrt(
        Math.pow(Poison[p].x - vehicles[i].x, 2) +
          Math.pow(Poison[p].y - vehicles[i].y, 2),
      )
      if (poisonDist > pdist && pdist > 300) {
        vehicles[i].repelling = true
        poisonDist = pdist
        poisonIndex = p
      }
      if (pdist < 10) {
        Poison.splice(p, 1)
        vehicles.splice(i, 1)
        return
      }
    }
    // gravitate algo
    // if (vehicles[i].repelling) {
    //   vehicles[i].repell(Poison[poisonIndex])
    // }
    if (foodIndex < Food.length) vehicles[i].gravitate(Food[foodIndex], i)
    // if (i === 1) console.log(Food[foodIndex])
    vehicles[i].tick()
    vehicles[i].repelling = false
  }
}

const ignite = () => {
  tick()
  draw()
  requestAnimationFrame(ignite)
}

ignite()

document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
})
