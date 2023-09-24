let hyperCube;

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.style('display', 'block');
    canvas.parent('canvas-container');
    hyperCube = new HyperCube();
}

function draw() {
    orbitControl();
    background(0, 0, 0, 0);

    let velocity = select('#velocitySlider').value();
    let hue = select('#hueSlider').value();
    let saturation = select('#saturationSlider').value();
    let brightness = select('#brightnessSlider').value();

    hyperCube.velocity = velocity;
    hyperCube.hue = hue;
    hyperCube.saturation = saturation;
    hyperCube.brightness = brightness;

    hyperCube.draw();
}