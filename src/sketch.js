let video;
let faceMesh;
let faces = [];
let overlay;
let buttons = [];

function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 1, flipped: true });
}

function gotFaces(results) {
  faces = results;
}

function newButton(name, f) {
  let btn = createButton(name);
  btn.parent("button-bar"); // Add button to the container

  let btnObj = {
    active: false,
    fn: f,
    btn: btn,
  };

  btn.mousePressed(() => {
    btnObj.active = !btnObj.active;
    if (btnObj.active) btn.addClass("active");
    else btn.removeClass("active");
  });

  return btnObj;
}

function toggleControl(face) {
  buttons.forEach((btnObj) => {
    if (btnObj.active && face) btnObj.fn(face);
  });
}

function setup() {
  createCanvas(850, 326).parent(document.body);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  // Start detecting faces
  faceMesh.detectStart(video, gotFaces);
  // Create overlay
  overlay = createGraphics(width / 2, height);
  overlay.clear();

  // Buttons (no x/y needed)
  buttons.push(newButton("Face Mesh", showFaceMesh));
  buttons.push(newButton("Facial Thirds", showFacialThirds));
  buttons.push(newButton("Structure", showStructure));
  buttons.push(newButton("Features", showFeatures));
}

function draw() {
  background(125);
  overlay.clear();
  let scaleX = width / 2 / video.width;
  let scaleY = height / video.height;

  // Ensure at least one face is detected
  if (faces.length > 0) {
    let face = faces[0];
    overlay.push();
    overlay.scale(scaleX, scaleY);

    overlay.stroke(0, 0, 0, 150);
    overlay.strokeWeight(3);
    toggleControl(face);

    overlay.pop();
  }

  // Video on second half
  image(video, width / 2, 0, width / 2, height);
  // Overlay on both halfs
  image(overlay, 0, 0);
  image(overlay, width / 2, 0);
}
