const canvas = document.querySelector('canvas')
const brush = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const backgrounds = [
  'rgb(249, 202, 36,0.4)',
  'rgb(235, 77, 75,0.4)',
  'rgb(106, 176, 76,0.4)',
  'rgb(34, 166, 179,0.4)',
  'rgb(190, 46, 221,0.4)',
  'rgb(252, 66, 123,0.4)',
  'rgb(154, 236, 219,0.4)',
]
const foreground = [
  'rgb(249, 202, 36)',
  'rgb(235, 77, 75)',
  'rgb(106, 176, 76)',
  'rgb(34, 166, 179)',
  'rgb(190, 46, 221)',
  'rgb(252, 66, 123)',
  'rgb(154, 236, 219)',
]

let butterfly = new Butterfly(
  new Vector(200, 200),
  'rgb(130, 88, 159,0.4)',
  'red',
  'white',
  5,
  new Vector(0, -1),
)

let mouse = new Vector(0, 0)
let ang = Math.PI
let butterflies = []
for (let i = 0; i < 200; i++) {
  const indexOfColor = Math.floor(Math.random() * foreground.length)
  butterflies.push(
    new Butterfly(
      new Vector(Math.random() * innerWidth, Math.random() * innerHeight),
      backgrounds[indexOfColor],
      foreground[indexOfColor],
      'white',
      2 + Math.random() * 10,
      new Vector(0, -1),
    ),
  )
}

const distanceToCover = 30
const tick = () => {
  for (let i = 0; i < butterflies.length; i++) {
    for (let j = i + 1; j < butterflies.length; j++) {
      const v1 = butterflies[i]
      const v2 = butterflies[j]
      const dist = Vector.distance(v1.pos, v2.pos)

      if (dist < distanceToCover && !v2.repelling && !v1.repelling) {
        v1.repelling = true
        v1.repell(v2.pos)
      }
    }
  }

  for (let i = 0; i < butterflies.length; i++) {
    butterflies[i].flap()
    butterflies[i].tick()
    if (!butterflies[i].repelling) butterflies[i].gravitate(mouse)
    butterflies[i].repelling = false
  }
}
const draw = () => {
  brush.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < butterflies.length; i++) {
    butterflies[i].draw(brush)
  }
}

const ignite = () => {
  tick()
  draw()
  requestAnimationFrame(ignite)
}

ignite()

document.addEventListener('mousemove', ({ clientX, clientY }) => {
  mouse = new Vector(clientX, clientY)
})
