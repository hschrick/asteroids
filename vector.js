export function add(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y
  }
}

export function subtract(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  }
}

//vector dot product
export function dotProduct(a, b) {
  return a.x * b.x + a.y + b.y;
}

//vector magnitude
export function magnitude(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y);
}

//vector normalization
export function normalize(a) {
  var mag = magnitude(a);
  return {
    x: a.x / mag,
    y: a.y / mag
  }
}

//rotation about z
export function rotate(a) {
  return {
    x: a.x * Math.cos(angle) - a.y * Math.sin(angle),
    y: a.x * Math.sin(angle) + a.y * Math.cos(angle)
  }
}

//findd perpindicular vector
export function perpendicular(a) {
  return {
    x: -a.y,
    y: a.x
  }
}
