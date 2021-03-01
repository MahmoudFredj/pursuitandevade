class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  normalize() {
    const magnitude = this.magnitude()
    this.div(magnitude)
  }
  static normalize(vector) {
    const magnitude = vector.magnitude
    return Vector.div(vector, magnitude)
  }

  limit(value) {
    if (this.x > value) this.x = value
    if (this.y > value) this.y = value
  }

  limitSpeed(value) {
    if (this.magnitude() < value) return
    const res = new Vector(this.x, this.y)
    res.normalize()

    res.mult(value)
    this.x = res.x
    this.y = res.y
  }
  //get magnitude of the vector
  magnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }
  static magnitude(vector) {
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2))
  }

  static distance(vector1, vector2) {
    return Math.sqrt(
      Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2),
    )
  }

  //   OPERATORS
  add(vector) {
    this.x += vector.x
    this.y += vector.y
  }
  static add(vector1, vector2) {
    return new Vector(vector1.x + vector2.x, vector1.y + vector2.y)
  }

  sub(vector) {
    this.x -= vector.x
    this.y -= vector.y
  }
  static sub(vector1, vector2) {
    return new Vector(vector1.x - vector2.x, vector1.y - vector2.y)
  }

  div(scal) {
    this.x /= scal
    this.y /= scal
  }
  static div(vector, scal) {
    return new Vector(vector.x / scal, vector.y / scal)
  }

  mult(scal) {
    this.x *= scal
    this.y *= scal
  }
  static mult(vector, scal) {
    return new Vector(vector.x * scal, vector.y * scal)
  }

  prod(vector) {
    return this.x * vector.x + this.y * vector.y
  }
  static prod(vector1, vector2) {
    return vector1.x * vector2.x + vector1.y * vector2.y
  }

  static angle(vector1, vector2) {
    const magnitude1 = Vector.magnitude(vector1)
    const magnitude2 = Vector.magnitude(vector2)
    const product = Vector.prod(vector1, vector2)
    const theta = product / magnitude1 / magnitude2
    const angle = Math.acos(theta)
    return angle
  }
  //get normalized random vector
  static Random() {
    return new Vector((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2)
  }
}
