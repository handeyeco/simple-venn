// Finds the zeros of a function, given two starting points
// (which must have opposite signs)
export function bisect(f, a, b) {
  const maxIterations = 100;
  const tolerance = 1e-10;
  const fA = f(a);
  const fB = f(b);
  let delta = b - a;

  if (fA * fB > 0) {
    throw "Initial bisect points must have opposite signs";
  }

  if (fA === 0) return a;
  if (fB === 0) return b;

  for (var i = 0; i < maxIterations; ++i) {
    delta /= 2;
    var mid = a + delta,
      fMid = f(mid);

    if (fMid * fA >= 0) {
      a = mid;
    }

    if ((Math.abs(delta) < tolerance) || (fMid === 0)) {
      return mid;
    }
  }
  return a + delta;
}

// Returns the overlap area of two circles of radius r1 and r2
// that have their centers separated by distance d
export function circleOverlapArea(r1, r2, d) {
  // No overlap
  if (d >= r1 + r2) {
    return 0;
  }

  // Completely overlapped
  if (d <= Math.abs(r1 - r2)) {
    return Math.PI * Math.min(r1, r2) * Math.min(r1, r2);
  }

  const w1 = r1 - (d * d - r2 * r2 + r1 * r1) / (2 * d);
  const w2 = r2 - (d * d - r1 * r1 + r2 * r2) / (2 * d);

  return circleSegmentArea(r1, w1) + circleSegmentArea(r2, w2);
}

// Circular segment area calculation
// See http://mathworld.wolfram.com/CircularSegment.html
function circleSegmentArea(r, width) {
  return r * r * Math.acos(1 - width / r) - (r - width) * Math.sqrt(width * (2 * r - width));
}
