function connect(points, face) {
  for (let i = 0; i < points.length - 1; i++) {
    let p1 = face.keypoints[points[i]];
    let p2 = face.keypoints[points[i + 1]];
    overlay.line(p1.x, p1.y, p2.x, p2.y, p1.z, p2.z);
  }
}

function getLeftHairlinePt(face) {
  let p = face.keypoints[109];
  let offset_p1 = face.keypoints[10];
  let offset_p2 = face.keypoints[151];
  let offset = dist(
    offset_p1.x,
    offset_p1.y,
    offset_p1.z,
    offset_p2.x,
    offset_p2.y,
    offset_p2.z
  );
  let x = p.x;
  let y = p.y - offset;
  let z = p.z + offset;
  return { x, y, z };
}

function getRightHairlinePt(face) {
  let p = face.keypoints[338];
  let offset_p1 = face.keypoints[10];
  let offset_p2 = face.keypoints[151];
  let offset = dist(
    offset_p1.x,
    offset_p1.y,
    offset_p1.z,
    offset_p2.x,
    offset_p2.y,
    offset_p2.z
  );
  let x = p.x;
  let y = p.y - offset;
  let z = p.z + offset;
  return { x, y, z };
}

// Hairline
function show3rd0(face) {
  let p1 = getLeftHairlinePt(face);
  let p2 = getRightHairlinePt(face);
  overlay.line(p1.x, p1.y, p2.x, p2.y, p1.z, p2.z);
}

// Brow
function show3rd1(face) {
  let p1a = face.keypoints[107];
  let p1b = face.keypoints[55];
  let p1x = p1a.x;
  let p1y = (p1a.y + p1b.y) / 2;
  let p1z = p1a.z;

  let p2a = face.keypoints[336];
  let p2b = face.keypoints[285];
  let p2x = p2a.x;
  let p2y = (p2a.y + p2b.y) / 2;
  let p2z = p2a.z;
  overlay.line(p1x, p1y, p2x, p2y, p1z, p2z);
}

// Nose
function show3rd2(face) {
  connect([97, 326], face);
}

// Chin
function show3rd3(face) {
  let p1 = face.keypoints[148];
  let p2 = face.keypoints[377];
  overlay.line(p1.x, p1.y, p2.x, p2.y, p1.z, p2.z);
}

function showBrow(face) {
  connect([162, 70, 53, 65, 295, 283, 300, 389], face);
}

function showOutline(face) {
  connect([377, 400, 378, 379, 365, 397, 288, 361, 323, 454, 356, 389], face);
  connect([148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162], face);
  connect([162, 21, 54], face);
  connect([389, 251, 284], face);
  /*
  let p1 = face.keypoints[54]
  let p2 = getLeftHairlinePt(face)
  let p3= getRightHairlinePt(face)
  let p4 = face.keypoints[284]
  overlay.line(p1.x, p1.y, p2.x, p2.y)
  overlay.line(p2.x, p2.y, p3.x, p3.y)
  overlay.line(p3.x, p3.y, p4.x, p4.y)
  */
}

function showCheeks1(face) {
  connect([377, 418, 335, 291, 410, 425, 346, 340, 372, 389], face);
  connect([148, 194, 106, 61, 186, 205, 117, 111, 143, 162], face);
}

function showCheeks2(face) {
  connect([377, 369, 395, 394, 364, 433, 447, 389], face);
  connect([148, 140, 170, 169, 135, 213, 227, 162], face);
}

function showCenterLine(face) {
  connect(
    [
      152, 175, 199, 200, 18, 17, 16, 15, 14, 13, 12, 11, 0, 164, 2, 94, 19, 1,
      4, 5, 195, 197, 6, 168, 8, 9, 151, 10,
    ],
    face
  );
}

function showEyeSockets(face) {
  connect(
    [
      417, 285, 442, 443, 444, 445, 342, 446, 261, 448, 449, 450, 451, 357, 465,
      417,
    ],
    face
  );
  connect(
    [
      193, 55, 222, 223, 224, 225, 113, 226, 31, 228, 229, 230, 231, 128, 245,
      193,
    ],
    face
  );
}

function showEyes(face) {
  connect(
    [
      362, 398, 384, 385, 386, 387, 388, 466, 263, 249, 390, 373, 374, 380, 381,
      382, 362,
    ],
    face
  ); // inner right eye
  connect(
    [
      33, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144, 163,
      7, 33,
    ],
    face
  ); // inner left eye
  //connect([463, 414, 286, 258, 257, 259, 260, 467, 359, 255, 339, 254, 253, 252, 256, 341, 463], face) // outer right eye
  //connect([130, 247, 30, 29, 27, 28, 56, 190, 243, 112, 26, 22, 23, 24, 110, 25, 130], face) // outer right eye
}

function showNose(face) {
  connect([97, 326, 460, 294, 278, 360, 456, 351, 417, 193], face);
  connect([97, 240, 64, 102, 49, 131, 236, 122, 193], face);
  connect([64, 219, 218, 237, 44, 1, 274, 457, 438, 439, 294], face);
}

function showMouth(face) {
  connect(
    [
      17, 84, 181, 91, 146, 76, 185, 40, 39, 37, 0, 267, 269, 270, 409, 306,
      375, 321, 405, 314, 17,
    ],
    face
  );
  connect(
    [
      62, 191, 80, 81, 82, 13, 312, 311, 310, 415, 292, 324, 318, 402, 317, 14,
      87, 178, 88, 95, 62,
    ],
    face
  );
}

function showPhiltrum(face) {
  connect([37, 167, 97, 2, 326, 393, 267, 0, 37], face);
}
