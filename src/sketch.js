let video;
let faceMesh;
let faces = [];
let overlay;
let buttons = [];
let captureRequested = false;

function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 1, flipped: true });
}

function gotFaces(results) {
  faces = results;
}

function newButton(name, f, parent) {
  let btn = createButton(name);
  btn.parent(parent);

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
  createCanvas(850, 326).parent(document.getElementById("canvas"));
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  // Start detecting faces
  faceMesh.detectStart(video, gotFaces);
  // Create overlay
  overlay = createGraphics(width / 2, height);
  overlay.clear();

  // Buttons
  buttons.push(newButton("Face Mesh", showFaceMesh, "structure"));
  buttons.push(newButton("Planes", showPlanes, "structure"));
  buttons.push(newButton("Facial Thirds", showFacialThirds, "structure"));
  buttons.push(newButton("Orbits/Eyes", showOrbitsEyes, "features"));
  buttons.push(newButton("Nose", showNose, "features"));
  buttons.push(newButton("Mouth", showMouth, "features"));

  // Freeze frame
  document.getElementById("freeze-btn").addEventListener("click", () => {
    captureRequested = true;
  });
  document.getElementById("clear-freeze-btn").addEventListener("click", () => {
    const placeholder = document.getElementById("freeze-placeholder");
    const wrap = document.getElementById("freeze-canvas-wrap");
    const img = document.getElementById("freeze-img");
    img.src = "";
    img.removeAttribute("src");
    placeholder.classList.remove("hidden");
    wrap.classList.add("hidden");
  });
}

function draw() {
  background(42, 43, 46); // matches surface area behind canvas
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

  // Capture freeze frame (right half = live camera + overlay)
  if (captureRequested) {
    captureRequested = false;
    const el = document.querySelector("#canvas canvas");
    if (el) {
      const ctx = el.getContext("2d");
      const cw = el.width;
      const ch = el.height;
      const w = Math.floor(cw / 2);
      const imageData = ctx.getImageData(w, 0, w, ch);
      const temp = document.createElement("canvas");
      temp.width = w;
      temp.height = ch;
      temp.getContext("2d").putImageData(imageData, 0, 0);
      const dataUrl = temp.toDataURL("image/png");
      const img = document.getElementById("freeze-img");
      const placeholder = document.getElementById("freeze-placeholder");
      const wrap = document.getElementById("freeze-canvas-wrap");
      img.src = dataUrl;
      placeholder.classList.add("hidden");
      wrap.classList.remove("hidden");
    }
  }
}
