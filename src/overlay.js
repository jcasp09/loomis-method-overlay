function showFaceMesh(face) {
  for (let i = 0; i < face.keypoints.length; i++) {
    let p = face.keypoints[i];
    overlay.point(p.x, p.y, p.z);
  }
}

function showFacialThirds(face) {
  show3rd0(face);
  show3rd1(face);
  show3rd2(face);
  show3rd3(face);
}

function showStructure(face) {
  showCenterLine(face);
  showBrow(face);
  showOutline(face);
  showCheeks1(face);
  //showCheeks2(face)
  show3rd3(face);
}

function showFeatures(face) {
  showEyeSockets(face);
  showEyes(face);
  showNose(face);
  showMouth(face);
  //showPhiltrum(face)
}
