const canvas = document.querySelector('canvas')

canvas.width = innerWidth
canvas.height = innerHeight

let mouse = {
  x: 0,
  y: 0,
}

const brush = canvas.getContext('2d')

const vehicle = new Vehicle(500, 500, 10, 3, mouse, 10, 'rgb(255,255,255,0.3)')
// const veh

const gravitations = []

const vehicles = []

for (let i = 0; i < 500; i++) {
  // const vehicle=new Vehicle(Math.random()*innerWidth,Math.random()*innerHeight,5,10,mouse,10,'rgb(255,255,255,0.3)')
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
  // brush.fillStyle = 'rgb(0,0,0,0.08)'
  // brush.fillRect(0, 0, innerWidth, innerHeight)
  // console.log(vehicles.length)
  for (let i = 0; i < vehicles.length; i++) {
    vehicles[i].draw(brush)
  }
  // gravitations.map((g) => g.draw(brush))
  // vehicle.draw(brush)
}

const distanceToCover = 50
const tick = () => {
  for (let i = 0; i < vehicles.length; i++) {
    for (let j = i + 1; j < vehicles.length; j++) {
      const v1 = vehicles[i]
      const v2 = vehicles[j]
      const dist = Math.sqrt(
        Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2),
      )
      if (dist < distanceToCover && !v2.repelling && !v1.repelling) {
        // console.log('rep')
        v1.repelling = true
        v1.repell({ x: v2.x, y: v2.y })
      }
    }
  }

  for (let i = 0; i < vehicles.length; i++) {
    if (!vehicles[i].repelling) vehicles[i].gravitate(mouse)
    vehicles[i].tick()
    vehicles[i].repelling = false

    // if (vehicles[i].x < 0) {
    //   // console.log('die')
    //   vehicles.splice(i, 1)
    // }
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
