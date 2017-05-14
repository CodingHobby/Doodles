class Star {
  float x;
  float y;
  float z;
  float r;
  float speed;

  float pz;

  Star() {
    x = random(-width, width);
    y = random(-height, height);
    z = random(width);
    pz = z;
  }

  void show() {
    fill(255);
    noStroke();
    float sx = map(x/z, 0, 1, 0, width);
    float sy = map(y/z, 0, 1, 0, height);
    float r = map(z, 0, width, 16, 0);

    ellipse(sx, sy, r, r);

    stroke(255);
    float px = map(x/pz, 0, 1, 0, width);
    float py = map(y/pz, 0, 1, 0, height);
    line(px, py, sx, sy);
    pz = z;
  }

  void update() {
    speed = map(mouseX, 0, width, 0, 20);
    z-= speed;
    if (z < 1) {
      z = width;
      x = random(-width, width);
      y = random(-height, height);
      pz = z;
    }
  }
}