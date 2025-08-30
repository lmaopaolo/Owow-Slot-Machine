let w_font,
  prize_list,
  button,
  r_button,
  przwarning,
  win_btn,
  merch_win,
  main_o,
  spinwow,
  owow3dlnk,
  owowclsclnk;
let gif_trig = false;
let win = false;
let przlist = 1;
let prztint = 0;
let sl1 = [];
let sl2 = [];
let sl3 = [];
let px = 150;
let show = 0;
let scroll = 0;
let scroll_speed = 0.05;
let play = false;
let prz = true;
let rand = 0;
let rand1 = 0;
let rand2 = 0;
let real_choices = [0, 2, 4];

// Load the image.
function preload() {
  main_o = loadImage("a.png");
  spinwow = loadImage("win.gif");

  sl1[0] = main_o;
  sl1[1] = loadImage("bx.png");
  sl1[2] = loadImage("cx.png");
  sl1[3] = loadImage("dx.png");
  sl1[4] = loadImage("ex.png");
  sl1[5] = loadImage("fx.png");

  sl2[0] = main_o;
  sl2[1] = loadImage("by.png");
  sl2[2] = loadImage("cy.png");
  sl2[3] = loadImage("dy.png");
  sl2[4] = loadImage("ey.png");
  sl2[5] = loadImage("fy.png");

  sl3[0] = main_o;
  sl3[1] = loadImage("bz.png");
  sl3[2] = loadImage("cz.png");
  sl3[3] = loadImage("dz.png");
  sl3[4] = loadImage("ez.png");
  sl3[5] = loadImage("fz.png");

  w_font = loadFont("Wavy.ttf");
  prize_list = loadImage("SM.png");
}

function setup() {
  createCanvas(600, 400);
  textFont(w_font);

  button = createButton("Spin Me");
  button.position(270, 300);
  button.mousePressed(play_slots);

  r_button = createButton("Reset");
  r_button.position(278, 350);
  r_button.mousePressed(reset_slots);

  win_btn = createButton("Click to Redeem Prize");
  win_btn.position(225, 325);

  przwarning = createP(
    "Press P to see what you can win! P does not work while the slots are spinning."
  );
  przwarning.position(60, 360);

  owow3dlnk = createA(
    "https://owow3d.printful.me/",
    "Click me to visit the Owow 3D Store to Buy!",
    "_blank"
  );
  owow3dlnk.position(150, 300);
  owow3dlnk.style("color", "white");

  owowclsclnk = createA(
    "https://owowclassic.printful.me/",
    "Click me to visit the Owow Classic Store to Buy!",
    "_blank"
  );
  owowclsclnk.position(150, 300);
  owowclsclnk.style("color", "white");

  frameRate(50);

  reset_slots();
}

function draw() {
  win_btn.hide();
  owow3dlnk.hide();
  owowclsclnk.hide();

  if (play == true) {
    przwarning.hide();
    let delta_scroll = scroll_speed * deltaTime;
    scroll += delta_scroll;

    if (scroll > sl1.length) {
      scroll = 0;
      show++;
    }

    if (show < 40) {
      flash(75, 80, 1);
    } else {
      image(sl1[rand], 75, 80, px, px);
    }

    if (show < 50) {
      flash(225, 80, 2);
    } else {
      image(sl2[rand1], 225, 80, px, px);
    }

    if (show < 60) {
      flash(375, 80, 3);
    } else {
      image(sl3[rand2], 375, 80, px, px);
    }

    if (show > 61) {
      if (rand1 == rand) {
        win = true;
      } else {
        fill("red");
        text("You lost! Try Again", 60, 280);
      }
    }
  }
  if (win) {
    win_btn.show();
    merch_win = check_prize();
    win_btn.mousePressed(check_win);
  } else {
    win_btn.hide();
  }

  if (gif_trig) {
    image(spinwow, 225, 30, 350, 250);
    
    if (rand1 == 0 || rand == 1) {
      owow3dlnk.show();
    } else {
      owowclsclnk.show();
    }
  }
}

function choose_rand() {
  rand = random(real_choices);
  rand1 = random(real_choices);
  rand2 = random(real_choices);

  if (rand1 == rand) {
    rand2 = rand;
  }
}

function flash(x, y, slot) {
  if (slot == 1) {
    image(sl1[floor(scroll)], x, y, px, px);
  } else if (slot == 2) {
    image(sl2[floor(scroll)], x, y, px, px);
  } else {
    image(sl3[floor(scroll)], x, y, px, px);
  }
}

function play_slots() {
  play = true;
}

function reset_slots() {
  play = false;
  show = 0;
  clear();
  background(200);
  r_button.show();
  button.show();
  owow3dlnk.hide();
  owowclsclnk.hide();
  win = false;
  textSize(50);
  fill("black");
  text("owow slot machine", 50, 60);
  przwarning.show();
  gif_trig = false;
  choose_rand();
}
function keyPressed() {
  if (key === "p") {
    if (prz) {
      r_button.hide();
      button.hide();
      image(prize_list, 50, 80, 500, 300);
      play = false;
      prz = false;

      if (przlist == 0) {
        przlist += 1;
      }
    } else {
      reset_slots();
      prz = true;
    }
    print(prz);
  }
}
function check_prize() {
  if (rand1 == 0) {
    return "3D 'Owow' Sweats!";
  } else if (rand1 == 2) {
    return "3D 'grOWth' Sweats!";
  } else {
    return " 'grOWth' Mesh Shorts!";
  }
}
function check_win() {
  clear();
  background("black");
  fill("white");
  play = false;
  button.hide();
  win = false;
  win_anim(merch_win);
  gif_trig = true;
}
function win_anim(winner) {
  textSize(25);
  text("Hey! You won a chance to buy " + winner, 50, 50, 150);
}
