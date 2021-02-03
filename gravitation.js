class Gravitation {
  constructor(x, y, size, color) {
    this.x = x
    this.y = y
    this.size = size
    this.color = color
  }

  draw = (brush) => {
    brush.fillStyle = this.color
    brush.beginPath()
    brush.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    brush.fill()
  }
}
