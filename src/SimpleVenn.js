import {
  bisect,
  circleOverlapArea,
} from './helpers';

export default class SimpleVenn {

  constructor(aSetCount, bSetCount, uSetCount, scale = 1) {
    this.aSetCount = aSetCount;
    this.bSetCount = bSetCount;
    this.uSetCount = uSetCount;
    this.scale     = scale;
  }

  setArea(set) {
    let count = set + 'SetCount';
    let abs = Math.abs(this.scale);

    if (this.scale < 0) {
      return this[count] / abs;
    } else {
      return this[count] * abs;
    }
  }

  get aSetArea() {
    return this.setArea('a');
  }

  get bSetArea() {
    return this.setArea('b');
  }

  get uSetArea() {
    return this.setArea('u');
  }

  setRadius(set) {
    let area = set + 'SetArea';
    return Math.sqrt(this[area] / Math.PI);
  }

  get aSetRadius() {
    return this.setRadius('a');
  }

  get bSetRadius() {
    return this.setRadius('b');
  }

  setDiameter(set) {
    let r = set + 'SetRadius';
    return this[r] * 2;
  }

  get aSetDiameter() {
    return this.setDiameter('a');
  }

  get bSetDiameter() {
    return this.setDiameter('b');
  }

  get setDistance() {
    let r1    = this.aSetRadius;
    let r2    = this.bSetRadius;
    let uArea = this.uSetArea;

    let overlapping = Math.min(r1, r2) * Math.min(r1, r2) * Math.PI <= uArea + 1e-10;

    if (overlapping) {
      return Math.abs(r1 - r2);
    }

    return bisect((dist) => circleOverlapArea(r1, r2, dist) - uArea, 0, r1 + r2);
  }

  get aSetIntersectDist() {
    let r1 = this.aSetRadius;
    let r2 = this.bSetRadius;
    let d  = this.setDistance;

    if (d <= 1e-10) {
      return d;
    }

    let num = d * d - r1 * r1 + r2 * r2;
    let den = 2 * d;
    return num / den;
  }

  get bSetIntersectDist() {
    return this.setDistance - this.aSetIntersectDist;
  }

}
