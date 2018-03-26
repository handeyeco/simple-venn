export default class VennDrawer {

  constructor() {
    this.venn = null;
    this.options = {
      aSetColor: '#00F',
      bSetColor: '#0F0',
      opacity: 0.5,
    };
  }

  // Triage drawing responsibility
  // depending on selector
  draw(venn, selector, options) {
    this.venn = venn;
    this.options = Object.assign({}, this.options, options);

    if (!selector) {
      this.drawBody();
      return;
    }

    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => this.drawVenn(elem));
  }

  drawBody() {
    document.body.style.width = '100vw';
    document.body.style.height = '100vh';

    this.drawVenn(document.body);
  }

  drawVenn(element) {
    let canvas = element.nodeName === 'CANVAS' ? element : null;

    if (!canvas) {
      canvas = document.createElement('canvas');
      element.appendChild(canvas);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    }

    // Make sure things look good on retina
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;

    this.drawCanvas(canvas);
  }

  drawCanvas(canvas) {
    const ctx = canvas.getContext('2d');

    // Position set centers
    const xCenter = canvas.offsetWidth / 2;
    const yCenter = canvas.offsetHeight / 2;
    const aCenter = {
      x: xCenter - this.venn.aSetIntersectDist,
      y: yCenter
    };
    const bCenter = {
      x: xCenter + this.venn.bSetIntersectDist,
      y: yCenter
    };

    // Make sure things look good on retina
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.globalAlpha = this.options.opacity;

    // Draw set A
    ctx.fillStyle = this.options.aSetColor;
    ctx.beginPath();
    ctx.arc(aCenter.x, aCenter.y, this.venn.aSetRadius, 0, 2 * Math.PI);
    ctx.fill();

    // Draw set B
    ctx.fillStyle = this.options.bSetColor;
    ctx.beginPath();
    ctx.arc(bCenter.x, bCenter.y, this.venn.bSetRadius, 0, 2 * Math.PI);
    ctx.fill();
  }

}
