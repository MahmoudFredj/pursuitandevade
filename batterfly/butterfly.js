class Butterfly {
  constructor(pos, fill, stroke, antennaeColor, size, direction) {
    this.pos = pos
    this.fill = fill
    this.stroke = stroke
    this.antennaeColor = antennaeColor
    this.size = size
    this.side = size
    this.direction = direction
    this.minSide = size / 4
    this.maxSide = size
    this.flapVelocity = size / 10
    this.ff = size / 10
    this.velocity = new Vector(0, 0)
    this.acceleration = 1
    this.maxSpeed = 5

    this.leftAntennae = []
    this.rightAntennae = []
    this.leftWing = []
    this.rightWing = []
  }

  draw = (brush) => {
    // head

    brush.lineWidth = 1.5
    brush.strokeStyle = this.antennaeColor
    brush.beginPath()
    for (let i = 0; i < this.rightAntennae.length; i++) {
      brush.lineTo(this.rightAntennae[i].x, this.rightAntennae[i].y)
    }

    brush.stroke()
    brush.beginPath()
    for (let i = 0; i < this.leftAntennae.length; i++) {
      brush.lineTo(this.leftAntennae[i].x, this.leftAntennae[i].y)
    }
    brush.stroke()
    brush.lineWidth = 1
    brush.strokeStyle = this.stroke
    brush.fillStyle = this.fill
    // head
    brush.strokeStyle = this.stroke

    brush.shadowColor = this.stroke

    // left wing
    brush.beginPath()
    for (let i = 0; i < this.leftWing.length; i++)
      brush.lineTo(this.leftWing[i].x, this.leftWing[i].y)
    brush.fill()
    brush.stroke()
    //right wing
    for (let i = 0; i < this.rightWing.length; i++) {
      brush.lineTo(this.rightWing[i].x, this.rightWing[i].y)
    }
    brush.fill()
    brush.stroke()
  }

  tick = () => {
    // calculate vertex
    // left antennae
    let w = this.size / 2
    let h = this.size * 1.5
    this.leftAntennae[0] = new Vector(this.pos.x, this.pos.y)
    this.leftAntennae[1] = new Vector(
      this.pos.x + this.direction.x * h + this.direction.y * w,
      this.pos.y - this.direction.x * w + this.direction.y * h,
    )
    w = -this.size / 2
    // right antennae
    this.rightAntennae[0] = new Vector(this.pos.x, this.pos.y)
    this.rightAntennae[1] = new Vector(
      this.pos.x + this.direction.x * h + this.direction.y * w,
      this.pos.y - this.direction.x * w + this.direction.y * h,
    )

    // left wing
    this.leftWing[0] = new Vector(this.pos.x, this.pos.y)
    w = this.side
    h = this.size
    this.leftWing[1] = new Vector(
      this.pos.x + this.direction.x * h + this.direction.y * w,
      this.pos.y - this.direction.x * w + this.direction.y * h,
    )

    w = this.side * 2
    h = 0
    this.leftWing[2] = new Vector(
      this.pos.x + this.direction.x * h + this.direction.y * w,
      this.pos.y - this.direction.x * w + this.direction.y * h,
    )

    w = this.side
    h = -this.size
    this.leftWing[3] = new Vector(
      this.pos.x + this.direction.x * h + this.direction.y * w,
      this.pos.y - this.direction.x * w + this.direction.y * h,
    )

    w = this.side / 1.2
    h = -this.size / 1.2
    this.leftWing[4] = new Vector(
      this.pos.x + this.direction.x * h + this.direction.y * w,
      this.pos.y - this.direction.x * w + this.direction.y * h,
    )
    w = this.side
    h = -this.size * 1.5
    this.leftWing[5] = new Vector(
      this.pos.x + this.direction.x * h + this.direction.y * w,
      this.pos.y - this.direction.x * w + this.direction.y * h,
    )
    w = this.side / 4
    h = -this.size * 2
    this.leftWing[6] = new Vector(
      this.pos.x + this.direction.x * h + this.direction.y * w,
      this.pos.y - this.direction.x * w + this.direction.y * h,
    )
    w = 0
    h = -this.size
    this.leftWing[7] = new Vector(
      this.pos.x + this.direction.x * h + this.direction.y * w,
      this.pos.y - this.direction.x * w + this.direction.y * h,
    )

    // right wing
    this.rightWing[0] = new Vector(this.pos.x, this.pos.y)
    w = -this.side
    h = this.size
    this.rightWing[1] = new Vector(
      this.pos.x + this.direction.x * h + this.direction.y * w,
      this.pos.y - this.direction.x * w + this.direction.y * h,
    )

    w = -this.side * 2
    h = 0
    this.rightWing[2] = new Vector(
      this.pos.x + this.direction.x * h + this.direction.y * w,
      this.pos.y - this.direction.x * w + this.direction.y * h,
    )

    w = -this.side
    h = -this.size
    this.rightWing[3] = new Vector(
      this.pos.x + this.direction.x * h + this.direction.y * w,
      this.pos.y - this.direction.x * w + this.direction.y * h,
    )

    w = -this.side / 1.2
    h = -this.size / 1.2
    this.rightWing[4] = new Vector(
      this.pos.x + this.direction.x * h + this.direction.y * w,
      this.pos.y - this.direction.x * w + this.direction.y * h,
    )
    w = -this.side
    h = -this.size * 1.5
    this.rightWing[5] = new Vector(
      this.pos.x + this.direction.x * h + this.direction.y * w,
      this.pos.y - this.direction.x * w + this.direction.y * h,
    )
    w = -this.side / 4
    h = -this.size * 2
    this.rightWing[6] = new Vector(
      this.pos.x + this.direction.x * h + this.direction.y * w,
      this.pos.y - this.direction.x * w + this.direction.y * h,
    )
    w = -0
    h = -this.size
    this.rightWing[7] = new Vector(
      this.pos.x + this.direction.x * h + this.direction.y * w,
      this.pos.y - this.direction.x * w + this.direction.y * h,
    )
  }

  // target = (pos) => {
  //   let newdirection = Vector.sub(pos, this.pos)
  //   newdirection.normalize()
  //   this.direction = newdirection
  //   let acc = new Vector(this.direction.x, this.direction.y)
  //   acc.mult(this.acceleration)
  //   this.velocity.add(acc)
  //   this.velocity.limitSpeed(this.maxSpeed)
  // }

  gravitate = (target) => {
    const dist = Vector.distance(this.pos, target)
    const force = dist / 1000

    const desired = Vector.sub(target, this.pos)
    desired.div(dist)

    const error = Vector.sub(desired, this.velocity)
    error.mult(force)
    this.velocity.add(error)
    this.velocity.mult(30) //speed;
    this.velocity.limitSpeed(this.maxSpeed)
    this.pos.add(this.velocity)
    const nv = new Vector(this.velocity.x, this.velocity.y)
    nv.normalize()
    this.direction = nv
  }

  repell = (pos) => {
    const dist = Vector.distance(this.pos, pos)

    const force = 0.0001
    const desired = Vector.sub(pos, this.pos)
    desired.div(dist)

    const error = Vector.add(desired, this.velocity)
    error.mult(force)
    this.velocity.add(error)

    this.velocity.mult(30) //speed;
    this.velocity.limitSpeed(this.maxSpeed)
    this.pos.add(this.velocity)
    const nv = new Vector(this.velocity.x, this.velocity.y)
    nv.normalize()
    this.direction = nv
  }

  flap = () => {
    if (this.side > this.maxSide) this.flapVelocity = -this.ff

    if (this.side < this.minSide) this.flapVelocity = this.ff
    this.side += this.flapVelocity
  }
}
