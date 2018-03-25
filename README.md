# simple-venn

simple-venn is a tiny JavaScript library for area-proportional, two-ringed Venn diagrams. A lot of the math in this library is pulled from benfred's [Venn.js](https://github.com/benfred/venn.js) library - a great library for Venn diagrams with 3+ sets, but overkill for what I needed.

simple-venn was created with the end goal of giving developers access to the underlying dimensions of the Venn diagram. In the `/examples` directory, you'll see that simple-venn can be used with canvas or regular divs. I personally made it to be used with [regl](https://github.com/regl-project/regl). It should give you all the math to position the sets as you see fit.

However I wanted simple-venn to be...simple. So it has some built-in drawing functionality using canvas. This way it's super easy to get drawing Venn diagrams:

``` html
<!DOCTYPE html>
<html>
<head>
  <title>SimpleVenn</title>
</head>
<body></body>

<script src="simple-venn.dist.js"></script>
<script>
  var aSet = 120000;
  var bSet = 120000;
  var uSet = 60000;
  var scale = 0.5;
  // Appends canvas element to body and draws Venn
  new SimpleVenn(aSet, bSet, uSet, scale).draw();
</script>

</html>
```

## API

### Constructor

``` JavaScript
new SimpleVenn(aSetCount, bSetCount, uSetCount, scale)
```

| parameter | type | details |
| --- | --- | --- |
| aSetCount | Number | Value for set A |
| bSetCount | Number | Value for set B |
| uSetCount | Number | Value for set intersection |
| scale (optional) | Number | Set area is determined by count and scaled up or down by this scale factor (default: 1) |

Each parameter can be accessed and updated directly from the returned SimpleVenn object.

``` JavaScript
let venn = new SimpleVenn(4, 4, 2);
console.log(venn.scale); // 1
venn.scale = 2;
console.log(venn.scale); // 2
```

### Computed Properties

Besides the four initial properties, all other properties are computed when accessed.

| property | description |
| --- | --- |
| aSetArea | The area of set A |
| bSetArea | The area of set B |
| uSetArea | The area of set intersection |
| aSetRadius | The radius of set A |
| bSetRadius | The radius of set B |
| aSetDiameter | The diameter of set A |
| bSetDiameter | The diameter of set B |
| setDistance | The approximate distance between the center of set A and the center of set B so the overlap area is proportional to the overlap value |
| aSetIntersectDist | The distance from the center of set A to the point of intersection between the two sets |
| bSetIntersectDist | The distance from the center of set B to the point of intersection between the two sets |

### Methods

``` JavaScript
SimpleVenn.draw(selector, options);
```

While this library is more about the *math* of Venn diagrams (so you can do what you want with the results), this is a method that will just draw it for you.

| parameter | type | details |
| --- | --- | --- |
| selector (optional) | String | Selector for the element the Venn diagram will be appended to or the canvas object the diagram will be drawn on |
| options (optional) | Object | An object specifying styles for the Venn diagram |

If a selector is not provided, simple-venn will append a canvas element to the body of the document, sized to the full viewport size. If the selected element is a canvas element, simple-venn will draw the diagram on the canvas element. Otherwise simple-venn will append a canvas element to the selected element that is the full size of the element. Under the hood, simple-venn uses [querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) and will try to draw to all matches.

The options object will look for these properties:

| property | Type | description |
| --- | --- | --- |
| aSetColor (optional) | String | The color of set A (default: '#00F') |
| bSetColor (optional) | String | The color of set B (default: '#0F0') |
| opacity (optional) | Number | The opacity of each set (default: 0.5) |

Recommended use:

``` html
<div id="venn" style="width: 500px; height: 500px;"></div>

<script>
const venn = new SimpleVenn(60000, 60000, 30000);
venn.draw('#venn');
</script>
```

## Contributing

Please do! As long as you're cool about it (no jerks). Feel free to file an issue for bugs and feature requests. Before working on a PR, it might be good to check if it's needed in the library. It could certainly use some math review, optimizations, and testing.

## License

MIT
