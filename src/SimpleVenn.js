import {
  bisect,
  circleOverlapArea,
} from './helpers';
import VennDrawer from './VennDrawer';

export default class SimpleVenn {

  constructor(aSetCount, bSetCount, uSetCount, scale = 1) {
    this.aSetCount = aSetCount;
    this.bSetCount = bSetCount;
    this.uSetCount = uSetCount;
    this.scale     = scale;

    this._drawer    = new VennDrawer();
  }

  _setArea(set) {
    let count = set + 'SetCount';
    return this[count] * this.scale;
  }

  get aSetArea() {
    return this._setArea('a');
  }

  get bSetArea() {
    return this._setArea('b');
  }

  get uSetArea() {
    return this._setArea('u');
  }

  _setRadius(set) {
    let area = set + 'SetArea';
    return Math.sqrt(this[area] / Math.PI);
  }

  get aSetRadius() {
    return this._setRadius('a');
  }

  get bSetRadius() {
    return this._setRadius('b');
  }

  _setDiameter(set) {
    let r = set + 'SetRadius';
    return this[r] * 2;
  }

  get aSetDiameter() {
    return this._setDiameter('a');
  }

  get bSetDiameter() {
    return this._setDiameter('b');
  }

  get setDistance() {
    let r1    = this.aSetRadius;
    let r2    = this.bSetRadius;
    let uArea = this.uSetArea;

    let overlapping = Math.min(r1, r2) * Math.min(r1, r2) * Math.PI <= uArea + 1e-10;

    if (overlapping) {
      return Math.abs(r1 - r2);
    }

    // We loop on an ever-decreasing distance between sets
    // until we have an approximate overlap area that matches the count
    return bisect((dist) => circleOverlapArea(r1, r2, dist) - uArea, 0, r1 + r2);
  }

  get aSetIntersectDist() {
    let r1 = this.aSetRadius;
    let r2 = this.bSetRadius;
    let d  = this.setDistance;

    if (d <= 1e-10) {
      return d;
    }

    // See http://mathworld.wolfram.com/Circle-CircleIntersection.html
    let num = d * d - r2 * r2 + r1 * r1;
    let den = 2 * d;
    return num / den;
  }

  get bSetIntersectDist() {
    return this.setDistance - this.aSetIntersectDist;
  }

  draw(selector, options) {
    this._drawer.draw(this, selector, options);
    return this;
  }

}
