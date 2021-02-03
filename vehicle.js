class Vehicle {
  constructor(x, y, size, acceleration, target, maxSpeed, color) {
    this.x = x
    this.y = y
    this.color = color
    this.target = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    }
    this.size = size
    this.maxSpeed = maxSpeed
    this.acceleration = acceleration

    this.target = target
    this.velocity = {
      x: 1,
      y: 0,
    }

    this.speed = 10
    this.force = 0.01
  }

  draw = (brush) => {
    brush.fillStyle = this.color
    brush.strokeStyle = 'white'
    brush.lineWidth = 2
    brush.beginPath()
    brush.moveTo(this.head.x, this.head.y)
    brush.lineTo(this.left.x, this.left.y)
    brush.lineTo(this.right.x, this.right.y)
    brush.lineTo(this.head.x, this.head.y)
    brush.fill()
    brush.stroke()
  }

  tick = () => {
    // console.log(dist)

    // console.log(dist / 10000)
    // this.force = dist / 10000

    const angle = Math.atan2(this.velocity.x, this.velocity.y)
    const direction = {
      x: Math.sin(angle),
      y: Math.cos(angle),
    }

    this.head = {
      x: this.x + direction.x * this.size * 2,
      y: this.y + direction.y * this.size * 2,
    }

    this.left = {
      x: this.x - direction.x * this.size + direction.y * this.size,
      y: this.y - direction.y * this.size - direction.x * this.size,
    }

    this.right = {
      x: this.x - direction.x * this.size - direction.y * this.size,
      y: this.y - direction.y * this.size + direction.x * this.size,
    }
  }

  gravitate = (target) => {
    this.target = target
    const dist = Math.sqrt(
      Math.pow(this.x - this.target.x, 2) + Math.pow(this.y - this.target.y, 2),
    )
    this.force = dist / 10000
    const desired = {
      x: (this.target.x - this.x) / dist,
      y: (this.target.y - this.y) / dist,
    }

    const error = {
      x: desired.x - this.velocity.x,
      y: desired.y - this.velocity.y,
    }

    this.velocity = {
      x: this.velocity.x + error.x * this.force,
      y: this.velocity.y + error.y * this.force,
    }

    this.x += this.velocity.x * this.speed
    this.y += this.velocity.y * this.speed
  }

  repell = (target) => {
    this.target = target
    const dist = Math.sqrt(
      Math.pow(this.x - this.target.x, 2) + Math.pow(this.y - this.target.y, 2),
    )
    this.force = 0.001
    const desired = {
      x: (this.target.x - this.x) / dist,
      y: (this.target.y - this.y) / dist,
    }

    const error = {
      x: -desired.x - this.velocity.x,
      y: -desired.y - this.velocity.y,
    }

    this.velocity = {
      x: this.velocity.x + error.x * this.force,
      y: this.velocity.y + error.y * this.force,
    }

    this.x += this.velocity.x * this.speed
    this.y += this.velocity.y * this.speed
  }
}
