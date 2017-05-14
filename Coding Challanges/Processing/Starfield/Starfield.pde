Star[] stars = new Star[400];
void setup() {
  size(800, 800);
  background(0);
  for (int i=0; i<stars.length; i++) {
    stars[i] = new Star() ;
  }
}

void draw() {
  background(0);
  translate(width/2, height/2);
  for (int i=0; i<stars.length; i++) {
    Star star = stars[i];
    star.update();
    star.show();
  }
}