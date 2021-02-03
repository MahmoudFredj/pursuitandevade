const canvas = document.querySelector('canvas')

canvas.width = innerWidth
canvas.height = innerHeight

let mouse = {
  x: 0,
  y: 0,
}

const brush = canvas.getContext('2d')

const vehicles = []

for (let i = 0; i < 500; i++) {
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

const draw = () => {
  brush.clearRect(0, 0, innerWidth, innerHeight)
  for (let i = 0; i < vehicles.length; i++) {
    vehicles[i].draw(brush)
  }
}

const distanceToCover = 10
const tick = () => {
  for (let i = 0; i < vehicles.length; i++) {
    for (let j = i + 1; j < vehicles.length; j++) {
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
  }

  for (let i = 0; i < vehicles.length; i++) {
    if (!vehicles[i].repelling) vehicles[i].gravitate(mouse)
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
